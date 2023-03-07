import { ENV } from "@/ENV";
import axios from "axios";

const removeFromWishlist = async (wistlistID: Number, productID: string) => {

  try{

    const body = {
      id: Number(wistlistID),
      product_id: productID
    }

    const response = await axios.post(ENV.API + 'remove-from-wishlist', body);
    const result = response.data;

    return result;

  } catch(error){

    return -1;

  }
  
}

export default removeFromWishlist;