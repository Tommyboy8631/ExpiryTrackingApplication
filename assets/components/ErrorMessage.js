import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ErrorMessage = ({error}) => {
  if (!error) return null;

  return (
    <Text>{error}</Text>
  )
}

export default ErrorMessage

const styles = StyleSheet.create({})