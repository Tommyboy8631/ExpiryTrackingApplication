import { createStackNavigator } from "@react-navigation/stack";
import React from "react";


import WelcomePage from "../Pages/WelcomePage";
import LoginPage from "../Pages/LoginPage";
import ListPage from "../Pages/ListPage";

const Stack = createStackNavigator();

const AuthNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name="WelcomePage" component={WelcomePage} options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name="LoginPage" component={LoginPage}></Stack.Screen>
        <Stack.Screen name="ListPage" component={ListPage}></Stack.Screen>
    </Stack.Navigator>
)

export default AuthNavigator;