import { ENV } from "@/ENV";
import axios from "axios";

const getAllProducts = async () => {

  try{
    
    const response = await axios.get(ENV.API + 'get-all-products')
    const result =  response.data;
    return result;

  } catch (error){

    return -1;

  }
  
}
 
export default getAllProducts;