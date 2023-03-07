import { ENV } from "@/ENV";
import axios from "axios";

const getPopularSearchQueries = async () => {

  try{

    const response = await axios.get(ENV.API + 'get-popular-search-queries');
    const result =  response.data;

    return result;

  } catch (error){

    return -1;

  }
  
}
 
export default getPopularSearchQueries;