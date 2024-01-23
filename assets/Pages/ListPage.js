import { View, Text, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import React, {useState} from 'react';
import AppCard from '../components/AppCard';
import Constants from "expo-constants";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import ListItemDeleteAction from '../components/ListItemDeleteAction';



function ListPage() {

    const intailListData = [{
        id: 1,
        title: "Chocolate",
        subtitle: "Fruit",
        expiry: "04/05/2025"
    },
        {id: 2,
        title: "Meat",
        subtitle: "Meat",
        expiry: "05/04/2023"}
        ] 

        const [items, setItems] = useState(intailListData)
        const [refreshing, setRefreshing] = useState(false);
    
    const handleOnSwipe = item => {
        const newItems = items.filter(i => i.id !== item.id)
        setItems(newItems);

        //need to talk to server 
    }

    const handleOnPress = () => {
        console.log("Pressed");
    }



  return (
    <SafeAreaView style={styles.view}>
        <FlatList data={items}
        keyExtractor={items => items.id.toString()}
        renderItem={({item}) => <AppCard title={item.title} subtitle={item.subtitle} expiry={item.expiry} 
            onLongPress={handleOnPress}
            renderRightActions={() => <ListItemDeleteAction onPress={() => handleOnSwipe(item)}></ListItemDeleteAction>}/>}
        refreshing={refreshing}
        onRefresh={() => {
            setItems(items)
        }}> 
        </FlatList>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    view: {
        justifyContent: "center",
        padding: "auto",
        flex: 1,
        paddingTop: Constants.statusBarHeight,
    }
})

export default ListPage