import HomeLayout from "@/layouts/HomeLayout";
import style from "../../../styles/pages/products/ProductDetailsPage.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import getProductByID from "@/pages/api-calls/products/getProductByID";

const ProductDetailsPage = () => {

  const router = useRouter();
  const id = router.query.id;
  const [productID, setProductID] = useState<any>(id);
  const [product, setProduct] = useState<any>();
  const [productImageLink, setProductImageLink] = useState<any>();

  useEffect(() => {

    setProductID(router.query.id);

    const getProduct = async () => {

      const response = await getProductByID(productID);
      if (response === -1) return;
      
      setProduct(response);
      if (response.product_image_links) setProductImageLink(response.product_image_links[0]);

    }

    getProduct();

  }, [router.query.id]);

  const getContent = () => {

    return (
      <div className={style.index}>
        <img src={productImageLink} />
      </div>
    );

  }

  return ( <HomeLayout content={ getContent() } /> );
}
 
export default ProductDetailsPage;