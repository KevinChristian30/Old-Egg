import { ENV } from "@/ENV";
import axios from "axios";

const getAllProducts = async (shopID: Number, pageNumber: Number, isAvailableOnly: boolean, keyword?: string, innerKeyword?: string) => {

  try{

    const getAllProductsBody = {
      "shop_id": Number(shopID),
      "page_number": Number(pageNumber),
      "is_available_only": isAvailableOnly,
      keyword: keyword ? keyword : '',
      inner_keyword: innerKeyword ? innerKeyword : ''
    }

    const response = await axios.post(ENV.API + 'get-products' , getAllProductsBody);
    const result =  response.data;
    return result;

  } catch (error){

    return -1;

  }
  
}
 
export default getAllProducts;