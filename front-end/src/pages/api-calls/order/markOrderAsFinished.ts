import { ENV } from "@/ENV";
import axios from "axios";

const markOrderAsFinished = async (orderDetailID: Number) => {

  try{
    
    const body = {
      order_detail_id: Number(orderDetailID),
    }

    const response:any = await axios.post(ENV.API + 'mark-order-as-finished', body);
    const result =  response.data;

    return result;

  } catch (error){

    return -1;

  }
  
}
 
export default markOrderAsFinished;