import { ENV } from "@/ENV";
import axios from "axios";

const incrementHelpfulTag = async (reviewID: Number) => {

  try{

    const body = {
      review_id: Number(reviewID)
    };

    const response = await axios.post(ENV.API + 'increment-helpful-count', body);
    const result =  response.data;

    return result;

  } catch(error){

    return -1

  }
  
}

export default incrementHelpfulTag;