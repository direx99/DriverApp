import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import RNPickerSelect from "react-native-picker-select";
import AppHead from "./AppHead";
import userimg from "../assets/user.png";
import Map from "./Map";
import * as Location from 'expo-location';
import { useNavigation } from "@react-navigation/native";

const options = [
  { label: "Borella Junc", value: "Borella Junc" },
  { label: "BMICH", value: "BMICH" },
  { label: "Torington", value: "Torington" },
];

const time = [
  { label: "5.30 AM", value: "5.30 AM" },
  { label: "6.00 AM", value: "6.00 AM" },
  { label: "6.30 AM", value: "6.30 AM" },
  { label: "7.00 AM", value: "7.00 AM" },
  { label: "7.30 AM", value: "7.30 AM" },
  { label: "8.00 AM", value: "8.00 AM" },
  { label: "8.30 AM", value: "8.30 AM" },
];

const route = [
  { label: "Borella Junc", value: "Borella Junc" },
  { label: "BMICH", value: "BMICH" },
  { label: "Torington", value: "Torington" },
];

const SelectList = (props) => {
  const [selectedValue, setSelectedValue] = useState(null);

  return (
    <View>
      <Text>{props.PickerTitle}</Text>
      <RNPickerSelect
        onValueChange={(value) => setSelectedValue(value)}
        items={props.itemArray}
        placeholder={{
          label: props.label,
          value: null,
        }}
        value={selectedValue}
        style={pickerSelectStyles} // Apply the custom styles
      />
    </View>
  );
};
const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update the time every second

    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, []);

  const formattedTime = currentTime.toLocaleTimeString();

  return (
    <View>
      <Text style={styles.time}>{formattedTime}</Text>
    </View>
  );
};



const NewTrip = () => {


  const [selectedStartLocation, setSelectedStartLocation] = useState(null);
  const [selectedEndLocation] = useState("NIBM"); // Hardcoded value for endLocation
  const [latitude, setLatitude] = useState(null); // You need to get latitude from the Map component
  const [longitude, setLongitude] = useState(null); // You need to get longitude from the Map component
  const [selectedTime, setSelectedTime] = useState(null);
  const [status] = useState("active");
  const [org] = useState("NIBM");
  const [driver] = useState("user");
  const [seats,selectedSeats] = useState(0);

  const SelectRoute = (props) => {
    const [selectedValue, setSelectedValue] = useState(null);
  
    return (
      <View>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "600",
            opacity: 0.4,
            color: "#fff",
          }}
        >
          Start Location
        </Text>
        <RNPickerSelect
          onValueChange={(value) => setSelectedStartLocation(value)}
          items={props.itemArray}
          placeholder={{
            label: props.label,
            value: null,
          }}
          value={selectedStartLocation}
          style={pickerSelectStyles2} // Apply the custom styles
        />
      </View>
    );
  };

  const navigation = useNavigation();


  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        console.error('Location permission denied');
        return;
      }
  
      let location = await Location.getCurrentPositionAsync({});
      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;
  
      // Do something with latitude and longitude, e.g., set them in state
      setLatitude(latitude);
      setLongitude(longitude);
    } catch (error) {
      console.error('Error getting current location:', error);
    }
  };
  
  useEffect(() => {
    getCurrentLocation();
  }, [latitude]);

  const handleStartTrip = async () => {
    // Create a data object with the required fields
    const tripData = {
      latitude,
      longitude,
      time: selectedTime,
      status,
      startLocation: selectedStartLocation,
      endLocation: selectedEndLocation,
      org,
      driver,
      seats,
    };

    try {
      // Send a POST request to the specified URL with the data as JSON
      const response = await fetch("https://transpo-go.onrender.com/bustrips/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tripData),
      });

       // Check if the request was successful (status code 200)
    if (response.status === 200) {
      // Parse the response body as JSON
      const responseData = await response.json();

      // Display the _id from the response
      console.log("Trip started successfully! _id:", responseData.savedTrip.id);
      navigation.navigate("MapView",{responseData})
    } else {
      // Handle errors (e.g., show an error message)
      console.error("Failed to start the trip.");
    }
  } catch (error) {
    // Handle network errors
    console.error("Network error:", error);
  }
};

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1, width: "100%" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <AppHead />
          <Image
            style={{ width: 30, height: 30, marginTop: 20 }}
            source={userimg}
          />
        </View>
        <View
          style={{
            borderRadius: 30,
            flex: 1,
            overflow: "hidden",
            marginVertical: 20,
            marginTop:30
          }}
        >
          <Map />
        </View>
        <View style={styles.formContainer}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#A4D357",
            }}
          >
            Start new trip !
          </Text>

          <View style={{ alignItems: "center", paddingTop: 20 }}>
            <SelectRoute itemArray={route} label={"Set Location"} />
            <Text style={{ color: "#fff" }}>to</Text>
            <Text style={styles.LargeText}>NIBM</Text>
          </View>
          <TouchableOpacity style={{ marginTop: 20 }} onPress={handleStartTrip}>
            <View style={styles.StartBtn}>
              <Text style={styles.StartButton}>Start Trip Now</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default NewTrip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#101010",
  },
  formContainer: {
    textAlign: "left",
    width: "100%",
    backgroundColor: "#151515",
    marginTop: 20,
    padding: 20,
    borderRadius: 40,
  },
  LargeText: {
    fontSize: 40,
    fontWeight: "700",
    color: "#fff",
  },
  StartButton: {
    textAlign: "center",
    color: "#000",
    padding: 16,
    fontWeight: "700",
    fontSize: 16,
  },
  StartBtn: {
    borderRadius: 20,
    backgroundColor: "#A4D357",
    marginTop: 5,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 20, // Adjust the font size as needed
    paddingVertical: 5,
    color: "white",
    fontWeight: "500",
  },
  inputAndroid: {
    fontSize: 20, // Adjust the font size as needed
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    color: "black",
  },
});

const pickerSelectStyles2 = StyleSheet.create({
  inputIOS: {
    paddingVertical: 5,
    color: "white",
    fontSize: 40,
    fontWeight: "700",
  },
  inputAndroid: {
    fontSize: 40,
    fontWeight: "700",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    color: "black",
  },
});
