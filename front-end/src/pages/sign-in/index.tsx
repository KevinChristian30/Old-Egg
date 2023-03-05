import style from "../../styles/pages/SignIn.module.scss";
import Logo from "../../components/Navbar/Logo";
import SafeNumber from "@/types/SafeNumber";
import RectangularInputField from "@/components/RectangularInputField/RectangularInputField";
import RectangularButton from "@/components/RectangularButton";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faAppleAlt, faHands } from "@fortawesome/free-solid-svg-icons";
import SignInFooter from "@/components/Footer/SignInFooter";
import { useState } from "react";
import signIn from "../api-calls/auth/sign-in";
import User from "@/types/User";
import { useRouter } from "next/router";
import shopSignIn from "../api-calls/auth/shop-sign-in";
import setCookie from "@/utility/setCookie";

const getSignInButtonContent = () => {

  return (
    <div className={style.sign_in_button}>
      SIGN IN
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

const getOneTimeSignInButtonContent = () => {
  
  return (
    <div className={style.one_time_sign_in_button}>
      ONE-TIME SIGN IN
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

const Index = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter();

  const onFormSubmitted = async (e:any) => {

    e.preventDefault();

    const user: User = {
      ID: -1, // Might be Dangerous
      email: email,
      password: password
    }

    const response:any = await signIn(user)
    const shopSignInResponse:any = await shopSignIn(user);

    if (response === -2 && shopSignInResponse === -2){

      alert('Email Not Found');

    } else if (response != -2){ // Found in User

      if (response === -1) alert("Server Error, Couldn't Sign You In Right Now");
      else if (response === -3) alert('Incorrect Password');
      else if (response === -4) alert('Token Generation Failed');
      else if (response === -5) {
        setCookie("Auth", "", 1);
        alert('You Are Banned');
      }else {
        setCookie("Auth", response, 1);
        router.push("/");
      } 
      
    } else { // Found in Shop
      
      if (shopSignInResponse === -1) alert("Server Error, Couldn't Sign You In Right Now");
      else if (shopSignInResponse === -3) alert('Incorrect Password');
      else if (shopSignInResponse === -4) alert('Token Generation Failed');
      else if (shopSignInResponse === -5){
        setCookie("Auth", "", 1);
        alert('You Are Banned');
      } 
      else {
        setCookie("Auth", shopSignInResponse, 1);
        router.push("/");
      }

    }

  }

  return (
    <form className={style.index} onSubmit={ e => onFormSubmitted(e) }>
      <Link href="/"><Logo height={60 as SafeNumber}/></Link>
      <p className={style.sign_in_title}>Sign In</p>
      <RectangularInputField
        value={email}
        onChange={setEmail}
        placeholder={"Email Address"}
        width={304}
        height={44}
        email
        required/>
      <RectangularInputField
        value={password}
        onChange={setPassword}
        placeholder={"Password"}
        width={304}
        height={44}
        password
        required/>
      <button>
        <RectangularButton content={ getSignInButtonContent() } orange/>
      </button>
      <RectangularButton onClick={ () => router.push('/sign-in/one-time') } content={ getOneTimeSignInButtonContent() } />
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

export default Index;