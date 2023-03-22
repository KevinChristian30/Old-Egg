import { ENV } from "@/ENV";
import axios from "axios";

const createComment = async (userID: Number, wishlistID: Number, comment: string, isAnonymous: boolean) => {

  try{

    const body = {
      user_id: Number(userID),
      wishlist_id: Number(wishlistID),
      comment: comment,
      is_anonymous: isAnonymous
    }

    const response = await axios.post(ENV.API + 'create-comment' , body);
    const result =  response.data;
    return result;

  } catch (error){

    return -1;

  }
  
}
 
export default createComment;