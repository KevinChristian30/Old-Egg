import { ENV } from "@/ENV";
import Shop from "@/types/Shop";
import axios from "axios";

const addShop = async (shop: Shop) => {

  try{

    const response = await axios.post(ENV.API + 'create-shop', shop);
    const result = response.data;

    if (result === 'Email is Not Unique') return -2;
    if (result === 'Password Hashing Failed') return -3;

    return result;

  } catch(error){

    return -1;

  }
  
}

export default addShop;