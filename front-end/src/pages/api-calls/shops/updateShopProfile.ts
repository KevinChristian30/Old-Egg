import { ENV } from "@/ENV";
import Shop from "@/types/Shop";
import axios from "axios";

const updateShopProfile = async (token: string, shopEmail: string, shopName: string, aboutUs: string, displayPictureLink: string) => {

  try{

    const body = {
      "token": token,
      "shop_email": shopEmail,
      "shop_name": shopName,
      "about_us": aboutUs,
      "display_picture_link": displayPictureLink
    }

    const response = await axios.post(ENV.API + 'update-shop-profile', body);
    const result = response.data;

    return result;

  } catch(error){

    return -1

  }

}

export default updateShopProfile;