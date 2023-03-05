import { ENV } from "@/ENV";
import axios from "axios";

const signInWithOneTimeCode = async (email: string, code: string) => {

  try{

    const body = {
      "email": email,
      "code": code
    }

    const response = await axios.post(ENV.API + 'sign-in-with-one-time-code', body);
    const result = response.data;

    if (result === 'Invalid Code') return -2;
    if (result === 'Code is Not Longer Valid') return -3;
    return result;

  } catch(error){

    return -1

  }
  
}

export default signInWithOneTimeCode;