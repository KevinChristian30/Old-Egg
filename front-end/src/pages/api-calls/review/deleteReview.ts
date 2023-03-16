import { ENV } from "@/ENV";
import axios from "axios";

const deleteReview = async (token: string, reviewID: Number) => {

  try{

    const body = {
      token: token,
      review_id: Number(reviewID)
    }

    const response = await axios.post(ENV.API + 'delete-review', body);
    const result =  response.data;

    return result;

  } catch(error){

    return -1

  }
  
}

export default deleteReview;