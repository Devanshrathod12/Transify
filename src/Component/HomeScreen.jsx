import { StyleSheet, Text, View , FlatList } from 'react-native'
import React from 'react'

const HomeScreen = () => {

  const data = [
      {
        id:1,
        name:"Devansh"
      },
      {
        id:2,
        name:"rathod"
      }
  ]

  return (
    <>
     <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View>
          <Text>{item.name}</Text>
        </View>
      )}
    />
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