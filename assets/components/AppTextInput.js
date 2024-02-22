import { StyleSheet, Text, View, SafeAreaView, GestureHandlerRootView, TextInput } from 'react-native'
import React from 'react'
import Icon from './Icon'

const AppTextInput = ({icon, placeholder, backgroundColor="lightgrey", iconColor="grey", onChangeText, ...otherProps}) => {
  return (
        <SafeAreaView style={styles.container}>
            {icon && <Icon style={styles.icon} name={icon} size={30} backgroundColor={backgroundColor} iconColor={iconColor}/>}
            <TextInput onChangeText={text => onChangeText(text)} style={styles.textInput} placeholder={placeholder} {...otherProps}/>
        </SafeAreaView>

  )
}

export default AppTextInput

const styles = StyleSheet.create({
    container: {
        height: 40,
        width: "90%",
        backgroundColor: 'rgba(222, 222, 222, 0.20)',
        borderRadius: 10,
        flexDirection: "row",
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,

    },
    icon: {
        flex: 1,
        alignSelf: "flex-start",
    },
    textInput: {
        flex: 1,
        fontSize: 15,
        fontFamily: "Roboto",
        margin: "auto",
        color: "grey",
    }
})