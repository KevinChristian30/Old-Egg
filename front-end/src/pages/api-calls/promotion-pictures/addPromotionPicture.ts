import { ENV } from "@/ENV";
import PromotionPicture from "@/types/PromotionPicture";
import axios from "axios";

const addPromotionPicture = async (promotionPicture: PromotionPicture) => {

  try{

    const response = await axios.post(ENV.API + 'create-promotion-picture', promotionPicture);
    const result =  response.data;

  } catch(error){

    return -1

  }
  
}

export default addPromotionPicture;