import { ReactElement } from 'react';
import style from '../../styles/components/Navbar/Navbar.module.scss';
import SingleTextLink from '../SingleTextLink';
import AddressSelector from './AddressSelector';
import ChangeCountryButton from './ChangeCountryButton';
import HamburgerMenu from './HamburgerMenu';
import LoginAndRegisterButton from './LoginAndRegisterButton';
import Logo from './Logo';
import NavbarButton from './NavbarButton';
import NotificationButton from './NotificationButton';
import ReturnsAndOrdersButton from './ReturnsAndOrdersButton';
import SearchBar from './SearchBar';
import ShoppingCartButton from './ShoppingCartButton';
import ThemeToggle from './ThemeToggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faComment } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {

  const getFeedbackButton = () => {
    return (
      <div className={style.button}>
        <FontAwesomeIcon icon={faComment} className={style.icon} />
        FEEDBACK
      </div>
    );
  }

  const getHelpCenterButton = () => {
    return (
      <div className={style.button}>
        <FontAwesomeIcon icon={faCircleQuestion} className={style.icon} />
        HELP CENTER
      </div>
    );
  }

  return ( 
    <div className={style.navbar}>

      <div className={style.top}>
        <HamburgerMenu />
        <Logo />
        <AddressSelector />
        <SearchBar />
        <NotificationButton />
        <ChangeCountryButton />
        <ThemeToggle />
        <LoginAndRegisterButton />
        <ReturnsAndOrdersButton />
        <ShoppingCartButton />
      </div>

      <div className={style.bottom}>

        <div className={style.left}>
          <SingleTextLink text={"Today's Best Deals"}/>
          <SingleTextLink text={"Best Sellers"}/>
          <SingleTextLink text={"Big Game TV Deals"}/>
          <SingleTextLink text={"RTX 4080/4090 Laptops"}/>
          <SingleTextLink text={"Valentine's Day"} red={true}/>
          <SingleTextLink text={"PC Builder"}/>
          <SingleTextLink text={"VR"}/>
          <SingleTextLink text={"Browsing History"}/>
          <SingleTextLink text={"Gaming PC Finder"}/>
        </div>
        <div className={style.right}>
          <div className={style.newEgg_business}>
            <div className={style.newEgg_left}>NEWEGG</div>
            <div className={style.right}>BUSINESS</div>
          </div>
          <NavbarButton child={ getFeedbackButton() } />
          <NavbarButton child={ getHelpCenterButton() } />
        </div>
        
      </div>

    </div>
   );
}
 
export default Navbar;