import { ENV } from "@/ENV";
import User from "@/types/User";
import axios from "axios";

const authenticate = async (token: object) => {

  try{

    const response = await axios.get(ENV.API + 'authenticate', token);
    const result = response.data;

    return result;

  } catch(error){

    return -1

  }
  
}

export default authenticate;