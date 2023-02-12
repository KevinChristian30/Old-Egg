import { ENV } from "@/ENV";
import User from "@/types/User";
import axios from "axios";

const signUp = async (user: User) => {

  try{

    const response = await axios.post(ENV.API + 'sign-up', user);
    const result =  response.data

    if (result === 'Email is Not Unique') return -2
    else if (result === 'Mobile Phone Number is Not Unique') return -3

  } catch(error){

    return -1

  }
  
}

export default signUp;