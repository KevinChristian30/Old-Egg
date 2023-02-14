import authenticate from "@/pages/api-calls/auth/authenticate";
import { useEffect, useState } from "react";

const useAuth = () => {

  const [user, setUser] = useState();

  useEffect(() => {

    function getCookie(cname: string) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

    const getUser = async () => {

      const cookie = getCookie("Auth")

      const result = await authenticate({
        "token_string": cookie
      });

      if (result == -2 || result == -3 || result == -4) setUser(undefined);
      else return setUser(result);

    }

    getUser()

  }, []);

  return user;

}

export default useAuth;