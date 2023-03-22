import { ReactNode, useState } from "react";
import style from "../../styles/components/Card/ProductInCartCard.module.scss";
import RectangularInputField from "../RectangularInputField/RectangularInputField";
import RectangularButton from "../RectangularButton";
import updateItemsInCart from "@/pages/api-calls/cart/updateItemsInCart";
import getUserWishlists from "@/pages/api-calls/wishlist/getUserWishlists";
import createWishlist from "@/pages/api-calls/wishlist/createWishlist";
import addToWishlist from "@/pages/api-calls/wishlist/addToWishlist";
import saveItemForLater from "@/pages/api-calls/savedForLaterItems/saveItemForLater";
import removeFromWishlist from "@/pages/api-calls/wishlist/removeFromWishlist";
import removeFromCart from "@/pages/api-calls/cart/removeFromCart";

type ProductInCart = {
  "user_id": Number,
  "product_id": string,
  "quantity": Number,
  "shop_id": Number,
  "product_category_id": Number,
  "product_name": string,
  "product_description": string,
  "product_price": ReactNode,
  "product_stock": Number,
  "product_details": string,
  "product_image_links": string[] 
}

interface ProductInCartProps {
  product: ProductInCart
}

const ProductInCartCard = (props: ProductInCartProps) => {

  const { product } = props;
  const [quantity, setQuantity] = useState(product.quantity);

  const [wishlists, setWishlists] = useState([]);

  const [isDisplayingWishlists, setIsDisplayingWishlists] = useState(false);
  const [isCreatingWishList, setIsCreatingWishList] = useState(false);
  const [wishlistName, setWishlistName] = useState("");

  const updateQuantity = async () => {

    const response = await updateItemsInCart(product.user_id, product.product_id, quantity);
    if (response == 'Item Saved Successfully') {
      
      alert('Quantity Updated')
      window.location.reload();
      
    }; 

  }

  const onSaveToWishListButtonClicked = async () => {

    // Get User's Wist Lists
    const response = await getUserWishlists(product.user_id);
    if (response === -1) alert('Failed Fetching Wish Lists');
    setWishlists(response);

    // Display User's Wish Lists and 
    // Prompt User to Choose Wish Lists or to Create a new Wish List
    setIsDisplayingWishlists(true);

  }

  const onCreateWishListButtonClicked = () => {

    const response: any = createWishlist(product.user_id, wishlistName, true);
    if (response === -1) alert('Server Error While Creating Wishlist');
    else {

      alert('Wishlist Created');
      window.location.reload();

    }

  }

  const saveToWishlists = async () => {

    let error = false;

    wishlists.map(async (wishlist: any) => {

      const checkBox:any = document.getElementById(wishlist.ID);
      if (checkBox?.checked) {

        const response = await addToWishlist(wishlist.ID, product.product_id, product.quantity);

        if (response === -1) error = true;

      }

    });

    if (error) alert("Wishlist Addition Failed");
    else {

      alert("Items Added to Wishlist");

    }

  }

  const onSaveForLaterButtonClicked = async () => {

    // Delete from Wishlist
    const deleteResponse = await removeFromCart(product.user_id, product.product_id);

    // Save to SavedForLaterItems
    const response = await saveItemForLater(product.user_id, product.product_id, product.quantity);
    if (response === -1) alert('Server Error');
    else {

      window.location.reload();
      alert('Item Saved for Later');

    }

  }

  const onRemoveItemFromCardButtonClicked = async () => {

    const response:any = removeFromCart(product.user_id, product.product_id);
    if (response === -1) alert('Item Removal Failed');
    else {

      alert('Product Removed From Cart');
      window.location.reload();

    }

  }

  return ( 
    <div className={style.container}>
      <div className={style.product_in_cart_card}>
        <div className={style.left}>
          <img className={style.image} src={product.product_image_links[0]} alt="" />
        </div>
        <div className={style.right}>
          <div className={style.top}>
            <p>{product.product_name}</p>
            <div>
              <RectangularInputField 
                value={quantity}
                onChange={setQuantity}
                number
                width={70}
                height={24}
              />
              <RectangularButton 
                content={<div>Save</div>}
                orange
                width={90}
                height={24}
                onClick={ updateQuantity }
              />
            </div>
            <b><p>$ {product.product_price}</p></b>
          </div>
          <div className={style.bottom}>
            <RectangularButton
                content={<div>Save to Wishlist</div>}
                width={150}
                height={24}
                onClick={ onSaveToWishListButtonClicked }
              />
            <RectangularButton
              content={<div>Save For Later</div>}
              width={150}
              height={24}
              onClick={ onSaveForLaterButtonClicked }
            />
            <RectangularButton
              content={<div>Remove</div>}
              width={150}
              height={24}
              onClick={ onRemoveItemFromCardButtonClicked }
            />
          </div>
        </div>
      </div> 
      {
        isDisplayingWishlists && 
        <div className={style.wishlists}>
          <h2>My Wishlists</h2>
          <br />
          {
            wishlists.map((e: any) => {
              return (
                <div className={style.wishlist} key={e.ID}>
                  <input type="checkbox" id={e.ID} />
                  <h4>{ e.wishlist_name }</h4>
                </div>
              )
            })
          }
          <br />
          <div className={style.button_container}>
            <div className={style.left}>
              <RectangularButton
                content={<div>Save to Wishlists</div>}
                height={24}
                width={200}
                onClick={ saveToWishlists }
                orange
              />
              <RectangularButton
                content={ isCreatingWishList ? <div>Close</div> : <div>Create Wishlist</div>}
                height={24}
                width={200}
                onClick={ () => setIsCreatingWishList(!isCreatingWishList) }
              />
            </div>
            <div className={style.right}>
              <RectangularButton
                content={<div>Close Wishlists</div>}
                height={24}
                width={175}
                onClick={ () => { setIsDisplayingWishlists(false) } }
              />
            </div>
          </div>
          {
            isCreatingWishList && 
            <div className={style.create_wishlist}>
              <RectangularInputField 
                value={wishlistName}
                onChange={setWishlistName}
                width={180}
                height={24}
                placeholder="Wishlist Name"
              />
              <RectangularButton
                content={<div>Create Wishlist</div>}
                width={200}
                height={24}
                orange
                onClick={ onCreateWishListButtonClicked }
              />
            </div>
          }
        </div>  
      }
    </div>
  );
}
 
export default ProductInCartCard;