import Link from "next/link";
import style from "../../../styles/pages/admin/Management.module.scss"
import SquareCard from "@/components/SquareCard";
import { faBagShopping, faComments, faNewspaper, faRectangleAd, faTags, faUser } from "@fortawesome/free-solid-svg-icons";
import Navbar from "@/components/Navbar/Navbar";
import HomeFooter from "@/components/Footer/HomeFooter/HomeFooter";
import HomeLayout from "@/layouts/HomeLayout";
import useAuth from "@/hooks/useAuth";

const Management = () => {

  const user = useAuth();

  const getContent = () => {

    return (
      <div className={style.management}>
        <div className={style.container}>
          <Link href="/admin/management/voucher"><SquareCard text={"Voucher"} icon={faTags} /></Link>
          <Link href="/admin/management/users"><SquareCard text={"Users"} icon={faUser} /></Link>
          <Link href="/admin/management/newsletter"><SquareCard text={"Newsletter"} icon={faNewspaper} /></Link>
          <Link href="/admin/management/shop"><SquareCard text={"Shop"} icon={faBagShopping} /></Link>
          <Link href="/admin/management/review"><SquareCard text={"Review"} icon={faComments} /></Link>
          <Link href="/admin/management/promotions"><SquareCard text={"Promotion"} icon={faRectangleAd} /></Link>
        </div>
      </div>
    );

  }

  return ( 
    <>
      <br /><br /><br /><br /><br />
      <HomeLayout user={user} content={getContent()}/>
    </>
   );
}
 
export default Management;