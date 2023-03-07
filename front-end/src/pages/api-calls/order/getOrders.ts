import { ENV } from "@/ENV";
import axios from "axios";

const getOrders = async (shopID: Number, isCancelled: boolean, isOngoing: boolean) => {

  try{
    
    const body = {
      shop_id: Number(shopID),
      is_ongoing: isOngoing,
      is_cancelled: isCancelled
    }

    const response:any = await axios.post(ENV.API + 'get-orders', body);
    const result =  response.data;

    return result;

  } catch (error){

    return -1;

  }
  
}
 
export default getOrders;