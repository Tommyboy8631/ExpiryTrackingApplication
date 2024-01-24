import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React, {useState } from 'react'
import AppTextInput from '../components/AppTextInput'
import AppButton from '../components/AppButton'
import { Formik } from "formik"
import * as Yup from "yup"
import ErrorMessage from '../components/ErrorMessage'

const validationSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required().min(4)
})

const LoginPage = () => {
    const handleSubmit = () => console.log("loging in with" + username.toString() + password)
 
  return(
    <SafeAreaView style={styles.container}>
        <Formik
        initialValues={{username: "", password: ""}}
        onSubmit={values => console.log(values)}
        validationSchema={validationSchema}
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