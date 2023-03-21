import { ENV } from "@/ENV";
import axios from "axios";

const saveNote = async (wistlistID: Number, note: string) => {

  try{

    const body = {
      wishlist_id: Number(wistlistID),
      note: note
    }

    const response = await axios.post(ENV.API + 'save-wishlist-note', body);
    const result = response.data;

    return result;

  } catch(error){

    return -1;

  }
  
}

export default saveNote;