import Link from 'next/link';
import style from '../../styles/pages/SignUp.module.scss'
import Logo from '@/components/Navbar/Logo';
import SafeNumber from '@/types/SafeNumber';
import RectangularInputField from '@/components/RectangularInputField/RectangularInputField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import RectangularButton from '@/components/RectangularButton';
import SignInFooter from '@/components/Footer/SignInFooter';
import { useState } from 'react';
import User from "../../types/User";
import signUp from '../api-calls/auth/sign-up';
import { useRouter } from 'next/router';

const getSignupButtonContent = () => {
  
  return (
    <div className="">
      SIGN UP
    </div>
  );

}

const SignUp = () => {

  const width: number = 304;
  const height: number = 44;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(true);

  const router = useRouter();

  const onFormSubmitted = async (e:any) => {

    e.preventDefault();

    const user: User = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      mobile_phone_number: phoneNumber,
      password: password,
      role_id: 1,
      subscribed_to_email_offers_and_discounts: isSubscribing
    };

    const response:any = await signUp(user);
    if (response === -1) alert('Sign Up Failed, Due to Server Error');
    else if (response === -2) alert('Email Already Used');
    else if (response === -3) alert('Phone Number Already Used');
    else {
      alert('Account Created');
      router.push('/sign-in');
    }
    
  }

  return ( 
    <form className={style.index} onSubmit={ onFormSubmitted }>
      <Link href="/"><Logo height={60 as SafeNumber}/></Link>
      <p className={style.sign_up_title}>Create Account</p>
      <p className={style.shopping_for_business}>Shopping for your business? 
        <Link className={style.link} href='https://secure.neweggbusiness.com/new/newmyaccount/b2baccountregistration.aspx?event=b2c&cm_sp=newegg_sign_up'>
          Create a free business account.
        </Link>
      </p>

      <RectangularInputField value={firstName} onChange={setFirstName} 
      required placeholder={"First Name"} width={width} height={height}/>

      <RectangularInputField value={lastName} onChange={setLastName} 
      required placeholder={"Last Name"} width={width} height={height}/>
      
      <RectangularInputField value={email} onChange={setEmail} 
      required email placeholder={"Email Address"} width={width} height={height}/>

      <RectangularInputField value={phoneNumber} onChange={setPhoneNumber} 
      number placeholder={"Mobile Phone Number (optional)"} width={width} height={height}/>

      <RectangularInputField value={password} onChange={setPassword} 
      required password placeholder={"Password"} width={width} height={height}/>

      <div className={style.password_constraint_hints_container}>
        <div className={style.left}>
          <div className={style.top}>
            Including 3 of the following:
          </div>
          <div className={style.bottom}>
            <div><FontAwesomeIcon className={style.icon} icon={faCircleCheck} /> ABC</div>
            <div><FontAwesomeIcon className={style.icon} icon={faCircleCheck} /> abc</div>
            <div><FontAwesomeIcon className={style.icon} icon={faCircleCheck} /> 123</div>
            <div><FontAwesomeIcon className={style.icon} icon={faCircleCheck} /> @#$</div>
          </div>
        </div>
        <div className={style.right}>
          <div className={style.top}>
            Must contain:
          </div>
          <div className={style.bottom}>
            <div><FontAwesomeIcon className={style.icon} icon={faCircleCheck} /> 8-30 Chars</div>
          </div>
        </div>
      </div>
      <br />

      <div className={style.subscription}>
        <input type="checkbox" checked={isSubscribing} onChange={() => setIsSubscribing(!isSubscribing)}/>
        <p>Subscribe for exclusive e-mail offers and discounts</p>
      </div>

      <div className={style.terms_of_service}>
        By creating an account, you agree to Newegg’s 
        <Link href={''} className={style.link}>Privacy Notice</Link> 
        and 
        <Link href={''} className={style.link}>Terms of Use</Link>
        .
      </div>

      <button><RectangularButton orange content={ getSignupButtonContent() } /></button>
      <div className={style.sign_in}>
        Have an account? <Link className={style.link} href={'/sign-in'}>Sign In</Link>
      </div>

      <br />
      <SignInFooter />
      <br />

    </form>
   );
}
 
export default SignUp;