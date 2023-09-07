import React, { useState, useEffect } from "react";
import { View, Text,Alert } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import customMarkerImage from "../circle.png"; // Replace with the actual path to your custom marker image
import customLiveImage from "../bus.png"; // Replace with the actual path to your custom marker image


const MapSmall = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [markers, setMarkers] = useState([]);

  const handleMarkerPress = (marker) => {
    Alert.alert(
      "Pick the passenger",
      `Do you want to pick ${marker._id}`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        }
        
      ],
      { cancelable: false }
    );
  };
  
  const updateMarkerStatus = async (markerId) => {
    try {
      await axios.put(`https://transpo-go.onrender.com/trips/${markerId}`, {
        status: "picked",
      });
      // You may want to handle success or error here
    } catch (error) {
      console.error("Error updating marker status:", error);
      // Handle error here
    }
  };
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);

      // Fetch locations from the server when component mounts
      //fetchLocationsFromServer(location.coords.latitude, location.coords.longitude);
    })();
  }, []); // Empty dependency array to run only once when component mounts
useEffect(()=>{
  fetchLocationsFromServer()
},[markers])
  const fetchLocationsFromServer = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://transpo-go.onrender.com/trips?latitude=${latitude}&longitude=${longitude}`
      );

      // Assuming the response.data is an array of locations
      setMarkers(response.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };
  const waitingMarkers = markers.filter((marker) => marker.status === "waiting");

  return (
    <View style={{ flex: 1 }}>
      {location ? (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          provider={PROVIDER_GOOGLE}
          customMapStyle={customMapStyle} // Apply custom map style

        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Current Location"
            image={customLiveImage}

          />

          {/* Render markers for locations */}
          {waitingMarkers.map((marker, index) => (
            <Marker
              key={marker._id}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={`Marker ${index}`}
              image={customMarkerImage}
              onPress={() => handleMarkerPress(marker)}


            />
          ))}
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}

      {errorMsg && <Text>{errorMsg}</Text>}
    </View>
  );
};

export default Map;





  const customMapStyle =[
    {
      "featureType": "all",
      "stylers": [
        { "color": "#151515" }
      ]
    },{
      "featureType": "road",
      "stylers": [
        { "color": "#394C1A" }
      ]
     

    }
    ,{
      "featureType": "road.highway",
      "stylers": [
        { "color": "#BFFF56",
        
       }
      ]
     

    },
    
    {
  "elementType": "labels.text.fill",
      "stylers": [
        { "color": "#ffffff" }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "labels",
      "stylers": [
        { "visibility": "on" }
      ]
    }
  ]