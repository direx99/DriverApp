import { StyleSheet,SafeAreaView, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Map from './Map';
import { BlurView } from 'expo-blur';
import s1 from '../assets/seat.png'
import s2 from '../assets/seat2.png'
import { getCurrentPositionAsync } from 'expo-location'; // Import the location module
import axios from 'axios';



const MapView = ({route}) => {

    const [latitude, setLatitude] = useState(0.00);
  const [longitude, setLongitude] = useState(0.00);
  const { responseData } = route.params;
  const tripId = responseData.savedTrip._id;
  const [tt,setTT]=useState(true)

   // State to store the location data
const [locationData, setLocationData] = useState(null);

  // Function to fetch the current location
  const fetchCurrentLocation = async () => {
    try {
      const location = await getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      const cleanup = updateLocationPeriodically();

    // Clean up when the component unmounts
    return () => cleanup();
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };
  useEffect(() => {
    // Fetch the current location when the component mounts
    fetchCurrentLocation();
  }, []);
  // Function to update the location
  const updateLocation = async (id, latitude, longitude) => {
    try {
      const response = await axios.put(
        `https://transpo-go.onrender.com/bustrips/${id}`,
        {
          latitude,
          longitude,
        }
      );

      if (response.status === 200) {
        console.log('Location updated successfully');
        console.log(latitude, longitude);
      } else {
        console.error('Failed to update location');
      }
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  // Function to update location periodically
  const updateLocationPeriodically = () => {
    const intervalId = setInterval(() => {
      // Use the current latitude and longitude
      updateLocation(tripId, latitude, longitude);
      console.log(latitude, longitude);
    }, 5000); // 10 seconds interval

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  };



 

  

  useEffect(() => {
    // Fetch the current location when the component mounts
    fetchCurrentLocation();
  }, []);



   

    const Glassmorphism = () => {
        return (
            <BlurView
              style={{
                position:'absolute',
            top:0,
            paddingTop:70,
            left:0,
            height:140,
            right:0,
            paddingHorizontal:20,
              }}
              tint="dark"
              intensity={60}
              
            >
              {/* Content */}
              <Text style={{fontWeight:'700',color:'#fff',fontSize:20}}>Moratuwa to {responseData.savedTrip.endLocation}</Text>
              <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',gap:2}}>
              <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap:2}}>
              <Text style={{fontWeight:'600',color:'#fff',fontSize:15}}>0 Waiting passengers</Text>
</View>
              <View style={{flexDirection:'row',justifyContent:'flex-end',alignItems:'center',gap:2}}>
              <Text style={{fontWeight:'600',color:'#fff',fontSize:15}}>50</Text>
                <Image source={s1} style={{width:15,height:15}}/>
                <Text style={{fontWeight:'600',color:'#fff',fontSize:15,marginLeft:10}}>0</Text>
                <Image source={s2} style={{width:15,height:15}}/>
                
                </View>

              </View>
            </BlurView>
        );
      };

  return (
    <View style={{flex:1}}>
       
       
      <Map/>
      <View style={{backgroundColor:'#D71313',borderWidth:3,borderColor:'#f1f1f1',position:'absolute',
      left:30,right:30,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:20,
      bottom:30,height:60}}>

        <Text style={{
            color:'#fff',
            fontWeight:'600',
            fontSize:16
        }}>End Trip</Text>

      </View>
      
    <Glassmorphism/>

    
    </View>
  )
}

export default MapView

const styles = StyleSheet.create({})