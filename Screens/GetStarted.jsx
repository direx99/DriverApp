import { Image, SafeAreaView, StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '../Styles.js'
import img1 from '../assets/GetStarted/img1.png'
import img2 from '../assets/GetStarted/img2.png'
import img3 from '../assets/GetStarted/img3.png'
import bgButton from '../assets/GetStarted/bgButton.png'
import AppHead from './AppHead.jsx'
import { useNavigation } from '@react-navigation/native'

const GetStarted = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.ScreenContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{paddingHorizontal:20,alignSelf:'flex-end'}}>
        <AppHead/>
        </View>

        <View style={styles.FirstFlex}>
          <Image source={img1} style={styles.img1Style} />
          <Image source={img2} style={styles.img2Style} />
          <Image source={img3} style={styles.img1Style} />


        </View>

        <View style={styles.SecondFlex}>
          <Text style={styles.TitleStyle}>Get Started</Text>
          <Text style={styles.Title2Style}>Please login or sign up to continue with TranspoGo app </Text>

          <TouchableOpacity style={{ marginTop: 50 }} onPress={()=>navigation.navigate("Login")}>
            <ImageBackground source={bgButton} imageStyle={styles.bgImgStyle} style={styles.bgStyle} >

            <Text style={[styles.Title2Style,{marginTop:0}]}>Login</Text>

            </ImageBackground>

          </TouchableOpacity>

          <TouchableOpacity style={{ marginTop: 10 }}>

            <ImageBackground source={bgButton} imageStyle={styles.bgImgStyle} style={styles.bgStyle} >
            <Text style={[styles.Title2Style,{marginTop:0}]}>Sign Up</Text>

            </ImageBackground>

          </TouchableOpacity>


        </View>


      </SafeAreaView>

    </View>
  )
}

export default GetStarted

