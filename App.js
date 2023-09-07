import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useIsFocused, useNavigation } from '@react-navigation/native';
import Map from './Screens/Map'
import NewTrip from './Screens/NewTrip'
import GetStarted from './Screens/GetStarted'
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
import Login from './Screens/Login';
import MapView from './Screens/MapView';


const Stack = createNativeStackNavigator()
const InsideStack = createNativeStackNavigator()
const StartedStack = createNativeStackNavigator()


const App = () => {





  const [user, setUser] = useState(null); // No need for type annotation in JavaScript

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    });
  }, []);




  function InsideLayout() {
    return (
      <InsideStack.Navigator>
  
        <InsideStack.Screen name="newtrip" component={NewTrip} options={{ headerShown: false }} />
        <InsideStack.Screen name="MapView" component={MapView} options={{ headerShown: false }} />

  
      </InsideStack.Navigator>
    )
  }
  function StartedLayout() {
    return (
      <InsideStack.Navigator>
        <StartedStack.Screen name="GetStarted" component={GetStarted} options={{ headerShown: false }} />
        <StartedStack.Screen name="Login" component={Login} options={{ headerShown: false }} />

  
  
  
  
      </InsideStack.Navigator>
    )
  }


  return (
      <View style={{flex:1}}>
  
        <NavigationContainer>
          <Stack.Navigator initialRouteName='dcd'>
  
            {user ? (
              <Stack.Screen name='dcd' component={InsideLayout} options={{ headerShown: false }} />
            ) : (
             
              <Stack.Screen name='cd' component={StartedLayout} options={{ headerShown: false }} />
  
            )}
  
          </Stack.Navigator>
  
        </NavigationContainer>
      </View>
    )
  }  
export default App

const styles = StyleSheet.create({})