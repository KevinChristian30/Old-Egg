import User from "@/types/User";
import style from "../../styles/components/Card/UserCard.module.scss";
import RectangularButton from "../RectangularButton";

interface UserCardProps{
  user: User
}

const UserCard = (props: UserCardProps) => {

  const { user } = props;

  return (
    <div className={style.user_card}>

      <b><p>{user.first_name}</p></b>
      <b><p>{user.last_name}</p></b>
      <br />
      <p>{user.email}</p>
      <p>{user.mobile_phone_number ? user.mobile_phone_number : "No Phone Number"}</p>
      <p>Subscribed: {user.subscribed_to_email_offers_and_discounts ? "True" : "False"}</p>
      
      
    </div>
  );

}

export default UserCard;
