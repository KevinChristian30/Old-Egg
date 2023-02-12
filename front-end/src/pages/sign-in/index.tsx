import style from "../../styles/pages/SignIn.module.scss";
import Logo from "../../components/Navbar/Logo";
import SafeNumber from "@/types/SafeNumber";
import RectangularInputField from "@/components/RectangularInputField/RectangularInputField";
import RectangularButton from "@/components/RectangularButton";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faAppleAlt } from "@fortawesome/free-solid-svg-icons";
import SignInFooter from "@/components/Footer/SignInFooter";
import { useState } from "react";
import signIn from "../api-calls/auth/sign-in";
import User from "@/types/User";
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

const Index = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter();

  const onFormSubmitted = async (e:any) => {

    e.preventDefault();

    const user: User = {
      email: email,
      password: password
    }
    const response = await signIn(user)

    if (response === -1) alert("Server Error, Couldn't Sign You In Right Now");
    if (response === -2) alert('Email Not Found');
    if (response === -3) alert('Incorrect Password');
    else router.push('/');
  
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
        email/>
      <RectangularInputField
        value={password}
        onChange={setPassword}
        placeholder={"Password"}
        width={304}
        height={44}
        password/>
      <button>
        <RectangularButton content={ getSignInButtonContent() } orange/>
      </button>
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
      <br />

      <SignInFooter />

    </form>
  );

}

export default Index;