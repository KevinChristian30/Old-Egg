import Shop from "@/types/Shop";
import style from "../../styles/components/Card/ShopCard.module.scss";
import RectangularButton from "../RectangularButton";
import { useState } from "react";
import updateShop from "@/pages/api-calls/shops/UpdateShop";

interface ShopCardProps{
  shop: Shop
}

const ShopCard = (props: ShopCardProps) => {

  const { shop } = props;
  const [isActive, setIsActive] = useState(shop.status === 'Active');
  const [status, setStatus] = useState(shop.status);

  const getButtonContent = () => {

    if (isActive) return <div className="">Ban</div>
    return <div className="">Unban</div>
    
  }

  const onButtonClicked = () => {

    setIsActive(!isActive);
    setStatus(status === "Active" ? "Banned" : "Active");

    const toUpdate:Shop = {
      shop_name: shop.shop_name,
      shop_email: shop.shop_email,
      shop_password: shop.shop_password,
      status: status === "Active" ? "Banned" : "Active"
    }

    const result = updateShop(toUpdate);

    alert("Shop Status Updated")

  }
  
  return ( 
    <div className={style.shop_card}>
      <b><h3>{shop.shop_name}</h3></b>
      <br />
      <p>{shop.shop_email}</p>
      <p>Status: {status}</p>
      <br />
      <br />
      <RectangularButton orange width={100} height={34} content={ getButtonContent() } onClick={ onButtonClicked } />
    </div>
   );

}
 
export default ShopCard;