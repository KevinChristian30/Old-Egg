import { ENV } from "@/ENV";
import axios from "axios";

const getReviewsByShop = async (shopID: Number, reviewDate: string, reviewKeyword: string) => {

  try{

    const body = {
      shop_id: Number(shopID),
      review_date: reviewDate,
      review_keyword: reviewKeyword
    };

    const response = await axios.post(ENV.API + 'get-reviews-by-shop', body);
    const result =  response.data;

    return result;

  } catch(error){

    return -1

  }
  
}

export default getReviewsByShop;