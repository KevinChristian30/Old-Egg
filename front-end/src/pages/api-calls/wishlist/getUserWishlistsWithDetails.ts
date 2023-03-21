import { ENV } from "@/ENV";
import axios from "axios";

const getUserWishlistsWithDetails = async (userID: Number) => {

  try{

    const body = {
      user_id : userID
    }

    const response = await axios.post(ENV.API + 'get-wishlists-with-details', body);
    const result = response.data;

    return result;

  } catch(error){

    return -1;

  }
  
}

export default getUserWishlistsWithDetails;