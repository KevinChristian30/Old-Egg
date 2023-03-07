import { ENV } from "@/ENV";
import Voucher from "@/types/Voucher";
import axios from "axios";

const applyVoucher = async (email: string, voucherCode: string) => {

  try{

    const body = {
      email: email,
      voucher_code: voucherCode
    }

    const response = await axios.post(ENV.API + 'apply-voucher', body);
    const result = response.data;

    if (result == "Voucher Code doesn't Exist") return -2;
    else if (result == "Voucher Code Is Fully Redeemed, You are Unlucky") return -3;

    return result;

  } catch(error){

    return -1;

  }
  
}

export default applyVoucher;