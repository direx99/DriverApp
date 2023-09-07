import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AppHead = ()=>{
    return(
      <View style={{paddingTop:20,flexDirection:'row',gap:1}}>
        <Text style={{
          fontSize:28,
          fontWeight:'600',
          color:'#fff'
          
        }}>Transpo</Text>
         <Text style={{
          fontSize:28,
          fontWeight:'600',
          color:'#A4D357'
          
        }}>Go</Text>
        <Text style={{
          fontSize:40,
          fontWeight:'800',
          marginTop:-12,
          color:'#A4D357'
        }}>.</Text>
      </View>
    )
  }
  

export default AppHead

const styles = StyleSheet.create({})