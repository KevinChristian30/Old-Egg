import { ENV } from "@/ENV";
import User from "@/types/User";
import axios from "axios";

const updateUser = async (user:User) => {

  try{

    const response = await axios.post(ENV.API + 'update-user', user);
    const result = response.data;

    return result;

  } catch(error){

    return -1

  }

}

export default updateUser;