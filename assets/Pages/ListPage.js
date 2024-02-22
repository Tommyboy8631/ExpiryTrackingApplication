import { View, Text, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import React, {useState} from 'react';
import AppCard from '../components/AppCard';
import Constants from "expo-constants";
import Swipeable from 'react-native-gesture-handler/Swipeable';
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
import { useEffect } from 'react';

const validationSchema = Yup.object().shape({
    food: Yup.string().required().label("Name").max(12).min(3),
    category: Yup.string().required(),
    expiry: Yup.string().required()
});

function ListPage() {

    const [listings, setListings] = useState([]);

    useEffect(() => {
        LoadItems();
    }, [])

    const LoadItems = async () => {
        const response = await itemAPI.getItems(1)
        setListings(response.data)
    }
    

    const TempCatagories = [
        {label: "Fruit", id: 1},
        {label: "Vegetables", id: 2},
        {label: "Meat", id: 3},
        {label: "Carbohydrates", id: 4},
        {label: "Etc", id: 5},
    ]

    const [refreshing, setRefreshing] = useState(false);
    const [addPageActive, setAddPageActive] = useState(false);
    
    const handleOnSwipe = item => {

        //still not working need to look over ....
        useEffect(() => {
            LoadRemoveItems();
        }, [])
    
        const LoadRemoveItems = async () => {
            const response = await removeItemAPI.removeItem(item.ID)
            if (response.problem){
                console.log("There is a porblem with removeing item " + response.problem)
            }
        }

        
        const newItems = listings.filter(i => i.ID !== item.ID)
        setListings(newItems);

    

    }

    const handleOnPress = () => {
        console.log("Pressed");
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
            <FlatList data={listings}
            keyExtractor={item => item.ID}
            renderItem={({item}) => <AppCard title={item.Name} subtitle={item.Subtitle} expiry={item.Expiry}
                onLongPress={handleOnPress}
                renderRightActions={() => <ListItemDeleteAction onPress={() => handleOnSwipe(item)}></ListItemDeleteAction>}/>}
            refreshing={refreshing}
            onRefresh={() => {
                
                //soon push to function
            }}>
            </FlatList>
        
        </SafeAreaView>
        <Modal visible={addPageActive} animationType='slide'>

            <TouchableOpacity style={styles.button} onPress={() => setAddPageActive(false)}>
                <Icon name="close" iconColor='black' backgroundColor='white' size={50}></Icon>

                <Formik
                initialValues={{food: "", category: "", expiry: ""}}
                onSubmit={values => setItems((items) => [...items, {id: items.size+1, title: values.food, subtitle: values.category, expiry: values.expiry}])}
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