import Link from "next/link";
import style from "../../styles/components/Home/ShopHome.module.scss";
import SquareCard from "../Card/SquareCard";
import { faComments, faKey, faPenToSquare, faPlus, faTruck } from "@fortawesome/free-solid-svg-icons";
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
  const [productCount, setProductCount] = useState<any>();

  const [isAvailableOnly, setIsAvailableOnly] = useState(false);

  const getProducts = async () => {

    setProducts([]);
    const data = await getAllProducts(shopID, pageNumber, !isAvailableOnly);
    if (!data.products) setPageNumber(pageNumber - 1);
    else setProducts(data.products);

    setProductCount(data.count);

  }

  useEffect(() => {

    const initialFetch = async () => {

      setProducts([]);
      const data = await getAllProducts(shopID, pageNumber, isAvailableOnly);
      if (!data.products && pageNumber > 1) setPageNumber(pageNumber - 1);
      else setProducts(data.products);

      setProductCount(data.count);

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

  return ( 
    <div className={style.index}>
      <br /><br /><br /><br /><br /><br />
      <h1>Your Products</h1>
      <h3>Product Count: { productCount }</h3>
      <br /><br />
      <div className={style.is_available_only_container}>
        <h4>Show Available Products Only</h4>
        <input type="checkbox" checked={isAvailableOnly} onChange={ onIsAvailableOnlyChange } />
      </div>
      <br />
      <div className={style.products_container}>
        {
          products.length > 0 && 
          <SimplePagination 
            pageNumber={ pageNumber } 
            onPreviousButtonClicked={ decrementPageNumber }
            onNextButtonClicked={ incrementPageNumber } 
            data={ products } 
            type="customer-product" 
          />
        }
      </div>
      <br /><br /><br /><br />
      <h1>Manage Your Shop</h1>
      <br /><br />
      <div className={style.container}>
        <Link href="/shop/add-product">
          <SquareCard text="Add Product" icon={faPlus} />
        </Link>
        <Link href="/shop/edit-shop-info">
          <SquareCard text="Edit Shop Info" icon={faPenToSquare} />
        </Link>
        <Link href="/shop/reviews">
          <SquareCard text="Reviews" icon={faComments} />
        </Link>
        <Link href="/shop/change-password">
          <SquareCard text="Password" icon={faKey} />
        </Link>
        <Link href="/shop/orders">
          <SquareCard text="Orders" icon={faTruck} />
        </Link>
      </div>
      <br /><br /><br /><br /><br /><br />
    </div>
   );

}
 
export default ShopHome;
