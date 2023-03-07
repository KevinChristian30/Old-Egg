import { ENV } from "@/ENV";
import axios from "axios";

const getDeliveryProviders = async () => {

  try{

    const response = await axios.get(ENV.API + 'get-delivery-providers');
    const result =  response.data;
    return result;

  } catch (error){

    return -1;

  }
  
}
 
export default getDeliveryProviders;