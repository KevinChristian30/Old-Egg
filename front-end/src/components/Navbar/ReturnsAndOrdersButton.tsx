import style from "../../styles/components/Navbar/ReturnsAndOrderButton.module.scss";

const ReturnsAndOrdersButton = () => {
  return ( 
    <div className={style.returns_and_orders_button}>
      <div className={style.top}>
        <p>Returns</p>
      </div>
      <div className={style.bottom}>
        <p>& Orders</p>
      </div>
    </div>
   );
}
 
export default ReturnsAndOrdersButton;