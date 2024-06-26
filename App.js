import { StyleSheet, Text, View, SafeAreaView, Button, Alert, Dimensions, Pressable } from 'react-native';
import WelcomePage from './assets/Pages/WelcomePage';
import ListPage from './assets/Pages/ListPage';
import ListItemDeleteAction from './assets/components/ListItemDeleteAction';
import AppTextInput from './assets/components/AppTextInput';
import Constants from "expo-constants";
import Screen from './assets/Pages/Screen';
import AppPicker from './assets/components/AppPicker';
import React, {useEffect, useState} from 'react';
import LoginPage from './assets/Pages/LoginPage';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation  } from '@react-navigation/native';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import cache from "./utility/cache";
import useApi from './assets/hooks/useApi';
import updateToken from './assets/api/updateToken';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const Stack = createStackNavigator();

export default function App() {
  const projectId = Constants.expoConfig.extra.eas.projectId;
  const [notificationPermission, setNotificationPermission] = useState(null);

  const [userId, setUserId] = useState(null);

  const updateTokenApi = useApi(updateToken.updateToken)

  useEffect(() => {
    checkUserLoggedIn();
  }, []); 

 
  
  const checkUserLoggedIn = async () => {
    console.log("Checking for stored user ID")
    try {
      const storedUserId = await cache.get("userId")
      if (storedUserId) {
        console.log("Stored User ID has been found: " + storedUserId);
        setUserId(storedUserId);
      } else {
        console.log("User ID not found locally");
      }
    } catch (error) {
      console.error('Error checking user login status:', error);
    }
  } 
  

  return (
    <NavigationContainer style={styles.container}>
    <Stack.Navigator>
      {userId ? (
        <Stack.Screen name="ListPage" component={ListPage} initialParams={{ userID: userId }} />
      ) : (
        <>
          <Stack.Screen name="WelcomePage" component={WelcomePage} options={{ headerShown: false }} />
          <Stack.Screen name="LoginPage" component={LoginPage} />
          <Stack.Screen name="ListPage" component={ListPage} initialParams={{ userID: userId }} />
        </>
      )}
    </Stack.Navigator>
  </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    alignItems: "center",
    justifyContent: "center",

  }
});


