import { ENV } from "@/ENV";
import Voucher from "@/types/Voucher";
import axios from "axios";

const getUserWishlists = async (userID: Number) => {

  try{

    const body = {
      user_id : userID
    }

    const response = await axios.post(ENV.API + 'get-wishlists', body);
    const result = response.data;

    return result;

  } catch(error){

    return -1;

  }
  
}

export default getUserWishlists;