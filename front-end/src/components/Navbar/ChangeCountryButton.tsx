import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../styles/components/Navbar/ChangeCountryButton.module.scss"
import { faFlag } from "@fortawesome/free-solid-svg-icons";

const ChangeCountryButton = () => {
  return ( 
    <div className={style.change_country_button}>
      <FontAwesomeIcon icon={faFlag} 
        className={style.icon} />
    </div>
   );
}
 
export default ChangeCountryButton;