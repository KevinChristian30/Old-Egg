import { ENV } from "@/ENV";
import axios from "axios";

const authenticate = async (token: object) => {

  try{

    const response = await axios.post(ENV.API + 'authenticate', token);
    const result = response.data;
    
    if (result === "Couldn't Get Cookie") return -2;
    if (result === "Cookie Expired") return -3;
    if (result === "Email Not Found") return -4;
    if (result === "Server Error") return -5;
    if (result === "Token Parsing Failed") return -6;

    return result;

  } catch(error){

    return -1

  }
  
}

export default authenticate;