import { ENV } from "@/ENV";
import axios from "axios";

const getReviewsByShop = async (shopID: Number) => {

  try{

    const body = {
      shop_id: Number(shopID)
    };

    const response = await axios.post(ENV.API + 'get-reviews-by-shop', body);
    const result =  response.data;

    return result;

  } catch(error){

    return -1

  }
  
}

export default getReviewsByShop;