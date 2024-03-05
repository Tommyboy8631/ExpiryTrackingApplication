import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const prefix = "cache-";
const expiryTime = 120;

const store = async (key, value) => {
    try {
        const item = {
            value,
            timestamp: Date.now()
        }
        await AsyncStorage.setItem(prefix + key,JSON.stringify(value))
    } catch (error) {
        console.log(error)
    }
}

const get = async (key) => {
    try {
        const response = await AsyncStorage.getItem(prefix + key);
        const item = JSON.parse(response)

        if(!item) return null;

        if(isExpired(item)){
            AsyncStorage.removeItem(prefix + key)
            return null;
        }

        return item

    } catch (error) {
        console.log(error)
    }
}

const isExpired = (item) =>{
    const now = moment(Date.now())
    const storedTime = moment(item.timestamp)
     return now.diff(storedTime, "minutes") > expiryTime
}

export default {
    store,
    get,
}