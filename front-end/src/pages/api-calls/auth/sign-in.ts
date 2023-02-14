import { ENV } from "@/ENV";
import User from "@/types/User";
import axios from "axios";

const signIn = async (user: User) => {

  try{

    const response = await axios.post(ENV.API + 'sign-in', user);
    const result = response.data;

    if (result === 'Invalid Email Address') return -2;
    if (result === 'Invalid Password') return -3;
    if (result === 'Failed to Create Token') return -4;
    return result;

  } catch(error){

    return -1

  }
  
}

export default signIn;