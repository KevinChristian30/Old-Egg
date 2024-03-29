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
import NewEggBusiness from './NewEggBusinessButton';
import SafeNumber from '@/types/SafeNumber';
import Link from 'next/link';
import User from '@/types/User';
import WORDS from './Words';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface NavBarProps{
  user?:User
}

const Navbar = (props:NavBarProps) => {

  const { user } = props;
  const router = useRouter();

  const getFeedbackButton = () => {
    return (
      <div className={style.button}>
        <FontAwesomeIcon icon={faComment} className={style.icon} />
        {WORDS.feedback}
      </div>
    );
  }

  const getHelpCenterButton = () => {
    return (
      <div className={style.button}>
        <FontAwesomeIcon icon={faCircleQuestion} className={style.icon} />
        {WORDS.helpCenter}
      </div>
    );
  }

  const navigateToCartPage = () => {

    router.push('/cart');

  }

  return (
    <div className={style.navbar}>

      <div className={style.top}>
        <HamburgerMenu />
        <Link href='/'><Logo height={50 as SafeNumber}/></Link>
        <AddressSelector />
        <SearchBar />
        <NotificationButton user_id={user ? user.ID : -1} />
        <ChangeCountryButton />
        <ThemeToggle />
        <Link href={ user?.first_name ? "/profile" : "/sign-in" }>
          <LoginAndRegisterButton firstName={user?.first_name} />
        </Link>
        <Link href={'/user/orders'}>
          <ReturnsAndOrdersButton />
        </Link>
        <div onClick={ navigateToCartPage }><ShoppingCartButton user={user} /></div>        
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
          <NewEggBusiness />
          <NavbarButton child={ getFeedbackButton() } />
          <Link href="/help">
            <NavbarButton child={ getHelpCenterButton() } />
          </Link>
        </div>
        
      </div>

    </div>
   );
}
 
export default Navbar;