import { StyleSheet, Text, View, SafeAreaView, GestureHandlerRootView, TextInput } from 'react-native'
import React from 'react'
import Icon from './Icon'

const AppTextInput = ({icon, placeholder, backgroundColor}) => {
  return (

        <SafeAreaView style={styles.container}>
            {icon && <Icon style={styles.icon} name={icon} size={32} backgroundColor={backgroundColor}/>}
            <TextInput style={styles.textInput} placeholder={placeholder}/>
        </SafeAreaView>

  )
}

export default AppTextInput

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: "100%",
        backgroundColor: 'rgba(222, 222, 222, 0.20)',
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: "row",
        padding: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    icon: {
        flex: 1,
        alignSelf: "flex-start",
    },
    textInput: {
        flex: 1,
        fontSize: 18,
        fontFamily: "Roboto",
        margin: "auto",
    }
})