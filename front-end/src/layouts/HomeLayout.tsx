import Navbar from "@/components/Navbar/Navbar";
import style from "../styles/layouts/HomeLayout.module.scss";
import HomeFooter from "@/components/Footer/HomeFooter/HomeFooter";
import { ReactNode } from "react";

interface HomeLayoutProps{
  user: any
  content: ReactNode
}

const HomeLayout = (props: HomeLayoutProps) => {

  const { user, content } = props;

  return ( 
    <div className={style.home_layout}>
      <Navbar user={ user } />
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <div className={style.content_container}>{ content }</div> 
      <br /><br /><br /><br /><br />
      <HomeFooter />
    </div>
   );
}
 
export default HomeLayout;