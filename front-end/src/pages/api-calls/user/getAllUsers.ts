import { ENV } from "@/ENV";
import axios from "axios";

const getAllUsers = async () => {

  try{

    const response = await axios.get(ENV.API + 'get-users');
    const result = response.data;

    return result;

  } catch(error){

    return -1

  }

}

export default getAllUsers;