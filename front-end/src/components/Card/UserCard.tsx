import User from "@/types/User";
import style from "../../styles/components/Card/UserCard.module.scss";
import RectangularButton from "../RectangularButton";
import { useState } from "react";
import updateUser from "@/pages/api-calls/user/updateUser";

interface UserCardProps{
  user: User
}

const UserCard = (props: UserCardProps) => {

  const { user } = props;
  const [isActive, setIsActive] = useState(user.status === 'Active');
  const [status, setStatus] = useState(user.status);

  const getButtonContent = () => {

    if (isActive)
    return (
      <div className="">
        Ban
      </div>
    );

    else return (
      <div className="">
        Unban
      </div>
    );
    
  }

  const changeStatus = () => {

    setIsActive(!isActive);
    setStatus(status === "Active" ? "Banned" : "Active");

    const toUpdate:User = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      mobile_phone_number: user.mobile_phone_number,
      password: user.password,
      role_id: user.role_id,
      subscribed_to_email_offers_and_discounts: user.subscribed_to_email_offers_and_discounts,
      status: status === "Active" ? "Banned" : "Active"
    }

    const result = updateUser(toUpdate);
    alert("User Status Updated")

  }

  return (
    <div className={style.user_card}>

      <b><p>{user.first_name}</p></b>
      <b><p>{user.last_name}</p></b>
      <br />
      <p>{user.email}</p>
      <p>{user.mobile_phone_number ? user.mobile_phone_number : "No Phone Number"}</p>
      <p>Subscribed: {user.subscribed_to_email_offers_and_discounts ? "True" : "False"}</p>
      <p>Status: {status}</p>
      <br /><br />  
      <RectangularButton onClick={ changeStatus } orange content={ getButtonContent() } width={100} height={30} />

    </div>
  );

}

export default UserCard;
