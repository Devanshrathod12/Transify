import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HomeScreen = () => {
  return (
    <>
    <View style={styles.container}>
      <View style={styles.InnerContainers}/>
      <View style={styles.InnerContainers}/>
      <View style={styles.InnerContainers}/>
    </View>
   
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container:{
    backgroundColor:"green",
    flex:1,
    alignItems:"center",
     justifyContent:"center"
  },
  InnerContainers:{
    
    backgroundColor:"black",
    borderColor:"black",
    borderWidth:10,
    width:10,
    height:10,
    alignItems:"center"
   
  }
})