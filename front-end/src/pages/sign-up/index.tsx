import Link from 'next/link';
import style from '../../styles/pages/SignUp.module.scss'
import Logo from '@/components/Navbar/Logo';
import SafeNumber from '@/types/SafeNumber';
import RectangularInputField from '@/components/RectangularInputField/RectangularInputField';

const SignUp = () => {

  const width: number = 304;
  const height: number = 44;

  return ( 
    <form className={style.index}>
      <Link href="/"><Logo height={60 as SafeNumber}/></Link>
      <p className={style.sign_up_title}>Create Account</p>
      <p className={style.shopping_for_business}>Shopping for your business? 
        <Link className={style.link} href='https://secure.neweggbusiness.com/new/newmyaccount/b2baccountregistration.aspx?event=b2c&cm_sp=newegg_sign_up'>
          Create a free business account.
        </Link>
      </p>
      <RectangularInputField placeholder={"First Name"} width={width} height={height}/>
      <RectangularInputField placeholder={"Last Name"} width={width} height={height}/>
      <RectangularInputField email placeholder={"Email Address"} width={width} height={height}/>
      <RectangularInputField number placeholder={"Mobile Phone Number (optional)"} width={width} height={height}/>
      <RectangularInputField password placeholder={"Password"} width={width} height={height}/>

      <div className={style.password_constraint_hints_container}>
        <div className={style.left}>
          <div className={style.top}>
            Including 3 of the following:
          </div>
          <div className={style.bottom}>

          </div>
        </div>
        <div className={style.right}>
          <div className={style.top}>
            Must contain:
          </div>
          <div className={style.bottom}>
            
          </div>
        </div>
      </div>

    </form>
   );
}
 
export default SignUp;