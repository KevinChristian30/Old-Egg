import { ENV } from "@/ENV";
import axios from "axios";

const getAllPromotionPictures = async () => {

  try{

    const response = await axios.get(ENV.API + 'get-promotion-pictures');
    const result =  response.data;

    return result;

  } catch(error){

    return -1

  }
  
}

export default getAllPromotionPictures;