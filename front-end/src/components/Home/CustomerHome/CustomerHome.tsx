import useProductCategories from "@/hooks/useProductCategoies";
import style from "../../../styles/components/Home/CustomerHome/CustomerHome.module.scss";
import ImageCarousel from "./ImageCarousel";
import CategoryCard from "@/components/Card/CategoryCard";
import Link from "next/link";
import SquareCard from "@/components/Card/SquareCard";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import useAuth from "@/hooks/useAuth";

const CustomerHome = () => {

  const user:any = useAuth();

  const categories = useProductCategories();

  if (!categories || categories.length == 0) return <div className="">Loading...</div>

  return (
    <div className={style.index}>
      <div className={style.carousel_container}>
        <ImageCarousel />
        <div className={style.categories_container}>
          {
            categories.map((category: any) => {
              return <CategoryCard key={category.ID} category={category} /> 
            })
          }
        </div>
      </div>
      {
        user.ID &&
        <div className={style.navigation_container}>
          <Link href="/voucher">
            <SquareCard text={"Voucher"} icon={faMoneyBill} />
          </Link>
        </div>
      }
    </div> 
   );
   
}
 
export default CustomerHome;