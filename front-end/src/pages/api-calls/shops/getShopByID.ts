import { ENV } from "@/ENV";
import axios from "axios";

const getShopByID = async (shopID: Number) => {

  try{

    const body = {
      "id": Number(shopID)
    }

    const response = await axios.post(ENV.API + 'get-shop-by-id', body);
    const result = response.data;

    return result;

  } catch(error){

    return -1

  }

}

export default getShopByID;