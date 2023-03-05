import Logo from "@/components/Navbar/Logo";
import RectangularInputField from "@/components/RectangularInputField/RectangularInputField";
import SafeNumber from "@/types/SafeNumber";
import Link from "next/link";
import style from "../../../styles/pages/SignIn.module.scss";
import RectangularButton from "@/components/RectangularButton";
import SignInFooter from "@/components/Footer/SignInFooter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faAppleAlt, faHands } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import User from "@/types/User";
import signIn from "@/pages/api-calls/auth/sign-in";
import sendEmail from "@/utility/sendEmail";
import { ENV } from "@/ENV";
import axios from "axios";
import signInWithOneTimeCode from "@/pages/api-calls/auth/signInWithOneTimeCode";
import setCookie from "@/utility/setCookie";
import { useRouter } from "next/router";

const getSignInButtonContent = () => {

  return (
    <div className={style.sign_in_button}>
      SIGN IN
    </div>
  );

}

const getOneTimeSignInButtonContent = () => {

  return (
    <div className={style.one_time_sign_in_button}>
      GET ONE-TIME SIGN IN CODE
    </div>
  );

}

const getSignInWithGoogleButton = () => {
  
  return (
    <div className={style.sign_in_with_google_and_apple_button}>
      <FontAwesomeIcon icon={faGoogle} className={style.icon} />
      SIGN IN WITH GOOGLE
    </div>
  );

}

const getSignInWithAppleButton = () => {
  return (
    <div className={style.sign_in_with_google_and_apple_button}>
      <FontAwesomeIcon icon={faAppleAlt} className={style.icon} />
      SIGN IN WITH APPLE
    </div>
  );
}

const getSignInAssistanceButton = () => {

  return (
    <div className={style.sign_in_with_google_and_apple_button}>
      <FontAwesomeIcon icon={faHands} className={style.icon} />
      SIGN IN ASSISTANCE
    </div>
  );

}

const OneTimeCode = () => {

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const [sendingEmail, setSendingEmail] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const router = useRouter();

  const onFormSubmitted = async (e: any) => {

    e.preventDefault();
    
    // Validate Email Exists
    const user: User = {
      ID: -1, // Might be Dangerous
      email: email,
      password: "p"
    }

    const response:any = await signIn(user)
    if (response === -2) {
      alert('Email Not Found');
      return;
    }

    const code:any = await axios.post(ENV.API + 'get-one-time-sign-in-code', user);

    setSendingEmail(true);
    const emailResponse = await sendEmail(email, 
      "One Time Code", 
      "\nYour One Time Sign-In Code is: " + code.data.code);

    if (emailResponse === "Send Error") alert("Email Send Error");
    else alert('Email Sent!');

    setSendingEmail(false);

    setIsEmailSent(true);

  }

  const signInWithCode = async () => {

    const result = await signInWithOneTimeCode(email, code);
    if (result == -1) alert('Server Error');
    else if (result == -2) alert('Invalid Code')
    else if (result == -3) alert('Code is No Longer Valid')
    else {

      alert('One Time Code Sign In Successful');
      setCookie("Auth", result, 10);
      router.push('/');

    }

  }

  return ( 
    <form className={style.index} onSubmit={ e => onFormSubmitted(e) }>
      <Link href="/"><Logo height={60 as SafeNumber}/></Link>
      <p className={style.sign_in_title}>Sign In</p>
      {
        !isEmailSent ? <RectangularInputField
        value={email}
        onChange={setEmail}
        placeholder={"Email Address"}
        width={304}
        height={44}
        email
        required/> :
        <RectangularInputField
        value={code}
        onChange={setCode}
        placeholder={"One Time Code"}
        width={304}
        height={44}
        number
        required/>
      }
      {
        isEmailSent && <RectangularButton onClick={ signInWithCode } content={ getSignInButtonContent() } orange/> 
      }
      {
        !sendingEmail ?
        <button>
          <RectangularButton content={ getOneTimeSignInButtonContent() } />
        </button> : 
        <h4 className="">Sending Email...</h4>
      }
      <p className={style.whats_the_one_time_code}>What's the One-Time Code?</p>
      <div className={style.new_to_newEgg}>
        <p>New to Newegg?</p>
        <Link href='/sign-up'><b><u><p>Sign Up</p></u></b></Link>
      </div>
      <br />
      <p className={style.or}>OR</p>
      <RectangularButton onClick={ () => router.push('/sign-in/assistance') } content={ getSignInAssistanceButton() }/>
      <RectangularButton content={ getSignInWithGoogleButton() }/>
      <RectangularButton content={ getSignInWithAppleButton() }/>
      <br />

      <SignInFooter />

    </form>
   );
}
 
export default OneTimeCode;