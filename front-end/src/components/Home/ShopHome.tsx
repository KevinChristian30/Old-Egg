import Link from "next/link";
import style from "../../styles/components/Home/ShopHome.module.scss";
import SquareCard from "../Card/SquareCard";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import useProducts from "@/hooks/useProducts";
import SimplePagination from "../Pagination/SimplePagination";
import RectangularSelectField from "../RectangularSelectField";
import { useEffect, useState } from "react";
import useProductCategories from "@/hooks/useProductCategoies";
import getAllProducts from "@/pages/api-calls/products/getAllProducts";

interface ShopHomeProps{
  shopID: Number
}

const ShopHome = (props: ShopHomeProps) => {
  
  const { shopID } = props;
  
  const [appended, setAppended] = useState(false);
  const [productCategoryID, setProductCategoryID] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState<any>([]);
  const [pageNumber, setPageNumber] = useState(1);

  const products:any = useProducts(shopID, pageNumber);
  const productCategories:any = useProductCategories();

  const appendData = async () => {

    setPageNumber(pageNumber + 1);
    const toAppend = await getAllProducts(shopID, pageNumber);
    products.push(toAppend);

  }

  // useEffect(() => {

  //   if (!appended && Object.keys(productCategories).length > 0){

  //     productCategories.unshift({
  //       "ID": -1,
  //       "product_category_id": 0,
  //       "product_category_name": "All"
  //     })

  //     setAppended(true);

  //   }
    
  //   if (Object.keys(products).length != 0){

  //     setFilteredProducts([]);
      
  //     if (productCategoryID == 0) setFilteredProducts(products);
  //     else {
        
  //       products.map((product: any) => {

  //         if (product.product_category_id == productCategoryID) 
  //           setFilteredProducts([...filteredProducts, product]);
    
  //       })
        
        
  //     }

  //   }

  // }, [productCategoryID, products, productCategories]);

  return ( 
    <div className={style.index}>
      <br /><br /><br /><br /><br /><br />
      <h1>Your Products</h1>
      <h3>Product Count: {products.length}</h3>
      <br /><br />
      
      {/* <RectangularSelectField idAttributeName="product_category_id" optionAttributeName="product_category_name" value={productCategoryID} onChange={setProductCategoryID} data={productCategories} width={620} height={30} />
      <br /> */}

      <div className={style.products_container}>
        <SimplePagination appendData={appendData} data={products} itemsPerPage={50} type="product" />
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
