import { StyleSheet, Text, View, SafeAreaView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import { Formik } from "formik";
import * as Yup from "yup";
import ErrorMessage from '../components/ErrorMessage';
import routes from '../navigation/routes';
import checkUserApi from "../api/checkUser";
import useApi from '../hooks/useApi';
import { useRoute } from "@react-navigation/native";
import cache from "../../utility/cache";

const validationSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required().min(4)
});

const LoginPage = ({ navigation }) => {
  const [detailsUpdated, setDetailsUpdated] = useState(false);
  const getCheckUser = useApi(checkUserApi.checkUser);

  useEffect(() => {
    if (getCheckUser.data && getCheckUser.data.length > 0) {
      console.log('Data state updated:', getCheckUser.data);
      const userData = getCheckUser.data[0];
      if (userData) {
        checkUserLoggedIn(userData.ID);
      } else {
        Alert.alert('Login Failed', 'Username or password is incorrect', [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ]);
        console.log("Username and Password were incorrect");
      }
    }
  }, [getCheckUser.data]); // Add getCheckUser.data as a dependency

  const checkUserLoggedIn = async (id) => {
    try {
      const storedUserId = await cache.get('userId');
      if (storedUserId) {
        await cache.store('userId', id);
        navigation.navigate(routes.LIST_PAGE, { userID: id });
      } else {
        await cache.store('userId', id);
        console.log("UserID saved locally ")
        navigation.navigate(routes.LIST_PAGE, { userID: id });
      }
    } catch (error) {
      console.error('Error checking or saving user ID locally:', error);
    }
  };

  const handleSubmitPress = async (values) => {
    try {
      await getCheckUser.request(values.username, values.password);
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error', 'An error occurred during login. Please try again later.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={handleSubmitPress}
        validationSchema={validationSchema}
        onChange={(values) => setDetailsUpdated(true)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <AppTextInput
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              placeholder="Username"
            />
            {touched.username && errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}

            <AppTextInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder="Password"
              secureTextEntry
            />
            {touched.password && errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}

            <AppButton onPress={handleSubmit} title="Login" />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});
