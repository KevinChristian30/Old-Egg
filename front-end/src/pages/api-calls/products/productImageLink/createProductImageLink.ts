import { ENV } from "@/ENV";
import Product from "@/types/Product";
import ProductImageLink from "@/types/ProductImageLink";
import axios from "axios";

const CreateProductImageLink = async (productImageLink: ProductImageLink) => {

  try{

    const response = await axios.post(ENV.API + 'create-product-image-link', productImageLink);
    const result = response.data;

    return result;

  } catch(error){

    return -1;

  }

}
 
export default CreateProductImageLink;