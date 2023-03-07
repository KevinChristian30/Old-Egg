import { ENV } from "@/ENV";
import axios from "axios";

const saveItemForLater = async (userID: Number, productID: string, quantity: Number) => {

  try{

    const body = {
      "user_id": Number(userID),
      "product_id": productID,
      "quantity": Number(quantity)
    }

    const response = await axios.post(ENV.API + 'save-item-for-later', body);
    const result =  response.data;

    return result;

  } catch(error){

    return -1

  }
  
}

export default saveItemForLater;