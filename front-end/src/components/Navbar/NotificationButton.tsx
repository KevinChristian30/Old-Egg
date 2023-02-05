import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../styles/components/Navbar/NotificationButton.module.scss"
import { faBell } from "@fortawesome/free-solid-svg-icons";

const NotificationButton = () => {
  return ( 
    <div className={style.notification_button}>
      <FontAwesomeIcon icon={faBell} 
        className={style.icon} />
    </div>
   );
}
 
export default NotificationButton;