import { Text, StyleSheet, Pressable, TouchableOpacity} from 'react-native'
import React from 'react'

function AppButton({title, onPress}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      justifyContent: "center",
      padding: 12,
      margin: 10,
      borderBlockColor: "white",
      borderRadius: 10,
      backgroundColor: 'rgba(52, 52, 52, 0.8)',
      width: "80%",
      height: 50,
      bottom: 1,
      marginBottom: 16
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      }
})


export default AppButton