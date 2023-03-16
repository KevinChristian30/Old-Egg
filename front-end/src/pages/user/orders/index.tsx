import useAuth from "@/hooks/useAuth";
import HomeLayout from "@/layouts/HomeLayout";
import style from "../../../styles/pages/user/UserOrderPage.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import getUserOrders from "@/pages/api-calls/order/getUserOrders";
import UserOrderCard from "@/components/Card/UserOrderCard";
import RectangularInputField from "@/components/RectangularInputField/RectangularInputField";

const UserOrderPage = () => {

  const [userOrders, setUserOrders] = useState<any>();

  const [isOngoing, setIsOngoing] = useState(true);
  const [isCancelled, setIsCancelled] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [orderDate, setOrderDate] = useState<any>("");

  const user:any = useAuth();
  const router = useRouter();

  useEffect(() => {

    const get = async () => {

      const response = await getUserOrders(user.ID, isOngoing, isCancelled, keyword, orderNumber, orderDate);
      if (response === -1) alert('Server Error');
      else {

        setUserOrders(response);

      }

    }

    get();

  }, [user, isOngoing, isCancelled, keyword, orderNumber, orderDate])

  if (!user.role_id) return <div className="">Loading</div>;

  const getContent = () => {

    return (
      <div className={style.index}>
        <h1>Your Orders</h1>
        <br />
        <div className={style.line}>
          <h3>Is Ongoing </h3>
          <input type="checkbox" checked={isOngoing} onChange={() => setIsOngoing(!isOngoing)} />
        </div>
        <div className={style.line}>
          <h3>Is Cancelled</h3>
          <input type="checkbox" checked={isCancelled} onChange={() => setIsCancelled(!isCancelled)} />
        </div>
        <br />
        <RectangularInputField 
          value={keyword}
          onChange={setKeyword}
          height={34}
          width={400}
          placeholder="Search: Product Name"
        />
        <br />
        <RectangularInputField 
          value={orderNumber}
          onChange={setOrderNumber}
          height={34}
          width={400}
          placeholder="Search: Order Number, Invoice Code"
        />
        <br />
        <input type="date" 
          value={orderDate}
          onChange={(e:any) => { setOrderDate(e.target.value) }}
        />
        <br /><br /><br /><br /><br />
        {
          !userOrders ? <h1>You Don't Have any Orders</h1> : 
          <div className={style.orders}>
             {
              userOrders?.map((order: any) => {
                return <UserOrderCard key={order.header.ID} order={order}  />
              })
            }
          </div> 
        }
      </div>
    );

  }
 
  return ( <HomeLayout content={ getContent() } user={user} /> );
}
 
export default UserOrderPage;