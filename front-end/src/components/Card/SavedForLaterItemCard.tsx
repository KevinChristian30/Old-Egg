import style from "../../styles/components/Card/SavedForLaterItemCard.module.scss";

interface SavedForLaterItemCardProps{
  item: any
}

const SavedForLaterItemCard = (props: SavedForLaterItemCardProps) => {

  const { item } = props;

  return ( 
    <div className={style.saved_for_later_item_card}>
      <div className={style.left}>
        <img src={item.product_image_links[0]} className={style.image} />
      </div>
      <div className={style.right}>
        <h4>Product Name: {item.product.product_name}</h4>
        <h4>PRoduct Price: {item.product.product_price}</h4>
        <h4>Quantity: {item.saved_for_later_item.quantity}</h4>
      </div>
    </div>
   );
}
 
export default SavedForLaterItemCard;