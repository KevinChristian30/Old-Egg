import { ENV } from "@/ENV";
import axios from "axios";

const getAllUsers = async (leftIndex?:number, rightIndex?:number, count?:number) => {

  try{

    const response = await axios.get(ENV.API + 'get-users');
    const result = response.data;

    return result;

  } catch(error){

    return -1

  }

}

export default getAllUsers;