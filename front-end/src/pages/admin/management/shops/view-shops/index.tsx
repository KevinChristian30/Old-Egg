import HomeLayout from "@/layouts/HomeLayout";
import style from "../../../../../styles/pages/admin/management/shops/ViewShopPage.module.scss";
import useAuth from "@/hooks/useAuth";
import useMiddleware from "@/hooks/useMiddleware";
import { useRouter } from "next/router";
import getAllShops from "@/pages/api-calls/shops/GetAllShops";

const ViewShopPage = (props:any) => {

  const user = useAuth();
  const router = useRouter();
  if (useMiddleware(user, router, "Admin")) return;

  const { shops } = props;
  
  const getContent = () => {

    return (
      <div className={style.index}>

      </div>
    );

  }

  return (
    <HomeLayout user={user} content={ getContent() } /> 
   );

}
 
export default ViewShopPage;

export async function getStaticProps(){

  const shops = await getAllShops();

  return {
    props: {
      shops: shops
    }
  }

}