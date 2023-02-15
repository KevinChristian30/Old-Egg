import authenticate from "@/pages/api-calls/auth/authenticate";
import getCookie from "@/utility/getCookie";
import { useEffect, useState } from "react";

const useAuth = () => {

  const [user, setUser] = useState();

  useEffect(() => {

    const getUser = async () => {

      const cookie = getCookie("Auth")
  
      const result = await authenticate({
        "token_string": cookie
      });
  
      setUser(result);
  
    }
  
    getUser();

  }, [])

  return user

}

export default useAuth;