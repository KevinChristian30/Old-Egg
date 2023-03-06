import { ENV } from "@/ENV";
import axios from "axios";

const changePassword = async (email: string, oldPassword: string, newPassword: string) => {

  try{

    const body = {
      email : email,
      old_password: oldPassword,
      new_password: newPassword
    }

    const response = await axios.post(ENV.API + 'change-password', body);
    const result = response.data;

    if (result === 'Old Password is Wrong') return -2;

    return result;

  } catch(error){

    return -1

  }

}

export default changePassword;