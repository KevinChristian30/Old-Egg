import { ENV } from "@/ENV";
import axios from "axios";

const removeAddress = async (ID: Number) => {

  try{

    const body = {
      id: Number(ID),
    }

    const response = await axios.post(ENV.API + 'remove-address', body);
    const result = response.data;
    
    return result;

  } catch(error){

    return -1

  }
  
}

export default removeAddress;