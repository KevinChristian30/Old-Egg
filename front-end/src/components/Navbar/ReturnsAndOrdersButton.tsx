import style from "../../styles/components/Navbar/ReturnsAndOrderButton.module.scss";
import WORDS from "./Words";

const ReturnsAndOrdersButton = () => {
  return ( 
    <div className={style.returns_and_orders_button}>
      <div className={style.top}>
        <p>{WORDS.returns}</p>
      </div>
      <div className={style.bottom}>
        <p>& {WORDS.orders}</p>
      </div>
    </div>
   );
}
 
export default ReturnsAndOrdersButton;