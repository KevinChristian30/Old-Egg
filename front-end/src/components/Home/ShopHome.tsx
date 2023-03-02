import Link from "next/link";
import style from "../../styles/components/Home/ShopHome.module.scss";
import SquareCard from "../Card/SquareCard";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import useProducts from "@/hooks/useProducts";
import SimplePagination from "../Pagination/SimplePagination";
import { useState } from "react";

const ShopHome = (props: any) => {
  
  const products:any = useProducts();
  const [isAvailableOnly, setIsAvailableOnly] = useState(false);

  const filteredProducts = [];

  return ( 
    <div className={style.index}>
      <br /><br /><br /><br /><br /><br />
      <h1>Your Products</h1>
      <h3>Product Count: {products.length}</h3>
      <br /><br />
      <div className={style.products_container}>
        <div className={style.filter_line}>
          <p>Available Only</p>
          <input type="checkbox" checked={isAvailableOnly} onChange={() => setIsAvailableOnly(!isAvailableOnly)} />
        </div>
        <br />
        <SimplePagination data={products} itemsPerPage={50} type="product" />
      </div>
      <br /><br /><br /><br />
      <h1>Manage Your Shop</h1>
      <br /><br />
      <div className={style.container}>
        <Link href="/shop/add-product">
          <SquareCard text="Add Product" icon={faPlus} />
        </Link>
      </div>
      <br /><br /><br /><br /><br /><br />
    </div>
   );

}
 
export default ShopHome;
