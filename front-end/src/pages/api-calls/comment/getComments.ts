import { ENV } from "@/ENV";
import axios from "axios";

const getComments = async (wishlistID: Number) => {

  try{

    const body = {
      wishlist_id: Number(wishlistID),
    }

    const response = await axios.post(ENV.API + 'get-comments', body);
    const result =  response.data;
    return result;

  } catch (error){

    return -1;

  }
  
}
 
export default getComments;