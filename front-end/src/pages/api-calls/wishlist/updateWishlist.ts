import { ENV } from "@/ENV";
import getCookie from "@/utility/getCookie";
import axios from "axios";

const updateWishlist = async (wishlistID: Number, wishlistName: string, isPrivate: boolean) => {

  try{

    const body = {
      token: getCookie('Auth'),
      wishlist_id: Number(wishlistID),
      wishlist_name: wishlistName,
      is_private: isPrivate
  }

    const response = await axios.post(ENV.API + 'update-wishlist', body);
    const result = response.data;

    if (result === 'Wishlist Updated') return result;
    else return -2;

  } catch(error){

    return -1;

  }
  
}

export default updateWishlist;