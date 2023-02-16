import HomeLayout from "@/layouts/HomeLayout";
import style from "../../../../styles/pages/admin/management/ManageShopsPage.module.scss";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import useMiddleware from "@/hooks/useMiddleware";
import SquareCard from "@/components/Card/SquareCard";
import { faListOl, faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const ManageShopsPage = () => {
  
  const user = useAuth();
  const router = useRouter();
  if (useMiddleware(user, router, "Admin")) return;

  const getContent = () => {

    return (
      <div className={style.index}>
        <Link href='/admin/management/shops/add-shop'>
          <SquareCard text="Add Shop" icon={faPlus} />
        </Link>
        <Link href='/admin/management/shops/view-shops'>
          <SquareCard text="View Shops" icon={faListOl} />
        </Link>
      </div>
    );

  }

  return (
    <HomeLayout user={user} content={ getContent() } /> 
   );
}
 
export default ManageShopsPage;