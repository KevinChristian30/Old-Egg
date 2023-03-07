import { ENV } from "@/ENV";
import axios from "axios";

const getProductCategoryByShopID = async (shopID: Number) => {

  try{

    const body = {
      id: Number(shopID)
    }

    const response = await axios.post(ENV.API + 'get-product-category-by-shop-id' , body);
    const result =  response.data;
    return result;

  } catch (error){

    return -1;

  }
  
}
 
export default getProductCategoryByShopID;