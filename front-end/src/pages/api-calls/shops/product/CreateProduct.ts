import { ENV } from "@/ENV";
import Product from "@/types/Product";
import axios from "axios";

const CreateProduct = async (product: Product) => {

  try{

    const response = await axios.post(ENV.API + 'create-product', product);
    const result = response.data;

    return result;

  } catch(error){

    return -1;

  }

}
 
export default CreateProduct;