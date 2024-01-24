import { StyleSheet, Text, View, SafeAreaView, Button, Alert, Dimensions, Pressable } from 'react-native';
import WelcomePage from './assets/Pages/WelcomePage';
import ListPage from './assets/Pages/ListPage';
import ListItemDeleteAction from './assets/components/ListItemDeleteAction';
import AppTextInput from './assets/components/AppTextInput';
import Constants from "expo-constants";
import Screen from './assets/Pages/Screen';
import AppPicker from './assets/components/AppPicker';
import React, {useState} from 'react';
import LoginPage from './assets/Pages/LoginPage';


export default function App() {
  

  const items = [
    {
      id: 1,
      label: "Fruit"
    },
    {
      id: 2,
      label: "Meat"
    },
    {
      id: 3,
      label: "Vegitables"
    },
]

  return (
      <LoginPage>
        
      </LoginPage>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    alignItems: "center",
    justifyContent: "center",

  }
});


