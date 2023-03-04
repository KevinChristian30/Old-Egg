import { ENV } from "@/ENV";
import axios from "axios";

const sendEmail = async (to:string, subject:string, body:string) => {

  try {

    const requestBody = {
      "recipient": to,
      "mail_subject": subject, 
      "mail_body": body
    }

    const response = await axios.post(ENV.API + "send-email", requestBody);
    return response.data

  } catch(error) {

    return -1;

  }

}

export default sendEmail;