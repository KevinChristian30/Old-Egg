import style from "../../styles/pages/LoginAndRegister.module.scss";
import Logo from "../../components/Navbar/Logo";
import SafeNumber from "@/types/SafeNumber";
import SquareInputField from "@/components/SquareInputField";

const Index = () => {

  return (
    <form className={style.index}>
      <Logo height={60 as SafeNumber}/>
      <p>Sign In</p>
      <SquareInputField 
        placeholder={"Email Address"}
        width={304}
        height={44}
        email={true}
        />
    </form>
  );

}

export default Index;