import { ENV } from "@/ENV";
import axios from "axios";

const getAllProducts = async (shopID: Number, pageNumber: Number, isAvailableOnly: boolean) => {

  try{

    const getAllProductsBody = {
      "shop_id": shopID,
      "page_number": pageNumber,
      "is_available_only": isAvailableOnly
    }

    const response = await axios.post(ENV.API + 'get-products' , getAllProductsBody);
    const result =  response.data;
    return result;

  } catch (error){

    return -1;

  }
  
}
 
export default getAllProducts;