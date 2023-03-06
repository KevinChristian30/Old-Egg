import { ENV } from "@/ENV";
import getCookie from "@/utility/getCookie";
import axios from "axios";

const updateProduct = async (productID: string, productName: string, productDescription: string, productDetails: string, productPrice: string, productStock: string) => {

  try{

    const token = getCookie("Auth")

    const body = {
      token: token,
      product: {
        product_id: productID,
        product_name: productName,
        product_description: productDescription,
        product_details: productDetails,
        product_price: Number(productPrice),
        product_stock: Number(productStock)
      }
    }

    const response = await axios.post(ENV.API + 'update-product' , body);
    const result =  response.data;

    if (result === "Token Parsing Failed") return -1;
    else if (result === "Cookie Expired") return -1;
    else if (result === "You Are Not Authorized to Update This Product") return -1

    return result;

  } catch (error){

    return -1;

  }
  
}
 
export default updateProduct