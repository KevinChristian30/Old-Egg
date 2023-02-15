import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../styles/components/Home/AdminHome.module.scss";
import { faListCheck, faScroll } from "@fortawesome/free-solid-svg-icons";
import SquareCard from "../SquareCard";
import Link from "next/link";
import HomeLayout from "@/layouts/HomeLayout";
import useAuth from "@/hooks/useAuth";

const AdminHome = () => {

  const user = useAuth();

  const getContent = () => {
    return (
      <div className={style.admin_home}>
        <Link href="/admin/reports"><SquareCard text={"Reports"} icon={faScroll} /></Link>
        <Link href="/admin/management"><SquareCard text={"Management"} icon={faListCheck} /></Link>
      </div>
    );
  }

  return ( 
    getContent()
   );
}
 
export default AdminHome;