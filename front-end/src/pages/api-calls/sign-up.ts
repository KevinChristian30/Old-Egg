import { ENV } from "@/ENV";
import User from "@/types/User";
import axios from "axios";

const signUp = async (user: User) => {

  try{

    const response = await axios.post(ENV.API + 'sign-up', user);
    return response.data;

  } catch(error){

    console.error(error);

  }
  
}

export default signUp;