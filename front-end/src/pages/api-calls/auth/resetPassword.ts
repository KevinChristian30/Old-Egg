import { ENV } from "@/ENV";
import User from "@/types/User";
import axios from "axios";

const resetPassword = async (email: string, newPassword: string) => {

  try{

    const body = {
      "email": email,
      "new_password": newPassword
    }

    const response = await axios.post(ENV.API + 'reset-password', body);
    const result = response.data;

    return result;

  } catch(error){

    return -1

  }
  
}

export default resetPassword;