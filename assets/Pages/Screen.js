import { StyleSheet, Text, View, SafeAreaView, Dimensions } from 'react-native'
import React from 'react'
import Constants from "expo-constants";

const Screen = () => {
  return (
    <SafeAreaView style={styles.container}>

    </SafeAreaView>
  )
}

export default Screen

const styles = StyleSheet.create({
    container: 
    {
        paddingTop: Constants.statusBarHeight,
        width: Math.min(400, Dimensions.get('window').width),
        backgroundColor: "red",

    }
})