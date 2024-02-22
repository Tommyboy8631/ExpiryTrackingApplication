import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, {useState}  from 'react'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {GestureHandlerRootView} from 'react-native-gesture-handler';



function AppCard({title, subtitle, expiry, onLongPress, renderRightActions}) {

  const imageMappings = {
    Carbohydrates: require('./assets/Carbohydrates.png'),
    Etc: require('./assets/Etc.png'),
    Fruit: require('./assets/Fruit.png'),
    Meat: require('./assets/Meat.png'),
    Vegetables: require('./assets/Vegitables.png')
  };

  const imageSource = imageMappings[subtitle] || require('./assets/defaultImage.png');


  return (
        <GestureHandlerRootView>
          <Swipeable renderRightActions={renderRightActions}>
            <TouchableOpacity style={[styles.card, styles.shadowProp]} onLongPress={onLongPress}>
              <Image source={imageSource} style={styles.image} resizeMode='contain'></Image>
              <View style={styles.view}>
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
              </View>
              <View style={[styles.view2, {flexGrow: 1}]}>
              </View>
              <Text style={styles.expiry}>{expiry}</Text>
            </TouchableOpacity>
          </Swipeable>
        </GestureHandlerRootView>

  )
}

const styles = StyleSheet.create({
    card: {
      justifyContent: "center",
      borderRadius: 12,
      backgroundColor: "#fff",
      margin: 5,
      width: "95%",
      height: 70,
      flexDirection: "row",
      borderWidth: 1,
      borderColor: "lightgrey",
      padding: 5,
      flexDirection: "row",
      fontFamily: "sans-serif",
      alignSelf: "center"

    },
    image: {
      flex: -1,
      height: "100%",
      width: 35,
      alignSelf: "flex-start",
      margin: 2,
      marginRight: 7,
    },
    title: {
      flex: 1,
      fontSize: 20,
      color: "lightgrey",

    },
    subtitle: {
      flex: 1,
    },
    expiry: {
      flex: -1,
      margin: 3,
      alignSelf: "center",
    },
    shadowProp: {
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    view: {
      flex: 1,
      flexDirection: "column",
      padding: 4,
      alignItems: "flex-start",
      justifyContent: "center",
      flexGrow: 1,

    },
    view2: {
      flexGrow: 1,

    }
})

export default AppCard