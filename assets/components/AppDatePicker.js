import { StyleSheet, Text, View, SafeAreaView, GestureHandlerRootView, TouchableOpacity, Modal, Button, FlatList} from 'react-native'
import Icon from './Icon'
import React, {useState} from 'react';
import PickerItem from './PickerItem';
import AppButton from './AppButton';
import DatePicker from 'react-native-modern-datepicker';


const AppDatePicker = ({icon, items, onSelectItem, selectedItem,  placeholder, backgroundColor, iconColor}) => {

    const [show, setShow] = useState(false)
    const [date, setDate] = useState("")
    const handleOnItemPress = (event) => console.log(event)

  return (
        <React.Fragment>
            <TouchableOpacity onPress={() => setShow(true)}>
                <SafeAreaView style={styles.container}>
                    {icon && <Icon style={styles.icon} name={icon} size={25} backgroundColor={backgroundColor} iconColor={iconColor}/>}
                    <Text style={styles.textInput}>{selectedItem ? selectedItem : placeholder}</Text>
                    <Icon style={styles.icon} name="update" size={25} backgroundColor={backgroundColor} iconColor={iconColor}/>
                </SafeAreaView>
            </TouchableOpacity>
            <Modal visible={show}>
            <AppButton title="Close" style={{backgroundColor: "grey"}} onPress={() => setShow(false)}></AppButton>
            <DatePicker
               format={"DD/MM/YYYY"}
               onDateChange={date => onSelectItem(date)}
               selected={selectedItem}
               mode='datepicker'
               />
            </Modal>
        </React.Fragment>

  )
}

export default AppDatePicker

const styles = StyleSheet.create({
    container: {
        height: 40,
        width: "90%",
        backgroundColor: 'rgba(222, 222, 222, 0.20)',
        borderRadius: 10,
        flexDirection: "row",
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
    
    },
    icon: {
        flex: 1,
        alignSelf: "flex-start",
    },
    textInput: {
        flex: 1,
        fontSize: 15,
        fontFamily: "Roboto",
        margin: "auto",
        color: "grey",
    }
})