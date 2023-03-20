import { ENV } from "@/ENV";
import axios from "axios";

const getCustomerServiceReview = async () => {

  try{

    const response = await axios.get(ENV.API + 'get-customer-service-reviews');
    const result =  response.data;

    return result;

  } catch(error){

    return -1

  }
  
}

export default getCustomerServiceReview;