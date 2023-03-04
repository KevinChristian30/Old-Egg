import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../styles/components/Navbar/LoginAndRegisterButton.module.scss";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import useAuth from "@/hooks/useAuth";
import WORDS from "./Words";

interface LoginAndRegsterButonProps{
  firstName?: string
}

const LoginAndRegisterButton = (props: LoginAndRegsterButonProps) => {

  const firstName = props.firstName;

  const getText = () => {

    if (firstName) return <p>{firstName}</p>
    else return <p>{WORDS.signIn} / {WORDS.register}</p>

  }

  return (
    <div className={style.login_and_register_button}>
      <div className={style.left}>
        <FontAwesomeIcon icon={faUser} className={style.icon} />
      </div>
      <div className={style.right}>
        <div className={style.top}>
          <p>{WORDS.welcome}</p>
        </div>
        <div className={style.bottom}>
          { getText() }
        </div>      
      </div>
    </div>
  );
}

export default LoginAndRegisterButton;