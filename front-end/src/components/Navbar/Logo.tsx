import style from "../../styles/components/Navbar/Logo.module.scss"
import logo from "../../assets/NeweggLogo1.png"
import Image from "next/image"; 
import SafeNumber from "@/types/SafeNumber";

interface LogoProps{
  height: SafeNumber
}

const Logo = (props: LogoProps) => {

  const height = props.height;

  return ( 
    <div className={style.logo}>
      <Image src={logo} 
             alt='' 
             className={style.image}
             height={height}>
      </Image>
    </div>
   );

}
 
export default Logo;