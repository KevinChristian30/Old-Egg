import style from '../styles/components/Navbar.module.scss';
import HamburgerMenu from './HamburgerMenu';
import Logo from './Logo';

const Navbar = () => {
  return ( 
    <div className={style.navbar}>
      <HamburgerMenu />
      <Logo />
    </div>
   );
}
 
export default Navbar;