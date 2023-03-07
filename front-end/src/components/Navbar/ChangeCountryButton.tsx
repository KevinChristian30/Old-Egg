import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../styles/components/Navbar/ChangeCountryButton.module.scss"
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import getCookie from "@/utility/getCookie";
import setCookie from "@/utility/setCookie";

const ChangeCountryButton = () => {

  const onClick = () => {

    const language = getCookie("language");
    if (language === "english") setCookie("language", "indonesian", 10);
    else setCookie("language", "english", 10);

    window.location.reload();

  }

  return ( 
    <div className={style.change_country_button} onClick={ onClick }>
      <FontAwesomeIcon icon={faFlag} 
        className={style.icon} />
    </div>
   );
}
 
export default ChangeCountryButton;