import Link from "next/link";
import style from "../../styles/components/Footer/SignInFooter.module.scss";

const SignInFooter = () => {
  return ( 
    <div className={style.sign_in_footer}>
      <div className={style.terms_and_conditions_and_privacy_policy}>
        <Link className={style.link} href=''>Terms & Conditions</Link> 
          | 
        <Link className={style.link}href=''>Privacy Policy</Link>
      </div>
      <p className={style.credits}>© 2000-2023 Newegg Inc. All rights reserved.</p>
    </div>
   );
}
 
export default SignInFooter;