import markOrderAsFinished from "@/pages/api-calls/order/markOrderAsFinished";
import style from "../../styles/components/Card/ShopOrderCard.module.scss";
import RectangularButton from "../RectangularButton";

interface ShopOrderCardProps {
  order: any
}

const ShopOrderCard = (props: ShopOrderCardProps) => {

  const { order } = props;

  const markAsFinished = async () => {

    const response = await markOrderAsFinished(order.detail.ID);
    if (response === -1) alert("Server Error");
    else {

      alert('Transcation Marked as Finished');
      window.location.reload();

    }

  }

  return ( 
    <div className={style.shop_order_card}>
      <h2>Order ID: { order.header.ID }</h2>
      <br />
      <h4>Product ID: { order.detail.product_id }</h4>
      <h4>Quantity: { order.detail.quantity }</h4>
      <h4>Address: { order.address.address }</h4>
      <h4>Status: { order.detail.status  }</h4>
      <br /><br /><br />
      <RectangularButton 
        content={<div>Mark as Finished</div>}
        height={30}
        width={175}
        onClick={ markAsFinished }
      />
    </div>
   );
}
 
export default ShopOrderCard;