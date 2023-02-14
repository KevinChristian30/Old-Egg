import Navbar from '@/components/Navbar/Navbar'
import styles from '../styles/pages/Home.module.scss'
import HomeFooter from '@/components/Footer/HomeFooter/HomeFooter'
import { useEffect } from 'react'
import authenticate from './api-calls/auth/authenticate';

export default function Home() {

  useEffect(() => {

    function getCookie(cname: string) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
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

      if (result == -2) alert("You Are Not Signed In")
      else if (result == -3) alert("Your Cookie Expired, Please Log In Again")
      else if (result == -4 || result == -5 || result == -6) alert("Server Error")
      else console.log(result)

    }

    getUser();

  }, []);

  return (
    <div className={styles.home}>
      <Navbar />
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <HomeFooter />
    </div>
  )
}
