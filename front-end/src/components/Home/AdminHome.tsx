import style from "../../styles/components/Home/AdminHome.module.scss";
import { faListCheck, faScroll } from "@fortawesome/free-solid-svg-icons";
import SquareCard from "../Card/SquareCard";
import Link from "next/link";

const AdminHome = () => {

  const getContent = () => {
    return (
      <>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <div className={style.admin_home}>
          <Link href="/admin/reports"><SquareCard text={"Reports"} icon={faScroll} /></Link>
          <Link href="/admin/management"><SquareCard text={"Management"} icon={faListCheck} /></Link>
        </div>
      </>
    );
  }

  return ( 
    getContent()
   );
}
 
export default AdminHome;