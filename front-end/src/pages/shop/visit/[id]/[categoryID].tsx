import useAuth from "@/hooks/useAuth";
import HomeLayout from "@/layouts/HomeLayout";
import style from "../../../../styles/pages/products/ProductsByShopAndCategory.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProductsByShopAndCategory = () => {

  const user = useAuth();
  const router = useRouter();

  const [shopID, setShopID] = useState<any>();
  const [productCategoryID, setProductCategoryID] = useState<any>();

  useEffect(() => {

    setShopID(router.query.id);
    setProductCategoryID(router.query.categoryID);

  }, [router.query]);

  const getContent = () => {

    return (
      <div className={style.index}>
        <h1>{shopID}</h1>
        <h1>{productCategoryID}</h1>
      </div>
    );

  }

  return ( <HomeLayout content={ getContent() } user={user} /> );
}
 
export default ProductsByShopAndCategory;