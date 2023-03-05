import SafeNumber from "@/types/SafeNumber";
import style from "../../../styles/pages/SignIn.module.scss"
import Logo from "@/components/Navbar/Logo";
import Link from "next/link";
import RectangularInputField from "@/components/RectangularInputField/RectangularInputField";
import RectangularButton from "@/components/RectangularButton";
import { useState } from "react";
import requestForgotPasswordCode from "@/pages/api-calls/auth/requestForgotPasswordCode";
import verifyResetPasswordCode from "@/pages/api-calls/auth/verifyResetPasswordCode";
import User from "@/types/User";
import resetPassword from "@/pages/api-calls/auth/resetPassword";
import { useRouter } from "next/router";

const SignInAssistance = () => {

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  
  const router = useRouter();

  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isCodeCorrect, setIsCodeCorrect] = useState(false);

  const onFormSubmitted = async (e: any) => {

    e.preventDefault();

    if (isCodeCorrect) return;

    setIsSending(true);
    const response = await requestForgotPasswordCode(email);
    alert(response);
    setIsSending(false);

    if (response === "Field Can't be Empty") return;
    else if (response === "Email isn't Registered") return;
    else if (response === "Send Error") return;
    else if (response == "You Can Only Request Code Every 2 Minutes") return;
    else {

      // Email Sent
      setIsSent(true);

    }

  }

  const onSubmitCodeButtonClicked = async () => {

    // Send Code to Back-end
    const response = await verifyResetPasswordCode(email, code);
    if (response == -1) alert('Server Error');
    else if (response == -2) alert('Invalid Code');
    else if (response == -3) alert('Code Expired');
    else {

      // Display new Password Form
      alert("Code Correct");
      setIsCodeCorrect(true);

    }

  }

  const onNewPasswordButtonClicked = async () => {

    const response = await resetPassword(email, password);
    alert(response);
    router.push('/');

  }

  return ( 
    <form className={style.index} onSubmit={ e => onFormSubmitted(e) }>

      <Link href="/"><Logo height={60 as SafeNumber}/></Link>
      <p className={style.sign_in_title}>Sign In Assistance</p>
      <br />
      <p>Enter the email address and we will send you a verification code for you to enter before creating a new password</p>
      { !isCodeCorrect && 
        isSending ?
        <h2>Requesting Code...</h2> :
        !isSent && <RectangularInputField required email value={email} height={44} width={305} placeholder="Email" onChange={setEmail} /> 
      }
      {
        !isCodeCorrect &&
        isSent && 
        <>
          <RectangularInputField number value={code} height={44} width={305} placeholder="6 Digit Code" onChange={setCode} />
          <RectangularButton onClick={ onSubmitCodeButtonClicked } content={<div>SUBMIT CODE</div>} />
          <br /><br />
        </>
      }
      {
        isCodeCorrect && 
        <>
          <RectangularInputField required password value={password} height={44} width={305} placeholder="New Password" onChange={setPassword} /> 
          <RectangularButton onClick={ onNewPasswordButtonClicked } content={<div>RESET PASSWORD</div>} />
        </>
        
      }
      {
        !isCodeCorrect && <button>
          <RectangularButton orange content={<div>REQUEST VERIFICATION CODE</div>} />
        </button>
      }

      <br /><br />
      <div className={style.new_to_newEgg}>
          <p>Need Help?</p>
          <Link href='/'><b><u><p>Contact Customer Service</p></u></b></Link>
        </div>

      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

    </form>
   );
}
 
export default SignInAssistance;