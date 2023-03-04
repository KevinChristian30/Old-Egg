import Product from "@/types/Product";
import style from "../../styles/components/Card/ProductCard.module.scss";

interface ProductCardProps{
  product: Product
}

const ProductCard = (props: ProductCardProps) => {

  const { product } = props;

  return ( 
    <div className={style.product_card}>
      {product.product_image_links && <img className={style.image} src={product.product_image_links[0]} /> }
      <div className={style.text_container}>
        <b><h5 className={style.product_name}>{product.product_name}</h5></b>
        <h3>${product.product_price}</h3>
        <h6>Stock: {product.product_stock}</h6>
      </div>
    </div>
   );
}
 
export default ProductCard;