import style from "../../styles/components/Navbar/HamburgerMenu.module.scss"

const HamburgerMenu = () => {
  return ( 
    <div className={style.hamburger_menu}>
      <span className={style.line}></span>
      <span className={style.line}></span>
      <span className={style.line}></span>
    </div>
   );
}
 
export default HamburgerMenu;