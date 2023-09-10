import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useIsFocused, useNavigation } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import List from './screens/List';
import Details from './screens/Details';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
import SignUp from './screens/SignUp';
import Forgot from './screens/Forgot';
import Home from './screens/Home';
import GetReady from './screens/GetReady';
import get2 from './screens/get2';
import get3 from './screens/get3';
import TaskView from './screens/TaskView';
import ViewBar from './Components/ViewBar';
import User from './screens/User';
import navbar from './screens/Navbar'
import { View,StyleSheet } from 'react-native';
import Navbar from './screens/Navbar';
import Consult from './screens/Consult';
import Call from './screens/Call';
import Quiss from './screens/Quiss';
import PaymentSetting from './screens/PaymentSetting';
import Meditation from './screens/Meditation';
import ConsultList from './screens/ConsultList';
import MusicS from './screens/Music';
import Chatbot from './screens/Chatbot';


const Stack = createNativeStackNavigator()
const InsideStack = createNativeStackNavigator()
const StartedStack = createNativeStackNavigator()

function ScreenNameTracker() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [currentScreenName, setCurrentScreenName] = useState("");

  useEffect(() => {
    if (isFocused) {
      const currentRoute = navigation.getCurrentRoute();
      setCurrentScreenName(currentRoute.name);
    }
  }, [isFocused, navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("state", () => {
      const currentRoute = navigation.getCurrentRoute();
      setCurrentScreenName(currentRoute.name);
    });
    console.log(currentScreenName);

    return unsubscribe;
  }, [navigation]);


  switch (currentScreenName) {
    case "Notification":
      return (
        <View style={styles.btmnav}>
          <View style={styles.BottomNavBar}></View>
        </View>
      );
    case "GetReady":
    case "get2":
    case "get3":
      case "LoginScreen":
        case "SignUp":
          case "quiz":

      return (
        <View style={styles.btmnav}>
        </View>
      );
    default:
      return (
        <View style={styles.btmnav}>
          <View style={styles.BottomNavBar}>
            <Navbar />
          </View>
        </View>
      );
  }

}



function InsideLayout() {
  return (
    <InsideStack.Navigator>

      <InsideStack.Screen name="home" component={Home} options={{ headerShown: false }} />
      <InsideStack.Screen name="task" component={TaskView} options={{ headerShown: false }} />
      <InsideStack.Screen name="chat" component={Chatbot} options={{ headerShown: false }} />
      <InsideStack.Screen name="consult" component={Consult} options={{ headerShown: false }} />
      <InsideStack.Screen name="user" component={User} options={{ headerShown: false }} />
      <InsideStack.Screen name="quiz" component={Quiss} options={{ headerShown: false }} />
      <InsideStack.Screen name="ConsultList" component={ConsultList} options={{ headerShown: false }} />
      <InsideStack.Screen name="payment" component={PaymentSetting} options={{ headerShown: false }} />
      <InsideStack.Screen name="medi" component={Meditation} options={{ headerShown: false }} />
      <InsideStack.Screen name="mus" component={MusicS} options={{ headerShown: false }} />

    </InsideStack.Navigator>
  )
}
function StartedLayout() {
  return (
    <InsideStack.Navigator>
      <StartedStack.Screen name="GetReady" component={GetReady} options={{ headerShown: false }} />
      <StartedStack.Screen name="get2" component={get2} options={{ headerShown: false }} />
      <StartedStack.Screen name="get3" component={get3} options={{ headerShown: false }} />
      <StartedStack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      <StartedStack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      <StartedStack.Screen name="forgot" component={Forgot} options={{ headerShown: false }} />


      <StartedStack.Screen name="call" component={Call} options={{ headerShown: false }} />




    </InsideStack.Navigator>
  )
}
const App = () => {
  const [user, setUser] = useState(null); // No need for type annotation in JavaScript

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    });
  }, []);

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
        <ScreenNameTracker/>

      </NavigationContainer>
    </View>
  )
}

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
    padding: 20,
  },
  btmnav: {
    position: "absolute",
    bottom: -10,
  },
});