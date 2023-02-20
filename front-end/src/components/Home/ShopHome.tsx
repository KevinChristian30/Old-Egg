import Link from "next/link";
import style from "../../styles/components/Home/ShopHome.module.scss";
import SquareCard from "../Card/SquareCard";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import useProducts from "@/hooks/useProducts";
import getAllProducts from "@/pages/api-calls/products/getAllProducts";
import SimplePagination from "../Pagination/SimplePagination";

const ShopHome = (props: any) => {
  
  const products = useProducts();

  console.log(products);

  return ( 
    <div className={style.index}>
      <br /><br /><br /><br /><br /><br />
      <h1>Your Products</h1>
      <br /><br />
      <div className={style.products_container}>
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
