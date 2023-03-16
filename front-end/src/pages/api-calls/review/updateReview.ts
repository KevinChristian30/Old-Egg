import { ENV } from "@/ENV";
import axios from "axios";

const updateReview = async (token: string, reviewID: Number, rating: Number, details: string) => {

  try{

    const body = {  
      token: token,
      review_id: Number(reviewID),
      rating: Number(rating),
      details: details
    };

    const response = await axios.post(ENV.API + 'update-review', body);
    const result =  response.data;

    return result;

  } catch(error){

    return -1

  }
  
}

export default updateReview;