import { ReactNode } from "react";
import style from "../../../styles/components/Footer/HomeFooter/SocialMediaButton.module.scss";
import Link from "next/link";

interface SocialMediaButtonProps{
  icon: ReactNode
  url: string
}

const SocialMediaButton = (props: SocialMediaButtonProps) => {

  const { icon, url } = props;

  return ( 
    <Link target="_blank" href={url} className={style.social_media_button}>
      { icon }
    </Link>
   );
}
 
export default SocialMediaButton;