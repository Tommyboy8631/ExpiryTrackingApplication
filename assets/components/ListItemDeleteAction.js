import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from "@expo/vector-icons"

function ListItemDeleteAction({ onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <SafeAreaView style={styles.container}>
            <MaterialCommunityIcons name="trash-can" size={40} color={"red"} ></MaterialCommunityIcons>
        </SafeAreaView>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        width: 70,
        marginRight: 8,
        alignItems: "center",
        justifyContent: "center"

    }
})

export default ListItemDeleteAction;