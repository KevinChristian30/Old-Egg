import { ENV } from "@/ENV";
import axios from "axios";

const getTopShops = async (limit: Number) => {

  try{

    const body = {
      "limit": Number(limit)
    }

    const response = await axios.post(ENV.API + 'get-top-shops', body);
    const result = response.data;

    return result;

  } catch(error){

    return -1

  }

}

export default getTopShops;