import style from "../../styles/components/Home/AdminHome.module.scss";
import { faListCheck, faMessage, faScroll } from "@fortawesome/free-solid-svg-icons";
import SquareCard from "../Card/SquareCard";
import Link from "next/link";

const CustomerServiceHome = () => {

  const getContent = () => {
    return (
      <>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <div className={style.admin_home}>
          <Link href="/customer-chat"><SquareCard text={"Chats"} icon={faMessage} /></Link>
        </div>
      </>
    );
  }

  return ( 
    getContent()
   );
}
 
export default CustomerServiceHome;