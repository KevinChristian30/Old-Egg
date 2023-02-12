import { ENV } from "@/ENV";
import User from "@/types/User";
import axios from "axios";

const signIn = async (user: User) => {

  try{

    const response = await axios.post(ENV.API + 'sign-in', user);
    const result = response.data;

    if (result === 'Email Not Found') return -2;
    if (result === 'Incorrect Password') return -3;
    return result;

  } catch(error){

    return -1

  }
  
}

export default signIn;