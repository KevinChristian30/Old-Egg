import { ENV } from "@/ENV";
import axios from "axios";

const addToWishlist = async (wishlistID: Number, productId: string, quantity: Number) => {

  try{

    const body = {
      id: Number(wishlistID),
      product_id: productId,
      quantity: Number(quantity)
    }

    const response = await axios.post(ENV.API + 'add-to-wishlist', body);
    const result = response.data;

    return result;

  } catch(error){

    return -1;

  }
  
}

export default addToWishlist;