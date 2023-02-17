import { ENV } from "@/ENV";
import PromotionPicture from "@/types/PromotionPicture";
import axios from "axios";

const deletePromotionPicture = async (promotionPicture: PromotionPicture) => {

  try{

    const response = await axios.post(ENV.API + 'delete-promotion-picture', promotionPicture);
    const result =  response.data;

    return result;

  } catch(error){

    return -1

  }
  
}

export default deletePromotionPicture;