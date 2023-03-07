import HomeLayout from "@/layouts/HomeLayout";
import style from "../../styles/pages/ProfilePage.module.scss";
import useAuth from "@/hooks/useAuth";
import RectangularInputField from "@/components/RectangularInputField/RectangularInputField";
import { useEffect, useState } from "react";
import RectangularButton from "@/components/RectangularButton";
import User from "@/types/User";
import updateUser from "../api-calls/user/updateUser";
import sendEmail from "@/utility/sendEmail";
import requestTwoFactorAuthenticationCode from "../api-calls/user/requestTwoFactorAuthenticationCode";
import getOneTimeCode from "../api-calls/user/getOneTimeCode";
import changePassword from "../api-calls/user/changePassword";
import { useRouter } from "next/router";
import setCookie from "@/utility/setCookie";

const ProfilePage = () => {

  const user:any = useAuth();
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [token, setToken] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [isTokenSent, setIsTokenSent] = useState(false); 
  
  useEffect(() => {

    setPhoneNumber(user.mobile_phone_number)

  }, [user]);

  if (!user.first_name) return <div>Loading ...</div>

  const onTwoFactorAuthenticationButtonClicked = async () => {

    // Send Token to Email
    const tokenRequestResponse:any = requestTwoFactorAuthenticationCode(user.email);
    if (tokenRequestResponse == -1){

      alert("Token Request Error");
      return;

    }

    alert("Token Sent to Your Email!");
    setIsTokenSent(true);

  }

  const onTokenSubmitted = async () => {

    // Validate Token First, if Correct continue
    const codeResponse: any = await getOneTimeCode(user.email);
    if (codeResponse == -1) {

      alert('Code Fetching Failed');
      return;

    }

    if (codeResponse[0].code !== token){

      alert('Invalid Token');
      return;

    }
    
    const toUpdate:User = {
      ID: user.ID,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      mobile_phone_number: user.mobile_phone_number,
      password: user.password,
      role_id: user.role_id,
      subscribed_to_email_offers_and_discounts: user.subscribed_to_email_offers_and_discounts,
      status: user.status,
      two_factor_authentication: !user.two_factor_authentication
    }

    const result = await updateUser(toUpdate);
    if (result == -1) alert("2FA Failed");
    else alert("2FA Status Changed");

    const subject = user.two_factor_authentication ? "Two Factor Authentication Deactivated" : "Two Factor Authentication Activated";

    sendEmail(user.email, subject, "Dear client, your 2FA Activity has been changed");

    window.location.reload();

  }

  const onUpdatePhoneNumberButtonClicked = async () => {

    const toUpdate:User = {
      ID: user.ID,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      mobile_phone_number: phoneNumber,
      password: user.password,
      role_id: user.role_id,
      subscribed_to_email_offers_and_discounts: user.subscribed_to_email_offers_and_discounts,
      status: user.status,
      two_factor_authentication: user.two_factor_authentication
    }

    const result = await updateUser(toUpdate);
    if (result == -1) alert("Phone Number Update Failed");
    else alert("Phone Number Updated");

    window.location.reload();

  }

  const onChangePasswordButtonClicked = async () => {

    // Focus Here
    const response = await changePassword(user.email, oldPassword, newPassword);
    if (response == -1) alert('Server Error');
    else if (response == -2) alert('Old Password is Wrong');
    else {

      alert('Password Changed');
      router.push('/sign-in');
      setCookie('Auth', '', 1); 

    }

  }

  const onSignOutButtonClicked = () => {

    router.push('/');
    setCookie('Auth', '', 1); 

  }

  const getContent = () => {

    return (
      <div className={style.index}>
        <h1>Hi, {user.first_name + ' '}</h1>
        <br /><br /><br />
        <h3>Your Email: {user.email}</h3>
        <h3>Your Currency: {user.currency}</h3>
        <br /><br /><br />
        <div className={style.phone_number_container}>
          <h3>Your Phone Number </h3>
          <RectangularInputField 
            value={phoneNumber ? phoneNumber : ""}
            onChange={setPhoneNumber}
            height={34}
            width={230}
            number
          />
          <RectangularButton 
            content={<div>UPDATE PHONE NUMBER</div>} 
            height={34}
            width={250}
            orange
            onClick={ onUpdatePhoneNumberButtonClicked }
          />
        </div>
        <br /><br /><br />
        <div className={style.two_factor_authentication_container}>
          <h3>Two Factor Authentication: {user.two_factor_authentication ? "Active" : "Not Active"}</h3>
          {
            !isTokenSent ? 
            <RectangularButton 
              content={user?.two_factor_authentication ? 
                <div>Disable 2FA</div> : <div>Enable 2FA</div>} 
              height={34}
              width={250}
              orange
              onClick={ onTwoFactorAuthenticationButtonClicked }
            /> :
            <>
              <RectangularInputField 
                placeholder="Code"
                value={token}
                onChange={setToken}
                height={34}
                width={230}
                number
              />
              <RectangularButton 
                content={<div>SUBMIT TOKEN</div>} 
                height={34}
                width={250}
                orange
                onClick={ onTokenSubmitted }
              />
            </>
          } 
        </div>
        <br /><br /><br />
        <div className={style.update_password_container}>
          <h3>Change Password</h3>
          <div className={style.container}>
            <RectangularInputField 
              placeholder="Old Password"
              value={oldPassword}
              onChange={setOldPassword}
              height={34}
              width={230}
              password
            />
            <RectangularInputField 
              placeholder="New Password"
              value={newPassword}
              width={230}
              onChange={setNewPassword}
              height={34}
              password
            />
            <RectangularButton 
              content={<div>CHANGE PASSWORD</div>} 
              height={34}
              width={250}
              orange
              onClick={ onChangePasswordButtonClicked }
            />
          </div>
        </div>
        <br /><br /><br />
        <RectangularButton 
          content={<div>SIGN OUT</div>} 
          height={34}
          width={250}
          onClick={ onSignOutButtonClicked }
        />

      </div>
    );

  }

  return ( <HomeLayout content={ getContent() } user={user} /> );
}
 
export default ProfilePage;