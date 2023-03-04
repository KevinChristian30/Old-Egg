import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../styles/components/Navbar/NotificationButton.module.scss"
import { faBell } from "@fortawesome/free-solid-svg-icons";
import NotificationCard from "../Card/NotificationCard";
import MyNotification from "@/types/Notification";
import { useEffect, useState } from "react";
import getNotifications from "@/pages/api-calls/user/getNotifications";

interface NotificationButtonProps{
  user_id: Number
}

const NotificationButton = (props: NotificationButtonProps) => {

  const { user_id } = props;
  const [notifications, setNotifications] = useState([]); 
  const [isDisplaying, setIsDisplaying] = useState(false);

  const get = async () => {

    const result = await getNotifications(user_id);
    setNotifications(result);

  }

  useEffect(() => {
  
    get();

  }, [])

  const onNotificationButtonClick = () => {

    get();
    setIsDisplaying(!isDisplaying);

  }

  return (     
    <div className={style.notification_button} onClick={ onNotificationButtonClick }>
      <FontAwesomeIcon icon={faBell} 
        className={style.icon} />
      {
        isDisplaying && 
        (
          <div className={style.notifications}>
            {
              notifications.map((notification: MyNotification) => {
                return <NotificationCard key={notification.notification_details} notification={notification} />
              })
            }
          </div>
        ) 
      }
    </div>
   );
}
 
export default NotificationButton;