import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../styles/components/Navbar/ShoppingCartButton.module.scss"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const ShoppingCartButton = () => {
  return ( 
    <div className={style.shopping_cart_button}>
      <FontAwesomeIcon icon={faCartShopping} className={style.icon} />
    </div>
   );
}
 
export default ShoppingCartButton;