import { ENV } from "@/ENV";
import User from "@/types/User";
import axios from "axios";

const shopSignIn = async (user: User) => {

  try{

    const response = await axios.post(ENV.API + 'shop-sign-in', user);
    const result = response.data;

    if (result === 'Invalid Email Address') return -2;
    if (result === 'Invalid Password') return -3;
    if (result === 'Failed to Create Token') return -4;
    if (result === 'You Are Banned') return -5;
    return result;

  } catch(error){

    return -1

  }
  
}

export default shopSignIn;