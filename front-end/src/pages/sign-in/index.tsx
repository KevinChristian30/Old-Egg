import style from "../../styles/pages/SignIn.module.scss";
import Logo from "../../components/Navbar/Logo";
import SafeNumber from "@/types/SafeNumber";
import RectangularInputField from "@/components/RectangularInputField/RectangularInputField";
import RectangularButton from "@/components/RectangularButton";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faAppleAlt } from "@fortawesome/free-solid-svg-icons";

const Index = () => {

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

  return (
    <form className={style.index}>
      <Link href="/"><Logo height={60 as SafeNumber}/></Link>
      <p className={style.sign_in_title}>Sign In</p>
      <RectangularInputField
        placeholder={"Email Address"}
        width={304}
        height={44}
        email={true}/>
      <RectangularButton content={ getSignInButtonContent() } orange/>
      <RectangularButton content={ getOneTimeSignInButtonContent() } />
      <p className={style.whats_the_one_time_code}>What's the One-Time Code?</p>
      <div className={style.new_to_newEgg}>
        <p>New to Newegg?</p>
        <Link href='/sign-up'><b><u><p>Sign Up</p></u></b></Link>
      </div>
      <br />
      <p className={style.or}>OR</p>
      <RectangularButton content={ getSignInWithGoogleButton() }/>
      <RectangularButton content={ getSignInWithAppleButton() }/>
      <br /><br /><br />
      <div className={style.terms_and_conditions_and_privacy_policy}>
        <Link className={style.link} href=''>Terms & Conditions</Link> 
          | 
        <Link className={style.link}href=''>Privacy Policy</Link>
      </div>
      <p className={style.credits}>© 2000-2023 Newegg Inc. All rights reserved.</p>
    </form>
  );

}

export default Index;