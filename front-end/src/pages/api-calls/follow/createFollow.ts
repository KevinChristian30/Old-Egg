import { ENV } from "@/ENV";
import axios from "axios";

const createFollow = async (userID: Number, wishlistID: Number) => {

  try{

    const body = {
      user_id: Number(userID),
      wishlist_id: Number(wishlistID)
    }

    const response = await axios.post(ENV.API + 'create-follow', body);
    const result =  response.data;
    return result;

  } catch (error){

    return -1;

  }
  
}
 
export default createFollow;