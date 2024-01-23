import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from "@expo/vector-icons"

const Icon = ({name, size = 30, backgroundColor = "black", iconColor = "white"}) => {
  return (
     <View style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: backgroundColor,
        justifyContent: "center",
        alignItems: "center",
        margin: 5,

     }}>
        <MaterialCommunityIcons name={name} size={size * 0.55} color={iconColor}/>
     </View>   
  )
}

export default Icon

const styles = StyleSheet.create({})