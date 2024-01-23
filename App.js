import { StyleSheet, Text, View, SafeAreaView, Button, Alert, Dimensions, Pressable } from 'react-native';
import WelcomePage from './assets/Pages/WelcomePage';
import ListPage from './assets/Pages/ListPage';
import ListItemDeleteAction from './assets/components/ListItemDeleteAction';
import AppTextInput from './assets/components/AppTextInput';
import Constants from "expo-constants";


export default function App() {

  return (
      <View style={styles.container}>
        <AppTextInput icon="mail" placeholder="Email ..." backgroundColor="green"></AppTextInput>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  }
});


