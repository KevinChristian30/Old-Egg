import { ENV } from "@/ENV";
import axios from "axios";

const updateItemsInCart = async (userID: Number, productID: String, quantity: Number) => {

  try{

    const body = {
      user_id: Number(userID),
      product_id: productID,
      quantity: Number(quantity)
    }

    const response = await axios.post(ENV.API + 'update-items-in-cart', body);
    const result = response.data;

    return result;

  } catch(error){

    return -1

  }
  
}

export default updateItemsInCart;