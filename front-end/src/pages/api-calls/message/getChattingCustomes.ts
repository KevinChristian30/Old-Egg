import { ENV } from "@/ENV";
import axios from "axios";

const getChattingCustomers = async (userID: string) => {

  try{

    const body = {
      user_id: userID
    }

    const response = await axios.post(ENV.API + 'get-chatting-customers', body);
    const result =  response.data;

    return result;

  } catch (error){

    return -1;

  }
  
}
 
export default getChattingCustomers;