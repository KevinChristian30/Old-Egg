import { ENV } from "@/ENV";
import axios from "axios";

const subscribeToNewsletter = async (email: string) => {

  try{

    const body = {
      email: email
    }

    const response = await axios.post(ENV.API + 'subscribe-to-newsletter', body);
    const result = response.data;

    return result;

  } catch(error){

    return -1

  }
  
}

export default subscribeToNewsletter;