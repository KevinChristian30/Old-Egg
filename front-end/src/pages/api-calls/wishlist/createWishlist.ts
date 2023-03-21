import { ENV } from "@/ENV";
import axios from "axios";

const createWishlist = async (userID: Number, wishlistName: string, isPrivate: boolean) => {

  try{

    const body = {
      user_id: Number(userID),
      wishlist_name: wishlistName,
      is_private: isPrivate 
    }

    const response = await axios.post(ENV.API + 'create-wishlist', body);
    const result = response.data;

    return result;

  } catch(error){

    return -1;

  }
  
}

export default createWishlist;