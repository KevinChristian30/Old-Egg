import MyNotification from "@/types/Notification";
import style from "../../styles/components/Card/NotificationCard.module.scss"

interface NotificationCardProps{
  notification: MyNotification
}

const NotificationCard = (props: NotificationCardProps) => {

  const { notification } = props;

  return ( 
    <div className={style.notification_card}>
      <p className={style.header}>{notification.notification_header}</p>
      <p className={style.details}>{notification.notification_details}</p>
      <div className={style.line}/>
    </div>
   );
}
 
export default NotificationCard;