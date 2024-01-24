import { StyleSheet, Text, View, SafeAreaView, GestureHandlerRootView, TouchableOpacity, Modal, Button, FlatList} from 'react-native'
import Icon from './Icon'
import React, {useState} from 'react';
import PickerItem from './PickerItem';

const AppPicker = ({icon, items, onSelectItem, selectedItem,  placeholder, backgroundColor, iconColor}) => {

    const [modalVisible, setmodalVisible] = useState(false)
    const handleOnItemPress = () => console.log("Pressed")

  return (
        <React.Fragment>
            <TouchableOpacity onPress={() => setmodalVisible(true)}>
                <SafeAreaView style={styles.container}>
                    {icon && <Icon style={styles.icon} name={icon} size={25} backgroundColor={backgroundColor} iconColor={iconColor}/>}
                    <Text style={styles.textInput}>{selectedItem ? selectedItem.label : placeholder}</Text>
                    <Icon style={styles.icon} name="chevron-down" size={25} backgroundColor={backgroundColor} iconColor={iconColor}/>
                </SafeAreaView>
            </TouchableOpacity>
            <Modal visible={modalVisible} animationType='slide'>
                <Button title="Close" style={{backgroundColor: "grey"}} onPress={() => setmodalVisible(false)}></Button>
                <FlatList 
                    data={items}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => <PickerItem label={item.label} onPress={() => {
                        setmodalVisible(false);
                        onSelectItem(item);
                    }}></PickerItem>}
                />
            </Modal>
        </React.Fragment>

  )
}

export default AppPicker

const styles = StyleSheet.create({
    container: {
        height: 40,
        width: "100%",
        backgroundColor: 'rgba(222, 222, 222, 0.20)',
        borderRadius: 10,
        flexDirection: "row",
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        flex: 1,
        alignSelf: "flex-start",
    },
    textInput: {
        flex: 1,
        fontSize: 18,
        fontFamily: "Roboto",
        margin: "auto",
    }
})