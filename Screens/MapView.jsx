import { StyleSheet, SafeAreaView, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Map from "./Map";
import { BlurView } from "expo-blur";
import s1 from "../assets/seat.png";
import s2 from "../assets/seat2.png";
import passenger from "../passenger.png";
import close from "../close.png";

import Modal from 'react-native-modal';



import { getCurrentPositionAsync } from "expo-location"; // Import the location module
import axios from "axios";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const MapView = ({ route }) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const { responseData } = route.params;
  const tripId = responseData.savedTrip._id;
  const [tt, setTT] = useState(true);
  const [myPassengers,setMyPassengers]=useState([])
  const [psCount,setPsCount]=useState(0)
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation()

  const toggleModal = () => {
    getMyPassenger()
    setModalVisible(!isModalVisible);

  };

  // State to store the location data
  const [locationData, setLocationData] = useState(null);

  // Function to fetch the current location
  const fetchCurrentLocation = async () => {
    try {
      const location = await getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);

      getMyPassenger(location.coords.latitude, location.coords.longitude);

    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const updateLocation = async (id, latitude, longitude) => {
    try {
      const response = await axios.put(
        `https://transpo-go.onrender.com/bustrips/${id}`,
        {
          latitude,
          longitude,
          seats:50-psCount
        }
      );

      // Check the response status and handle success or error
      if (response.status === 200) {
        console.log("Location updated successfully");
        console.log(latitude, longitude);
      } else {
        console.error("Failed to update location");
      }
    } catch (error) {
      console.error("Error updating location:", error);
    }
  };

  const updateLocationPeriodically = () => {
    const intervalId = setInterval(() => {
      const updatedLatitude = latitude; // Replace with the new latitude
      const updatedLongitude = longitude; // Replace with the new longitude
      console.log();
      // Call the updateLocation function with the new coordinates
      updateLocation(
        responseData.savedTrip._id,
        updatedLatitude,
        updatedLongitude
      );
    }, 3000); // 10 seconds interval

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  };


  const getMyPassenger = async () => {
    try {
      const response = await axios.get(
        `https://transpo-go.onrender.com/trips/bus/${tripId}`
      );

      // Assuming the response.data is an array of locations
      setMyPassengers(response.data);
      console.log(response.data.length);
      const ps = response.data.length

      setPsCount(ps)
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  useEffect(() => {
    // Fetch the current location when the component mounts
  
    // Start updating the location periodically when the component mounts
    const intervalId = setInterval(() => {
        fetchCurrentLocation();
      updateLocation(tripId, latitude, longitude);
    }, 2000); // 10 seconds interval
  
    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [latitude, longitude]);



  //const waitingMarkers = markers.filter((marker) => marker.status === "waiting");

  

  const Glassmorphism = () => {
    return (
      <BlurView
        style={{
          position: "absolute",
          top: 0,
          paddingTop: 70,
          left: 0,
          height: 140,
          right: 0,
          paddingHorizontal: 20,
        }}
        tint="dark"
        intensity={60}
      >
        {/* Content */}
        <Text style={{ fontWeight: "700", color: "#fff", fontSize: 20 }}>
          {responseData.savedTrip.startLocation} to {responseData.savedTrip.endLocation}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Text style={{ fontWeight: "600", color: "#fff", fontSize: 15 }}>
              {psCount} ongoing passengers
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Text style={{ fontWeight: "600", color: "#fff", fontSize: 15 }}>
              {50-psCount}
            </Text>
            <Image source={s1} style={{ width: 15, height: 15 }} />
            <Text
              style={{
                fontWeight: "600",
                color: "#fff",
                fontSize: 15,
                marginLeft: 10,
              }}
            >
              {psCount}
            </Text>
            <Image source={s2} style={{ width: 15, height: 15 }} />
          </View>
        </View>
      </BlurView>
    );
  };

  return (
    <>
    <View style={{ flex: 1 }}>
      <Map tripId={tripId}/>
      <TouchableOpacity
      onPress={()=>navigation.navigate("newtrip")}
        style={{
          backgroundColor: "#D71313",
          borderWidth: 3,
          borderColor: "#f1f1f1",
          position: "absolute",
          left: 30,
          right: 30,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 20,
          bottom: 30,
          height: 60,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "600",
            fontSize: 16,
          }}
        >
          End Trip
        </Text>
      </TouchableOpacity>

      <Glassmorphism />
      
      <View style={{position:'absolute',top:200,right:10}}>
        {
            psCount > 0 && (
            <View style={{width:25,height:25,backgroundColor:"red",borderRadius:20,marginLeft:30,zIndex:100,justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'#fff',fontWeight:'800',fontSize:11}}>{psCount}</Text>
            </View>)
        }
        <TouchableOpacity onPress={toggleModal}>
        <Image style={{width:50,height:50,borderWidth:3,borderRadius:100,borderColor:'#fff',marginTop:-10}} source={passenger}/>
        </TouchableOpacity>
      </View>
     
    </View>
     <Modal isVisible={isModalVisible}>
     <View style={{ height:200,backgroundColor:'#fff',position:'absolute',bottom:100,width:'100%',borderRadius:20,padding:20}}>
       <Text style={{fontSize:18,fontWeight:'700'}}>My passengers</Text>

       
          {myPassengers.map((c, index) => (
            <Text> Passenger ID
             {c._id}

            </Text>
          ))
          }
          <TouchableOpacity onPress={toggleModal} style={{position:'absolute',top:10,right:10}}>
<Image source={close} style={{width:25,height:25}}/>
          </TouchableOpacity>
      
     </View>
   </Modal>
   </>
  );
};

export default MapView;

const styles = StyleSheet.create({});
