import { View, Text, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import React, {useState} from 'react';
import AppCard from '../components/AppCard';
import Constants from "expo-constants";
import ListItemDeleteAction from '../components/ListItemDeleteAction';
import AppDatePicker from '../components/AppDatePicker';
import Icon from '../components/Icon';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import AppPicker from '../components/AppPicker';
import { Formik } from 'formik';
import * as Yup from "yup"
import ErrorMessage from '../components/ErrorMessage';
import itemAPI from "../api/getItems"
import removeItemAPI from "../api/removeItem"
import createItemApi from "../api/createItem"
import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import useApi from '../hooks/useApi';
import NetInfo, { useNetInfo } from '@react-native-community/netinfo';
import { Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import updateToken from '../api/updateToken';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const validationSchema = Yup.object().shape({
    food: Yup.string().required().label("Name").max(12).min(3),
    category: Yup.string().required(),
    expiry: Yup.string().required()
});


function ListPage() {
    const projectId = Constants.expoConfig.extra.eas.projectId;
    const route = useRoute()
    const [UserID, setUserId] = useState(route.params.userID); 

    const [sendRequest, setSendRequest] = useState(1);

    //Handling getting items to display on screen
    const getItemsApi = useApi(itemAPI.getItems)
    const getRemoveItemApi = useApi(removeItemAPI.removeItem)
    const getCreateItemApi = useApi(createItemApi.createItem)
    const updateTokenApi = useApi(updateToken.updateToken)
    
    useEffect(() => {
        RegistorNotifications();
    }, [])

    useEffect(() => {
        getItemsApi.request(UserID);
        console.log("Sending request for Items to server ... Request Number " + sendRequest + " user ID number " + UserID)

    }, [sendRequest])
    

    const TempCatagories = [
        {label: "Fruit", id: 1},
        {label: "Vegetables", id: 2},
        {label: "Meat", id: 3},
        {label: "Carbohydrates", id: 4},
        {label: "Etc", id: 5},
    ]

    const [refreshing, setRefreshing] = useState(false)
    const [addPageActive, setAddPageActive] = useState(false);
    
    const RegistorNotifications = async () =>{
    
        try {
          const { status } = await Notifications.requestPermissionsAsync();
          if( status != "granted") return;
          const token = await Notifications.getExpoPushTokenAsync(projectId)
          console.log(token)
          try {
            console.log("Updating the users token on the database ")
            updateTokenApi.request(UserID, token.data)
          } catch (error) {
            console.error("Error when updating notification token on the database + " + error)
            return
          }
        }catch(error){
          console.error("Error getting a push token "+ error)
        }
        return token
      }

    const handleRemoveItem = item => {
        getRemoveItemApi.request(item.ID)
        console.log("item " + item.ID + " has being removed")
        setSendRequest(sendRequest + 1)
        
    }

    const handleCreateItem = (values) => {
        getCreateItemApi.request(UserID, values.food, values.category, values.expiry)
        setAddPageActive(false)
        setSendRequest(sendRequest + 1)
        //temp put close modal here
    }

    const handleOnSave = (values) => {
        // adding to array locally for now but will soome talk to server ..
        
    }


  return (
    <React.Fragment>
        <SafeAreaView style={styles.view}>
            <TouchableOpacity style={styles.plusButton} onPress={() => setAddPageActive(true)}>
                <Icon name="plus" iconColor='black' backgroundColor='white' size={50}></Icon>
            </TouchableOpacity>
        
            <FlatList data={getItemsApi.data.slice().sort((a, b) => a.Expiry.localeCompare(b.Expiry))}
            keyExtractor={item => item.ID.toString()}
            renderItem={({item}) => <AppCard title={item.Name} subtitle={item.Subtitle} expiry={item.Expiry}
                renderRightActions={() => <ListItemDeleteAction onPress={() => handleRemoveItem(item)}></ListItemDeleteAction>}/>}
            refreshing={refreshing}
            onRefresh={() => {
                setSendRequest(sendRequest + 1)
            }}>
            </FlatList>

            <ActivityIndicator animating={getItemsApi.loading} hidesWhenStopped={true}/>
        
        </SafeAreaView>
        <Modal visible={addPageActive} animationType='slide'>

            <TouchableOpacity style={styles.button} onPress={() => setAddPageActive(false)}>
                <Icon name="close" iconColor='black' backgroundColor='white' size={50}></Icon>

                <Formik
                initialValues={{food: "", category: "", expiry: ""}}
                onSubmit={values => handleCreateItem(values)}
                validationSchema={validationSchema}
                >
                    {({handleChange, handleSubmit, values, errors, setFieldTouched, touched}) => <>

                        <AppTextInput placeholder="Name" onChangeText={handleChange("food")} onBlur={() => setFieldTouched("food")}></AppTextInput>
                        {touched.food && <ErrorMessage error={errors.food}></ErrorMessage>}
                        <AppPicker 
                            placeholder="Catagory"  
                            items={TempCatagories} 
                            backgroundColor="lightgrey" 
                            iconColor="grey" 
                            selectedItem={values.category} 
                            onSelectItem={handleChange("category")} 
                            onBlur={() => setFieldTouched("category")}
                        ></AppPicker>
                        {touched.category && <ErrorMessage error={errors.category}></ErrorMessage>}
                        <AppDatePicker 
                            placeholder="Date of Expiry" 
                            backgroundColor="lightgrey" 
                            iconColor="grey" 
                            selectedItem={values.expiry} 
                            onSelectItem={handleChange("expiry")}
                            onBlur={() => setFieldTouched("expiry")}
                        ></AppDatePicker>
                        {touched.food && <ErrorMessage error={errors.expiry}></ErrorMessage>}
                        <AppButton title="Save" onPress={handleSubmit}></AppButton>   
                    </>}

                </Formik>



                

            </TouchableOpacity>

        </Modal>
    </React.Fragment>
    
  )
}

const styles = StyleSheet.create({
    view: {
        justifyContent: "center",
        padding: "auto",
        flex: 1,
        paddingTop: Constants.statusBarHeight,
    },
    button: {
        alignItems: "flex-end"
    },

})

export default ListPage