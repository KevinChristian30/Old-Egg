import { ENV } from "@/ENV";
import axios from "axios";

const getNotifications = async (userID: Number) => {

  try{

    const requestBody = {
      "user_id" : userID
    }

    const response = await axios.post(ENV.API + 'get-notifications', requestBody);
    const result = response.data;

    return result;

  } catch(error){

    return -1

  }

}

export default getNotifications;