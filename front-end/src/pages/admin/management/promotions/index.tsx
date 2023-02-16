import HomeLayout from "@/layouts/HomeLayout";
import style from "../../../../styles/pages/admin/management/PromotionsPage.module.scss";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import useMiddleware from "@/hooks/useMiddleware";

const PromotionsPage = () => {

  const user = useAuth();
  const router = useRouter();
  if (useMiddleware(user, router, "Admin")) return;

  const getContent = () => {

    return (
      <div className={style.index}>
        Edit Promotions
      </div> 
    );

  }

  return ( 
    <HomeLayout user={user} content={ getContent() } />
   );
}
 
export default PromotionsPage;