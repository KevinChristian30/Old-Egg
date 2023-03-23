import { ENV } from "@/ENV";
import axios from "axios";

const getMessages = async (from: string, to: string) => {

  try{

    const body = {
      from: from,
      to: to
    }

    const response = await axios.post(ENV.API + 'get-messages', body);
    const result =  response.data;

    return result;

  } catch (error){

    return -1;

  }
  
}
 
export default getMessages;