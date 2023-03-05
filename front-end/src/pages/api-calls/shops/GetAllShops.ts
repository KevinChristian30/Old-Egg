import { ENV } from "@/ENV";
import axios from "axios";

const getAllShops = async (pageNumber: Number, isActive: boolean, isBanned: boolean) => {

  try{

    const body = {
      "page_number": pageNumber,
      "is_active": isActive,
      "is_banned": isBanned
    }

    const response = await axios.post(ENV.API + 'get-shops', body);
    const result = response.data;

    return result;

  } catch(error){

    return -1

  }

}

export default getAllShops;