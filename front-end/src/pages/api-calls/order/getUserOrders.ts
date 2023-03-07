import { ENV } from "@/ENV";
import axios from "axios";

const getUserOrders = async (userID: Number, isOngoing: boolean, isCancelled: boolean, keyword: string, orderNumber: string) => {

  try{
    
    const body = {
      user_id: Number(userID),
      is_ongoing: isOngoing,
      is_cancelled: isCancelled,
      keyword: keyword,
      order_number: orderNumber
    }

    const response:any = await axios.post(ENV.API + 'get-user-orders', body);
    const result =  response.data;

    return result;

  } catch (error){

    return -1;

  }
  
}
 
export default getUserOrders;