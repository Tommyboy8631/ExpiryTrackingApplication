import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ErrorMessage = ({error}) => {
  if (!error) return null;

  return (
    <Text style={styles.text}>{error}</Text>
  )
}

export default ErrorMessage

const styles = StyleSheet.create({
  text:{
    alignSelf: "center"
  }
})