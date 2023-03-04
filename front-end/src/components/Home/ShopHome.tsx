import Link from "next/link";
import style from "../../styles/components/Home/ShopHome.module.scss";
import SquareCard from "../Card/SquareCard";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SimplePagination from "../Pagination/SimplePagination";
import { useEffect, useState } from "react";
import getAllProducts from "@/pages/api-calls/products/getAllProducts";

interface ShopHomeProps{
  shopID: Number
}

const ShopHome = (props: ShopHomeProps) => {
  
  const { shopID } = props;
  const [pageNumber, setPageNumber] = useState(1);
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {

    const getMoreProducts = async () => {

      const toAppend:any = await getAllProducts(shopID, pageNumber);
      if (toAppend) setProducts([...products, ...toAppend]);

    }
    
    getMoreProducts();

  }, [pageNumber]);

  const incrementPageNumber = () => {

    setPageNumber(pageNumber + 1);

  }

  if (products.length <= 0) return <div>No Products</div>

  return ( 
    <div className={style.index}>
      <br /><br /><br /><br /><br /><br />
      <h1>Your Products</h1>
      <h3>Product Count: {products.length}</h3>
      <br /><br />
      <br />
      <div className={style.products_container}>
        <SimplePagination onNextClicked={ incrementPageNumber } data={ products } itemsPerPage={50} type="product" />
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
