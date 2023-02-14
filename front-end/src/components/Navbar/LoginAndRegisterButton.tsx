import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../styles/components/Navbar/LoginAndRegisterButton.module.scss";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import useAuth from "@/hooks/useAuth";

interface LoginAndRegsterButonProps{
  firstName?: string
}

const LoginAndRegisterButton = (props: LoginAndRegsterButonProps) => {

  const firstName = props.firstName;

  const getText = () => {

    if (firstName) return <p>{firstName}</p>
    else return <p>Sign In / Register</p>

  }

  return (
    <div className={style.login_and_register_button}>
      <div className={style.left}>
        <FontAwesomeIcon icon={faUser} className={style.icon} />
      </div>
      <div className={style.right}>
        <div className={style.top}>
          <p>Welcome</p>
        </div>
        <div className={style.bottom}>
          { getText() }
        </div>      
      </div>
    </div>
  );
}

export default LoginAndRegisterButton;