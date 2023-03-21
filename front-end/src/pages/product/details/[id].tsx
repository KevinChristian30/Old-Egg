import HomeLayout from "@/layouts/HomeLayout";
import style from "../../../styles/pages/products/ProductDetailsPage.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import getProductByID from "@/pages/api-calls/products/getProductByID";
import RectangularButton from "@/components/RectangularButton";
import useAuth from "@/hooks/useAuth";
import RectangularInputField from "@/components/RectangularInputField/RectangularInputField";
import addItemToCart from "@/pages/api-calls/cart/addItemToCart";

interface Product{
  product_category_id: string
  product_description: string
  product_details: string
  product_id: string
  product_image_links: string[]
  product_name: string
  product_price: number
  product_stock: number
  shop_id: number
}

const ProductDetailsPage = () => {

  const user:any = useAuth();
  const router = useRouter();
  const id = router.query.id;
  const [productID, setProductID] = useState<any>(id);
  const [product, setProduct] = useState<Product>();

  const [quantity, setQuantity] = useState(0);

  const [isBanned, setIsBanned] = useState(false);

  useEffect(() => {

    if (!router.isReady) return;

    const id: any = router.query.id;
    setProductID(id);

    const getProduct = async () => {

      const response = await getProductByID(id);
      if (response === -1) return;    
      else if (response === -2) {

        setIsBanned(true);

      }   
      setProduct(response);

    } 

    getProduct();

  }, [router.isReady]);

  const onVisitStoreButtonClicked = () => {

    router.push('/shop/visit/' + product?.shop_id);

  }

  const onAddToCartClicked = async () => {

    if (!product) return;

    if (quantity > product?.product_stock) alert("Product Stock isn't Enough");
    else if (quantity <= 0) alert("Product Quantity Can't be 0");
    else {

      const response = await addItemToCart(user.ID, productID, quantity);
      if (response === -1) alert("Server Error");
      else if (response === 'Item Added to Cart Successfully'){

        alert('Item Added to Cart');
        router.back();

      }

    }

    

  }

  const onAddToWishlishButtonClicked = async () => {



  }

  const getContent = () => {

    return (
      <>
      {
        !isBanned ? product &&
        <div className={style.index}>
         <div className={style.left}>
          <img src={product?.product_image_links ? product?.product_image_links[0] : ""}
            className={style.image}
          />
         </div>
         <div className={style.right}>
           <div className={style.top}>
             <h1>{product.product_name}</h1>
             <h4>Description: {product.product_description}</h4>
             <h4>Details: {product.product_details}</h4>
             <h4>Price: {product.product_price}</h4>
             {
                product.product_stock <= 0 ? 
                  <b><h4 style={{color: "red"}}>Out of Stock</h4></b> :
                  <h4>Stock: {product?.product_stock}</h4>
             }
           </div>
           <div className={style.bottom}>
             <div className={style.line}>
               <RectangularButton
                 content={ <div>Visit Store</div> }
                 width={200}
                 height={34}
                 onClick={ onVisitStoreButtonClicked }
               />
             </div>
             <div className={style.line}>
               <RectangularInputField
                 value={ quantity }
                 onChange={ setQuantity }
                 height={34}
                 placeholder="Quantity"
                 number
               />
               <RectangularButton
                 content={ <div>Add to Cart</div> }
                 width={200}
                 height={34}
                 onClick={ onAddToCartClicked }
               />
             </div> 
             <div className={style.line}>
               <RectangularButton
                 content={ <div>Add to Wishlist</div> }
                 width={200}
                 height={34}
                 onClick={ onAddToWishlishButtonClicked }
               />
             </div> 
           </div>
         </div>
       </div> : <h1>Shop is Banned</h1>
      }
      </>
    );

  }

  return ( <HomeLayout content={ getContent() } user={user} /> );
}
 
export default ProductDetailsPage;