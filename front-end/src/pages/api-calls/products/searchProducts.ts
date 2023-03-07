import { ENV } from "@/ENV";
import axios from "axios";

const searchProducts = async (keyword: string, innerKeyword: string, pageNumber: number, isAvailableOnly: boolean) => {

  try{

    const body =  {
      keyword: keyword,
      inner_keyword: innerKeyword,
      page_number: pageNumber,
      is_available_only: isAvailableOnly
    }

    const response = await axios.post(ENV.API + 'search-product' , body);
    const result =  response.data;
    return result;

  } catch (error){

    return -1;

  }
  
}
 
export default searchProducts;