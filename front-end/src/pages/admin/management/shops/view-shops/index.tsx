import HomeLayout from "@/layouts/HomeLayout";
import style from "../../../../../styles/pages/admin/management/shops/ViewShopPage.module.scss";
import useAuth from "@/hooks/useAuth";
import useMiddleware from "@/hooks/useMiddleware";
import { useRouter } from "next/router";
import getAllShops from "@/pages/api-calls/shops/GetAllShops";
import Shop from "@/types/Shop";
import ShopCard from "@/components/Card/ShopCard";
import { useState } from "react";

const ViewShopPage = (props:any) => {

  const [isActiveFilter, setIsActiveFilter] = useState(true);
  const [isBannedFilter, setIsBannedFilter] = useState(true);

  const user = useAuth();
  const router = useRouter();
  if (useMiddleware(user, router, "Admin")) return;

  const { shops } = props;

  const getContent = () => {

    return (
      <div className={style.index}>
        <h1>View Shops</h1>
        <br />
        <div className={style.checkbox_container}>
          <div className={style.line}>
            <p>Active</p>
            <input type="checkbox" className={style.checkbox} 
            checked={isActiveFilter} onChange={() => setIsActiveFilter(!isActiveFilter)} />
          </div>
          <div className={style.line}>
            <p>Banned</p>
            <input type="checkbox" className={style.checkbox} 
            checked={isBannedFilter} onChange={() => setIsBannedFilter(!isBannedFilter)} />
          </div>
        </div>  
        <br />
        <div className={style.container}>
          {
            shops.map((shop:Shop) => {
              if (isBannedFilter && shop.status === 'Banned') return <ShopCard shop={shop} />
              if (isActiveFilter && shop.status === 'Active') return <ShopCard shop={shop} />
            })
          }
        </div>
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