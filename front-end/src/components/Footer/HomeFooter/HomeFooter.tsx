import Link from "next/link";
import style from "../../../styles/components/Footer/HomeFooter/HomeFooter.module.scss";
import FooterComponent from "./FooterComponent";
import { companyInformationLinks, customerServiceLinks, myAccountLinks, shopOurBrandLinks, toolsAndResourcesLinks } from "./HomeFooterLinks";
import SocialMediaButton from "./SocialMediaButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faFacebook, faInstagram, faLinkedin, faPinterest, faTiktok, faTwitch, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";

const HomeFooter = () => {

  return ( 
    <div className={style.home_footer}>
      <div className={style.top}>
        <FooterComponent title="CUSTOMER SERVICE" links={ customerServiceLinks } />
        <FooterComponent title="MY ACCOUNT" links={ myAccountLinks } />
        <FooterComponent title="COMPANY INFORMATION" links={ companyInformationLinks } />
        <FooterComponent title="TOOLS & RESOURCES" links={ toolsAndResourcesLinks } />
        <FooterComponent title="SHOP OUR BRAND" links={ shopOurBrandLinks } />
      </div>
      <div className={style.bottom}>
        <div className={style.left}>
          <p>© 2000-2023 Newegg Inc.  All rights reserved.</p>
          <div className={style.link_container}>
            <Link className={style.link} href={'https://kb.newegg.com/knowledge-base/policy-agreement/'}>Terms & Conditions</Link>
            <Link className={style.link} href={'https://kb.newegg.com/knowledge-base/privacy-policy-newegg'}>Privacy Policy</Link>
            <Link className={style.link} href={''}>Cookie Preferences</Link>
          </div>
        </div>
        <div className={style.right}>
          <SocialMediaButton url='https://www.facebook.com/Newegg' icon={ <FontAwesomeIcon className={style.link} icon={faFacebook} /> } />
          <SocialMediaButton url='https://twitter.com/Newegg' icon={ <FontAwesomeIcon className={style.link} icon={faTwitter} /> } />
          <SocialMediaButton url='https://www.instagram.com/newegg/' icon={ <FontAwesomeIcon className={style.link} icon={faInstagram} /> } />
          <SocialMediaButton url='https://www.linkedin.com/company/newegg-com' icon={ <FontAwesomeIcon className={style.link} icon={faLinkedin} /> } />
          <SocialMediaButton url='https://www.pinterest.com/newegg/' icon={ <FontAwesomeIcon className={style.link} icon={faPinterest} /> } />
          <SocialMediaButton url='https://www.youtube.com/user/newegg' icon={ <FontAwesomeIcon className={style.link} icon={faYoutube} /> } />
          <SocialMediaButton url='https://www.twitch.tv/newegg' icon={ <FontAwesomeIcon className={style.link} icon={faTwitch} /> } />
          <SocialMediaButton url='https://discord.com/invite/newegg' icon={ <FontAwesomeIcon className={style.link} icon={faDiscord} /> } />
          <SocialMediaButton url='https://www.tiktok.com/@newegg' icon={ <FontAwesomeIcon className={style.link} icon={faTiktok} /> } />
        </div>
      </div>
    </div>
   );
}
 
export default HomeFooter;