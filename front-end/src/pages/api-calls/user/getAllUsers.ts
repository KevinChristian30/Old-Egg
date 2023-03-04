import { ENV } from "@/ENV";
import axios from "axios";

const getAllUsers = async (pageNumber: Number) => {

  try{

    const requestBody = {
      "page_number" : pageNumber
    }

    const response = await axios.post(ENV.API + 'get-users', requestBody);
    const result = response.data;

    return result;

  } catch(error){

    return -1

  }

}

export default getAllUsers;