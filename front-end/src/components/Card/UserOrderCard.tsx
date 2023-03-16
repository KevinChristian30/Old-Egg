import markOrderAsFinished from "@/pages/api-calls/order/markOrderAsFinished";
import style from "../../styles/components/Card/ShopOrderCard.module.scss";
import RectangularButton from "../RectangularButton";
import addItemToCart from "@/pages/api-calls/cart/addItemToCart";

interface UserOrderCardProps {
  order: any
}

const UserOrderCard = (props: UserOrderCardProps) => {

  const { order } = props;

  const onAddToCartButtonClicked = async () => {

    const response = await addItemToCart(order.header.user_id, order.detail.product_id, order.detail.quantity);
    if (response === -1) alert('Server Error');
    else {

      alert('Item Added to Cart');

    }



  }

  return ( 
    <div className={style.shop_order_card}>
      <h2>Order ID: { order.header.ID }</h2>
      <br />
      <h4>Product ID: { order.detail.product_id }</h4>
      <h4>Product Name: { order.product.product_name }</h4>
      <h4>Quantity: { order.detail.quantity }</h4>
      <h4>Status: { order.detail.status  }</h4>
      <br />
      <h4>Order Date: { order.header.CreatedAt }</h4>
      <br /><br />
      <RectangularButton
        content={<div>Add to Cart</div>}
        height={30}
        width={150} 
        onClick={ onAddToCartButtonClicked }
      />
    </div>
   );
}
 
export default UserOrderCard;