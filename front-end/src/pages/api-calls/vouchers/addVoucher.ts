import { ENV } from "@/ENV";
import Voucher from "@/types/Voucher";
import axios from "axios";

const addVoucher = async (voucher: Voucher) => {

  try{

    const response = await axios.post(ENV.API + 'create-voucher', voucher);
    const result = response.data;

    if (result === "Voucher Code Isn't Unique") return -2;
    return result;

  } catch(error){

    return -1;

  }
  
}

export default addVoucher;