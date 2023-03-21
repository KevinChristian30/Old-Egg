import { ENV } from "@/ENV";
import axios from "axios";

const addWishlistItemsToCart = async (userID: Number, wishlistDetailID: Number) => {

  try{

    const body = {
      "user_id": Number(userID),
      "wishlist_detail_id": Number(wishlistDetailID) 
    }

    const response = await axios.post(ENV.API + 'add-all-items-to-cart', body);
    const result = response.data;

    return result;

  } catch(error){

    return -1;

  }
  
}

export default addWishlistItemsToCart;