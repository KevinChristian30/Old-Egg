import { ENV } from "@/ENV";
import axios from "axios";

const getAllShops = async () => {

  try{

    const response = await axios.get(ENV.API + 'get-shops');
    const result = response.data;

    return result;

  } catch(error){

    return -1

  }

}

export default getAllShops;