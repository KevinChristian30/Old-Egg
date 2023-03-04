import getNotifications from "@/pages/api-calls/user/getNotifications";
import { useEffect, useState } from "react";

const useNotifications = (userID: Number) => {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {

    const get = async () => {

      const result = await getNotifications(userID);
      setNotifications(result);
  
    }
  
    get();

  }, [])

  return notifications;

}
 
export default useNotifications;