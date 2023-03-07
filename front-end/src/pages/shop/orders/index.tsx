import useAuth from "@/hooks/useAuth";
import useMiddleware from "@/hooks/useMiddleware";
import HomeLayout from "@/layouts/HomeLayout";
import { useRouter } from "next/router";
import style from "../../../styles/pages/shop/ShopOrderPage.module.scss"
import { use, useEffect, useState } from "react";
import getOrders from "@/pages/api-calls/order/getOrders";
import ShopOrderCard from "@/components/Card/ShopOrderCard";

const ShopOrderPage = () => {

  const [orders, setOrders] = useState<any>([]);

  const [isOngoing, setIsOngoing] = useState(true);
  const [isCancelled, setIsCancelled] = useState(true);

  const user:any = useAuth();
  const router = useRouter();
  
  useEffect(() => {

    const get = async () => {

      const response = await getOrders(user.id, isCancelled, isOngoing);
      if (response === -1) alert('Server Error');
      else {

        setOrders(response);

      }

    }

    get();

  }, [user, isCancelled, isOngoing]);
  
  if (!user) return <h1 className="">Not Authorized, Please Re-Log</h1>
  if (useMiddleware(user, router, "Shop")) return;

  const getContent = () => {

    return (
      <div className={style.index}>
        <h1>All Orders</h1>
        <br />
        <div className={style.line}>
          <h3>Ongoing Orders</h3>
          <input type="checkbox" checked={isOngoing} onChange={() => setIsOngoing(!isOngoing)} />
        </div>
        <div className={style.line}>
          <h3>Cancelled Orders</h3>
            <input type="checkbox" checked={isCancelled} onChange={() => setIsCancelled(!isCancelled)} />
        </div>
        <br />
        {
          !orders? <h1>You Have No Orders</h1> : 
          <div className={style.orders}>
            { 
              orders?.map((order: any) => {
                return <ShopOrderCard key={order.detail.ID} order={order} />
              })
            }
          </div>
        }
      </div>
    );

  }

  return ( <HomeLayout content={ getContent() } user={user} /> );
}
 
export default ShopOrderPage;