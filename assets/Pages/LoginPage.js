import { StyleSheet, Text, View, SafeAreaView, Alert, AsyncStorage } from 'react-native'
import React, {useState } from 'react'
import AppTextInput from '../components/AppTextInput'
import AppButton from '../components/AppButton'
import { Formik } from "formik"
import * as Yup from "yup"
import ErrorMessage from '../components/ErrorMessage'
import routes from '../navigation/routes'
import checkUserApi from "../api/checkUser"
import useApi from '../hooks/useApi'
import { useRoute } from "@react-navigation/native"
import cache from "../../utility/cache"

const validationSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required().min(4)
})

const LoginPage = ({ navigation }) => {
    let getCheckUser = useApi(checkUserApi.checkUser)
    
    const checkUserLoggedIn = async (id) => {
        try {
            const storedUserId = await cache.get('userId');
            if (storedUserId) {
                await cache.store('userId', id);
                navigation.navigate(routes.LIST_PAGE, {userID: id});
            }else{
                try {
                    
                    await cache.store('userId', id);
                    console.log("UserID saved locally ")
                    navigation.navigate(routes.LIST_PAGE, {userID: id});
                } catch (error) {
                    console.error('Error saving user ID Localally:', error);
                }
          }
        } catch (error) {
          console.error('Error checking user local login status:', error);
        }
      };

    const handleSubmit = values => {
        getCheckUser.request(values.username, values.password)
        
        console.log(getCheckUser.data)
        try {
            if (getCheckUser.data[0] != null) {
                checkUserLoggedIn(getCheckUser.data[0].ID)
            } else {
              Alert.alert('Login Failed', "username or password is incorrect" [
                {text: 'OK', onPress: () => console.log('OK Pressed')}
              ]);
              console.log("Username and Password where in correct ")
              return
            }
          } catch (error) {
            console.error('Error during login:', error);
            Alert.alert('Error', 'An error occurred during login. Please try again later.');
          }

    }


  return(
    <SafeAreaView style={styles.container}>
        <Formik
        initialValues={{username: "", password: ""}}
        validateOnBlur={false}
        onSubmit={values => handleSubmit(values)}
        validationSchema={() => validationSchema}
        >
            {({handleChange, handleSubmit, errors, setFieldTouched, touched}) => 
                <>
                    <AppTextInput placeholder="username ...." icon="email" onBlur={() => setFieldTouched("username")} onChangeText={handleChange("username")} autoCapitalize="none" autoCorrect={false}>
                    </AppTextInput>
                    {touched.username && <ErrorMessage error={errors.username}></ErrorMessage>}
                    <AppTextInput placeholder="password ..." icon="lock" onBlur={() => setFieldTouched("password")} onChangeText={handleChange("password")} autoCapitalize="none" autoCorrect={false} textContentType="password" secureTextEntry={true}>
                    </AppTextInput>
                    {touched.password && <ErrorMessage error={errors.password}></ErrorMessage>}

                    <AppButton title="Login" onPress={handleSubmit}> </AppButton>
                
                </>
            }

        </Formik>
    </SafeAreaView>
  )
}

export default LoginPage

const styles = StyleSheet.create({
    logo: {
        width: 80,
        height: 80,
        alignSelf: "center",
        marginTop: 50,
        marginBottom: 20,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    input: {
    }

})