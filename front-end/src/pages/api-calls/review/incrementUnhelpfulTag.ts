import { ENV } from "@/ENV";
import axios from "axios";

const incrementUnhelpfulTag = async (reviewID: Number) => {

  try{

    const body = {
      review_id: Number(reviewID)
    };

    const response = await axios.post(ENV.API + 'increment-unhelpful-count', body);
    const result =  response.data;

    return result;

  } catch(error){

    return -1

  }
  
}

export default incrementUnhelpfulTag;