import { ENV } from "@/ENV";
import Shop from "@/types/Shop";
import axios from "axios";

const updateShop = async (shop: Shop) => {

  try{

    const response = await axios.post(ENV.API + 'update-shop', shop);
    const result = response.data;

    return result;

  } catch(error){

    return -1

  }

}

export default updateShop;