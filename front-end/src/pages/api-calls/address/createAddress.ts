import { ENV } from "@/ENV";
import axios from "axios";

const createAddress = async (userID: Number, address: string) => {

  try{

    const body = {
      user_id: Number(userID),
      address: address
    }

    const response = await axios.post(ENV.API + 'create-address', body);
    const result = response.data;
    
    return result;

  } catch(error){

    return -1

  }
  
}

export default createAddress;