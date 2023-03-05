import useProductCategories from "@/hooks/useProductCategoies";
import style from "../../../styles/components/Home/CustomerHome/CustomerHome.module.scss";
import ImageCarousel from "./ImageCarousel";
import CategoryCard from "@/components/Card/CategoryCard";

const CustomerHome = () => {

  const categories = useProductCategories();

  return (
    <div className={style.index}>
      <ImageCarousel />
      <div className={style.categories_container}>
        {
          categories.map((category: any) => {
            return <CategoryCard key={category.ID} category={category} /> 
          })
        }
      </div>
    </div> 
   );
   
}
 
export default CustomerHome;