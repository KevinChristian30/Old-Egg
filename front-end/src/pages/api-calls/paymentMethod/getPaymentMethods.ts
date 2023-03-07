import { ENV } from "@/ENV";
import axios from "axios";

const getPaymentMethods = async () => {

  try{

    const response = await axios.get(ENV.API + 'get-payment-methods');
    const result =  response.data;
    return result;

  } catch (error){

    return -1;

  }
  
}
 
export default getPaymentMethods;