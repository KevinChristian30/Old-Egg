import { ENV } from "@/ENV";
import axios from "axios";

const getProductByID = async (productID: string) => {

  try{

    const body = {
      product_id: productID 
    }

    const response = await axios.post(ENV.API + 'get-product-by-id' , body);
    const result =  response.data;

    if (result === 'Shop is Banned') return -2;

    return result;

  } catch (error){

    return -1;

  }
  
}
 
export default getProductByID