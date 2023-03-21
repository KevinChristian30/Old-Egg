import { ENV } from "@/ENV";
import axios from "axios";

const getWishlistDetailsByID = async (wishlistID: Number) => {

  try{

    const body = {
      wishlist_id : Number(wishlistID)
    }

    const response = await axios.post(ENV.API + 'get-wishlist-details-by-id', body);
    const result = response.data;

    return result;

  } catch(error){

    return -1;

  }
  
}

export default getWishlistDetailsByID;