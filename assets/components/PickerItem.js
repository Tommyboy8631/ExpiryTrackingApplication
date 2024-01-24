import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const PickerItem = ({label, onPress}) => {
  return (
    <TouchableOpacity style={styles.text} onPress={onPress}> 
      <Text>{label}</Text>
    </TouchableOpacity>
  )
}

export default PickerItem

const styles = StyleSheet.create({
    text: {
        padding: 20,
    }

})