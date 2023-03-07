import { ENV } from "@/ENV";
import axios from "axios";

const getItemsFromCart = async (userID: Number) => {

  try{

    const body = {
      user_id: Number(userID)
    }

    const response = await axios.post(ENV.API + 'get-items-in-cart', body);
    const result = response.data;

    return result;

  } catch(error){

    return -1

  }
  
}

export default getItemsFromCart;