import { ENV } from "@/ENV";
import axios from "axios";

const getReviews = async (userID: Number) => {

  try{

    const body = {
      user_id: Number(userID)
    };

    const response = await axios.post(ENV.API + 'get-reviews', body);
    const result =  response.data;

    return result;

  } catch(error){

    return -1

  }
  
}

export default getReviews;