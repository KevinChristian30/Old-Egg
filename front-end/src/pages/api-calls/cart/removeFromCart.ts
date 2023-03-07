import { ENV } from "@/ENV";
import axios from "axios";

const removeFromCart = async (userID: Number, productID: string) => {

  try{

    const body = {
      user_id: Number(userID),
      product_id: productID
    }

    const response = await axios.post(ENV.API + 'remove-from-cart', body);
    const result = response.data;

    return result;

  } catch(error){

    return -1

  }
  
}

export default removeFromCart;