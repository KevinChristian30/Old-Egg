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

  const [isAvailableOnly, setIsAvailableOnly] = useState(false);

  const getProducts = async () => {

    setProducts([]);
    const data = await getAllProducts(shopID, pageNumber, !isAvailableOnly);
    if (!data) setPageNumber(pageNumber - 1);
    else setProducts(data);

  }

  useEffect(() => {

    const initialFetch = async () => {

      setProducts([]);
      const data = await getAllProducts(shopID, pageNumber, isAvailableOnly);
      if (!data) setPageNumber(pageNumber - 1);
      else setProducts(data);

    }
    
    initialFetch();

  }, [pageNumber]);

  const incrementPageNumber = () => {

    setPageNumber(pageNumber + 1);

  }

  const decrementPageNumber = () => {

    if (pageNumber - 1 === 0) setPageNumber(1);
    else setPageNumber(pageNumber - 1);

  }

  const onIsAvailableOnlyChange = async () => {

    setIsAvailableOnly(!isAvailableOnly);
    if (pageNumber == 1) getProducts();
    else setPageNumber(1);

  }

  if (!products || products.length <= 0) return <h1>No Products</h1>

  return ( 
    <div className={style.index}>
      <br /><br /><br /><br /><br /><br />
      <h1>Your Products</h1>
      <h3>Product Count: {products.length}</h3>
      <br /><br /><br />
      <div className={style.is_available_only_container}>
        <h4>Show Available Products Only</h4>
        <input type="checkbox" checked={isAvailableOnly} onChange={ onIsAvailableOnlyChange } />
      </div>
      <br />
      <div className={style.products_container}>
        <SimplePagination 
          pageNumber={pageNumber} 
          onPreviousButtonClicked={ decrementPageNumber }
          onNextButtonClicked={ incrementPageNumber } 
          data={ products } 
          type="product" 
        />
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
