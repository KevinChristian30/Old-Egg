import { ReactElement } from "react";
import style from "../../styles/components/Navbar/NavbarButton.module.scss"; 

interface NavbarButtonProps{
  child: ReactElement
}

const NavbarButton = (props: NavbarButtonProps) => {

  const child = props.child;

  return ( 
    <div className={style.navbar_button}>{ child }</div>
   );
}
 
export default NavbarButton;