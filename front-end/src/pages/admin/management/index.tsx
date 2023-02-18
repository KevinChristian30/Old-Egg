import Link from "next/link";
import style from "../../../styles/pages/admin/Management.module.scss"
import SquareCard from "@/components/Card/SquareCard";
import { faBagShopping, faComments, faNewspaper, faRectangleAd, faTags, faUser } from "@fortawesome/free-solid-svg-icons";
import HomeLayout from "@/layouts/HomeLayout";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import useMiddleware from "@/hooks/useMiddleware";

const Management = () => {

  const user:any = useAuth();
  const router = useRouter();
  if (!user.role_id) return <div className="">Loading</div>
  if (useMiddleware(user, router, "Admin")) return;
  
  const getContent = () => {

    return (
      <div className={style.management}>
        <div className={style.container}>
          <Link href="/admin/management/voucher"><SquareCard text={"Voucher"} icon={faTags} /></Link>
          <Link href="/admin/management/users"><SquareCard text={"Users"} icon={faUser} /></Link>
          <Link href="/admin/management/newsletter"><SquareCard text={"Newsletter"} icon={faNewspaper} /></Link>
          <Link href="/admin/management/shops"><SquareCard text={"Shop"} icon={faBagShopping} /></Link>
          <Link href="/admin/management/review"><SquareCard text={"Review"} icon={faComments} /></Link>
          <Link href="/admin/management/promotions"><SquareCard text={"Promotion"} icon={faRectangleAd} /></Link>
        </div>
      </div>
    );

  }

  return ( 
    <>
      <HomeLayout user={user} content={getContent()}/>
    </>
   );
   
}
 
export default Management;
