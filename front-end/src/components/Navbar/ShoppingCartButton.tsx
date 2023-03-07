import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../styles/components/Navbar/ShoppingCartButton.module.scss"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import getItemsFromCart from "@/pages/api-calls/cart/getItemsFromCart";

interface ShoppingCartButtonProps{
  user: any
}

const ShoppingCartButton = (props: ShoppingCartButtonProps) => {

  const { user } = props

  const [total, setTotal] = useState(0);

  const router = useRouter();
  const onShoppingCartButtonClicked = () => {

    router.push('/cart');

  }

  useEffect(() => {

    const getCartItems = async () => {

      const response = await getItemsFromCart(user.ID);
      
      let total = 0;
      response?.map((e: any) => {

        total += e.product_price * e.quantity;

      })

      setTotal(total);

    }

    getCartItems();

  }, [user])

  return ( 
    <div className={style.shopping_cart_button} onClick={ onShoppingCartButtonClicked }>
      <FontAwesomeIcon icon={faCartShopping} className={style.icon} />
      {
        total > 0 &&
        <h6>{total}</h6>
      }
    </div>
   );
}
 
export default ShoppingCartButton;