import { ENV } from "@/ENV";
import axios from "axios";

const addItemToCart = async (userID: Number, productID: string, quantity: Number) => {

  try{

    const body = {
      user_id: Number(userID),
      product_id: productID,
      quantity: Number(quantity)
    }

    const response = await axios.post(ENV.API + 'add-to-cart' , body);
    const result =  response.data;
    return result;

  } catch (error){

    return -1;

  }
  
}
 
export default addItemToCart;