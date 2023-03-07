import { ENV } from "@/ENV";
import axios from "axios";

const createOrder = async (address: object, deliveryProviderID: Number, paymentMethodID: Number, userID: Number, items: any) => {

  try{
    
    const body = {
      address: address,
      delivery_provider_id: Number(deliveryProviderID),
      payment_method_id: Number(paymentMethodID),
      user_id: Number(userID),
      items_in_cart: items
    }

    const response:any = await axios.post(ENV.API + 'create-order', body);
    const result =  response.data;

    if (result == 'Address Must be Chosen') return -2;
    else if (result == "You don't have Enough Money") return -3;

    return result;

  } catch (error){

    return -1;

  }
  
}
 
export default createOrder;