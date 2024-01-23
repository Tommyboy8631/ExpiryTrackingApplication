import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, Alert, Dimensions, Pressable, ImageBackground } from 'react-native';
import AppButton from '../components/AppButton';

function WelcomePage(props) {


    const handleOnPressLogin = () => console.log("Tapped")
    const handleOnPressRegistor = () => console.log("Tapped")
    const backgroundImage = require("./loginBackground.png");

  return (
    <ImageBackground style={styles.container} source={backgroundImage}>
        <SafeAreaView style={styles.view}>

        </SafeAreaView>
        <AppButton title="Login" onPress={handleOnPressLogin}/>
        <AppButton title="Register" onPress={handleOnPressRegistor}/>
      </ImageBackground>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      height: "100%",
      alignItems: 'center',
      justifyContent: 'center',
    },
    view: {
      flex: 1,
    },
    loginButton: {
      alignItems: "center",
      justifyContent: "center",
      padding: 12,
      margin: 6,
      borderBlockColor: "white",
      borderRadius: 10,
      backgroundColor: 'rgba(52, 52, 52, 0.8)',
      width: "80%",
      height: 40,
      bottom: 1,
    },
    registorButton: {
      alignItems: "center",
      justifyContent: "center",
      padding: 12,
      margin: 6,
      marginBottom: 15,
      borderBlockColor: "white",
      borderRadius: 10,
      backgroundColor: 'rgba(52, 52, 52, 0.8)',
      width: "80%",
      height: 40,
      bottom: 1,
    },
    buttonText: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    }
  })

  export default WelcomePage;