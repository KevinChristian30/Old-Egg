import style from "../../styles/components/Card/CategoryCard.module.scss"

interface CategoryCardProps{
  category: any
}

const CategoryCard = (props: CategoryCardProps) => {

  const { category } = props;

  return ( 
    <div className={style.category_card}>
      <p>{category.product_category_name}</p>
    </div>
   );
}
 
export default CategoryCard;