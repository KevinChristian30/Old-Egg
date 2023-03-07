import { ENV } from "@/ENV";
import axios from "axios";

const getRecommendedProducts = async (batchNumber: Number) => {

  try{

    const body = {
      batch_number: Number(batchNumber)
    }

    const response = await axios.post(ENV.API + 'get-recommended-products', body);
    const result =  response.data;
    return result;

  } catch (error){

    return -1;

  }
  
}
 
export default getRecommendedProducts;