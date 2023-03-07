import style from "../../styles/components/Card/ProductCategoryCard.module.scss"

interface ProductCategoryCardProps{
  productCategory: any
}

const ProductCategoryCard = (props: ProductCategoryCardProps) => {

  const { productCategory } = props;

  return ( 
    <div className={style.category_card}>
      { productCategory.product_category_name }
    </div>
   );
}
 
export default ProductCategoryCard;