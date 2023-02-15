import style from "../../styles/components/Navbar/Logo.module.scss";
import lightLogo from "../../assets/NeweggLogo1.png";
import darkLogo from "../../assets/NeweggLogoDark.png";
import Image from "next/image"; 
import SafeNumber from "@/types/SafeNumber";
import getCookie from "@/utility/getCookie";
import { useState } from "react";

interface LogoProps{
  height: SafeNumber
}

const Logo = (props: LogoProps) => {

  const height = props.height;

  return ( 
    <div className={style.logo}>
      <Image src={lightLogo} 
             alt='' 
             className={style.image}
             height={height}>
      </Image>
    </div>
   );

}
 
export default Logo;