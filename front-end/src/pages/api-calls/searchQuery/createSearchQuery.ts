import { ENV } from "@/ENV";
import axios from "axios";

const createSearchQuery = async (email: string ,keyword: string, innerKeyword: string, isAvailableOnly: boolean) => {

  try{

    const body =  {
      email: email,
      keyword: keyword,
      inner_keyword: innerKeyword,
      is_available_only: isAvailableOnly
    }

    const response = await axios.post(ENV.API + 'create-search-query' , body);
    const result =  response.data;

    if (result === "You Already Have 10 Saved Search Queries") return -2;

    return result;

  } catch (error){

    return -1;

  }
  
}
 
export default createSearchQuery;