import { ENV } from "@/ENV";
import axios from "axios";

const getPopularProductCategories = async () => {

  try{

    const response = await axios.get(ENV.API + 'get-popular-product-categories');
    const result =  response.data;
    return result;

  } catch (error){

    return -1;

  }
  
}
 
export default getPopularProductCategories;