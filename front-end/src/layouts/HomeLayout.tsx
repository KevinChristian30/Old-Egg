import Navbar from "@/components/Navbar/Navbar";
import style from "../styles/layouts/HomeLayout.module.scss";
import HomeFooter from "@/components/Footer/HomeFooter/HomeFooter";
import { ReactNode } from "react";

interface HomeLayoutProps{
  user?: any
  content: ReactNode
  noGap?: boolean
}

const HomeLayout = (props: HomeLayoutProps) => {

  const { user, content, noGap } = props;

  return ( 
    <div className={style.home_layout}>
      <Navbar user={ user } />
      <br /><br /><br /><br /><br />
      {
        !noGap && (<><br /><br /><br /><br /><br /><br /></>)
      }
      <div className={style.content_container}>{ content }</div> 
      {
        !noGap && (<><br /><br /><br /><br /><br /></>)
      }
      <HomeFooter />
    </div>
   );
}
 
export default HomeLayout;