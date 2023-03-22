import { ENV } from "@/ENV";
import axios from "axios";

const duplicateWishlist = async (userID: Number, wishlistID: Number) => {

  try{

    const body = {
      user_id: Number(userID),
      wishlist_id: Number(wishlistID)
    }

    const response = await axios.post(ENV.API + 'duplicate-wishlist', body);
    const result = response.data;

    return result;

  } catch(error){

    return -1;

  }
  
}

export default duplicateWishlist;