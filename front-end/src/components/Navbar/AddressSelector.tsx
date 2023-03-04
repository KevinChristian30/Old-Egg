import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../styles/components/Navbar/AddressSelector.module.scss"
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import WORDS from "./Words";

const AddressSelector = () => {
  return ( 
    <div className={style.address_selector}>
      <div className={style.left}>
        <FontAwesomeIcon icon={faLocationDot} className={style.icon} />
      </div>
      <div className={style.right}>
        <div className={style.top}>
          <p>Hello</p>
        </div>
        <div className={style.bottom}>
          <p>{WORDS.selectAddress}</p>
        </div>
      </div>
    </div>
   );
}
 
export default AddressSelector;