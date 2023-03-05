import { ENV } from "@/ENV";
import axios from "axios";

const requestForgotPasswordCode = async (email: string) => {

  try{

    const body = {
      email: email
    }

    const response = await axios.post(ENV.API + 'request-forgot-password-code', body);
    const result = response.data;

    return result;

  } catch(error){

    return -1

  }
  
}

export default requestForgotPasswordCode;