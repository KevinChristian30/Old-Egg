import { ENV } from "@/ENV";
import axios from "axios";

const getShopInformation = async (email: string) => {

  try{

    const body = {
      email: email
    }

    const response = await axios.post(ENV.API + 'get-shop-information', body);
    const result = response.data;

    return result;

  } catch(error){

    return -1

  }
  
}

export default getShopInformation;