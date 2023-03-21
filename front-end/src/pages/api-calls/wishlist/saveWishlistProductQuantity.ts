import { ENV } from "@/ENV";
import axios from "axios";

const saveWishlistProductQuantity = async (wishlistID: Number, productID: string, quantity: Number) => {

  try{

    const body = {
      wishlist_detail_id: Number(wishlistID),
      product_id: productID,
      quantity: Number(quantity)
    }

    const response = await axios.post(ENV.API + 'update-item-quantity', body);
    const result = response.data;

    return result;

  } catch(error){

    return -1;

  }
  
}

export default saveWishlistProductQuantity;