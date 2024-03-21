import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const RegistorNotifications = async () =>{
    const projectId = Constants.expoConfig.extra.eas.projectId;
    
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      if( status != "granted") return;
      const token = await Notifications.getExpoPushTokenAsync(projectId)
      console.log(token)
    }catch(error){
      console.error("Error getting a push token "+ error)
    }
    return token
  }

export default {
    RegistorNotifications,

}