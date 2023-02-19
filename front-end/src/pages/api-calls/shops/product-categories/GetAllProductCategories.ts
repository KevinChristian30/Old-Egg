import { ENV } from "@/ENV";
import axios from "axios";

const getAllProductCategories = async () => {

  try{

    const response = await axios.get(ENV.API + 'get-product-categories');
    const result = response.data;

    return result;

  } catch(error){

    return -1

  }

}

export default getAllProductCategories;