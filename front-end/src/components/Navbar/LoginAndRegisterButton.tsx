import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../styles/components/Navbar/LoginAndRegisterButton.module.scss";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const LoginAndRegisterButton = () => {
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
          <p>Sign In / Register</p>
        </div>      
      </div>
    </div>
  );
}

export default LoginAndRegisterButton;