import { ENV } from "@/ENV";
import axios from "axios";

const getOneTimeCode = async (email: string) => {

  try{

    const requestBody = {
      "email" : email
    }

    const response = await axios.post(ENV.API + 'get-one-time-code', requestBody);
    const result = response.data;

    return result;

  } catch(error){

    return -1

  }

}

export default getOneTimeCode;