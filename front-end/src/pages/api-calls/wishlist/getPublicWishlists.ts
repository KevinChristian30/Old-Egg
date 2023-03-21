import { ENV } from "@/ENV";
import axios from "axios";

const getPublicWishlists = async (pageNumber: Number, pageSize: Number) => {

  try{

    const body = {
      page_number: Number(pageNumber),
      page_size: Number(pageSize)
    }

    const response = await axios.post(ENV.API + 'get-public-wishlists', body);
    const result = response.data;

    return result;

  } catch(error){

    return -1;

  }
  
}

export default getPublicWishlists;