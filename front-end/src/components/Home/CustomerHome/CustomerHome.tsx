import style from "../../../styles/components/Home/CustomerHome/CustomerHome.module.scss";
import ImageCarousel from "./ImageCarousel";

const CustomerHome = () => {

  return (
    <div className={style.index}>
      <ImageCarousel />
    </div> 
   );
   
}
 
export default CustomerHome;