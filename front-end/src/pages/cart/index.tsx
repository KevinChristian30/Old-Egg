import useAuth from "@/hooks/useAuth";
import HomeLayout from "@/layouts/HomeLayout";
import style from "../../styles/pages/cart/CartPage.module.scss";
import { ReactNode, useEffect, useState } from "react";
import getItemsFromCart from "../api-calls/cart/getItemsFromCart";
import ProductInCartCard from "@/components/Card/ProductInCartCard";
import getSavedForLaterItems from "../api-calls/savedForLaterItems/getSavedForLaterItems";
import SavedForLaterItemCard from "@/components/Card/SavedForLaterItemCard";
import RectangularButton from "@/components/RectangularButton";
import { useRouter } from "next/router";

interface ProductInCart{
  "user_id": Number,
  "product_id": string,
  "quantity": Number,
  "shop_id": Number,
  "product_category_id": Number,
  "product_name": string,
  "product_description": string,
  "product_price": ReactNode,
  "product_stock": Number,
  "product_details": string
  "product_image_links": string[]
}

const CartPage = () => {

  const user:any = useAuth();
  const router = useRouter();

  const [products, setProducts] = useState<any>();
  const [totalCost, setTotalCost] = useState<number>(0);
  const [savedForLaterItems, setSavedForLaterItems] = useState([]);

  useEffect(() => {

    const getProducts = async () => {

      const response = await getItemsFromCart(user.ID);
      if (response === -1) alert('Server Error');
      else {

        setProducts(response);
       
        if (response) {
        
          let total = 0;
          response.map((e: any) => {
            
            total += e.product_price * e.quantity;

          });
          setTotalCost(total)
        
        }

      }

    }

    getProducts();

    const getItems = async () => {

      const response = await getSavedForLaterItems(user.ID);
      if (response === -1) alert('Server Error');
      else {

        setSavedForLaterItems(response);

      }

    }

    getItems();

  }, [user, products, savedForLaterItems]);

  const onCheckoutButtonClicked = () => {

    router.push('/checkout');

  }

  const getContent = () => {

    return (
      <div className={style.index}>
        <h1>Shopping Cart</h1>
        <br /><br />
        <div className={style.container}>
          <div className={style.left}>
            <div className={style.products}>
              {
                products ? 
                products.map((product: ProductInCart) => {
                  return <ProductInCartCard key={product.product_id} product={product} />
                }) : <h2 className="">Your Cart is Empty</h2>
              }
            </div>
          </div>
          <div className={style.right}>
              <h1>Order Summary</h1>
              <br />
              <h3>Items Cost: $ {totalCost}</h3>
              <h3>Estimated Shipping: $ {(totalCost * 0.1).toFixed(1)}</h3>
              <br /><br />
              <h3>Total Cost: $ {(totalCost * 1.1).toFixed(1)}</h3>
              <br /><br /><br /><br /><br /><br />
              <RectangularButton 
                content={<div>CHECKOUT</div>}
                width={275}
                height={30}
                onClick={ onCheckoutButtonClicked }
              />
          </div>
        </div>
        <br /><br /><br />
        <h1>Saved for Later</h1>
        <br /><br />
        <div className={style.saved_for_later_items}>
            {
              savedForLaterItems ? 
              savedForLaterItems.map((item: any) => {
                return( 
                  <SavedForLaterItemCard 
                    key={item.product.product_id} 
                    item={item}
                  />
                )
              }) : <h2>You Don't Have Any Saved Item</h2>
            }
        </div>
      </div>
    );

  }

  return ( <HomeLayout content={ getContent() } user={user} /> );
}
 
export default CartPage;