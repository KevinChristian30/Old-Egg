import { ENV } from "@/ENV";
import Shop from "@/types/Shop";
import axios from "axios";

const resetShopPassword = async (email: string, newPassword: string, repeatNewPassword: string) => {

  try{

    const body = {
      email: email,
      new_password: newPassword,
      repeat_new_password: repeatNewPassword
    }
    
    const response = await axios.post(ENV.API + 'reset-shop-password', body);
    const result = response.data;

    if (result === 'Password Saved!') return 1;
    else return result;

  } catch(error){

    return -1

  }

}

export default resetShopPassword;