import { ENV } from "@/ENV";
import axios from "axios";

const createCustomerServiceReview = async (userID: Number, review: string) => {

  try{

    const body = {
      user_id: Number(userID),
      review: review
    }

    const response = await axios.post(ENV.API + 'create-customer-service-review', body);
    const result =  response.data;
    return result;

  } catch (error){

    return -1;

  }
  
}
 
export default createCustomerServiceReview;