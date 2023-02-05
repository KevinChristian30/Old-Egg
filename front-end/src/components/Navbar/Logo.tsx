import style from "../../styles/components/Navbar/Logo.module.scss"
import logo from "../../assets/NeweggLogo1.png"
import Image from "next/image"; 

const Logo = () => {
  return ( 
    <div className={style.logo}>
      <Image src={logo} alt='' className={style.image}></Image>
    </div>
   );
}
 
export default Logo;