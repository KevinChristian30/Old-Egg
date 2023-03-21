import { useState } from "react";
import style from "../../styles/components/Card/WishlistItemCard.module.scss";
import RectangularInputField from "../RectangularInputField/RectangularInputField";
import RectangularButton from "../RectangularButton";
import removeFromWishlist from "@/pages/api-calls/wishlist/removeFromWishlist";
import saveWishlistProductQuantity from "@/pages/api-calls/wishlist/saveWishlistProductQuantity";

interface WishlistItemCardProps{
  wishlist: any
}

const WishlistItemCard = (props: WishlistItemCardProps) => {
  
  const { wishlist } = props;

  const [quantity, setQuantity] = useState<any>(wishlist.detail.quantity);

  const removeItem = async () => {

    const response = await removeFromWishlist(wishlist.detail.id, wishlist.detail.product_id)
    if (response === -1) alert('Something Went Wrong');
    else {

      alert('Item Removed');
      window.location.reload();   

    }

  } 

  const saveItem = async () => {

    const response = await saveWishlistProductQuantity(wishlist.detail.id, wishlist.detail.product_id, quantity);
    if (response === -1) alert('Something Went Wrong');
    else {

      alert('Quantity Updated');
      window.location.reload();

    } 

  } 
  
  return ( 
    <div className={style.wishlist_item_card} key={wishlist.product.product_id}>
      <div className={style.left}>
        <h4>Product: {wishlist.product.product_name}</h4>
        <div className={style.line}>
          <h4>Quantity:</h4>
          <RectangularInputField
            value={quantity}
            onChange={setQuantity}
            number
            width={30}
            height={20} 
          />
        </div>
        <br /><br />
        <div className={style.button_container}>
          <RectangularButton 
            content={<div>Save</div>}
            height={24}
            width={100}
            onClick={ saveItem }
          />
          <RectangularButton 
            content={<div>Remove</div>}
            height={24}
            width={100}
            onClick={ removeItem }
          />
        </div>
      </div>
    </div>
   );
}
 
export default WishlistItemCard;