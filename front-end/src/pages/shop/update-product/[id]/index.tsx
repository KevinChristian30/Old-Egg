import RectangularInputField from "@/components/RectangularInputField/RectangularInputField";
import RectangularSelectField from "@/components/RectangularSelectField";
import useAuth from "@/hooks/useAuth";
import useMiddleware from "@/hooks/useMiddleware";
import getProductByID from "@/pages/api-calls/products/getProductByID";
import Product from "@/types/Product";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import style from "../../../../styles/pages/shop/AddProductPage.module.scss"
import RectangularButton from "@/components/RectangularButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HomeLayout from "@/layouts/HomeLayout";
import updateProduct from "@/pages/api-calls/products/updateProduct";

const UpdateProduct = () => {

  const router = useRouter();
  const user:any = useAuth();
  const productID = router.query.id

  const [product, setProduct] = useState<Product>();

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productDetails, setProductDetails] = useState("");

  useEffect(() => {

    const getProduct = async () => {

      if (!productID) return;
      let id = ""
      for (let i = 0; i < productID.length; i++) id += productID[i];

      const response = await getProductByID(id);
      setProduct(response);
      setProductName(response.product_name);
      setProductPrice(response.product_price);
      setProductStock(response.product_stock);
      setProductDescription(response.product_description);
      setProductDetails(response.product_details);

      console.log(response);

    }

    getProduct();

  }, [productID])

  if (!user.role_id) return <div>Loading ...</div>  
  if (useMiddleware(user, router, "Shop")) return;
  if (!product) return <div>Loading...</div>

  const handleFormSubmit = (e: any) => {

    e.preventDefault();

    // Send Request to Save Product
    const response:any = updateProduct(product.product_id, productName, productDescription, productDetails, productPrice, productStock);

    if (response === -1) alert('Product Update Failed');
    else {

      alert('Product Changes Saved!');

    }

  }

  const getContent = () => {

    return (
      <form className={style.index} onSubmit={handleFormSubmit}>
        <br />
        <div className={style.container}>

          <h2>Product ID: {productID}</h2>
          <br />

          <h4>Product Name</h4>
          <RectangularInputField required value={productName} onChange={setProductName} width={600} height={30} placeholder="Product Name" />
          <br />

          <h4>Product Description</h4>
          <RectangularInputField required value={productDescription} onChange={setProductDescription} width={600} height={100} area placeholder="Product Description" />
          <br />

          <h4>Product Price</h4>
          <RectangularInputField required value={productPrice} onChange={setProductPrice} width={600} height={30} number placeholder="Product Price ($)" />
          <br />

          <h4>Product Stock</h4>
          <RectangularInputField required value={productStock} onChange={setProductStock} width={600} height={30} number placeholder="Product Stock" />
          <br />

          <h4>Product Details</h4>
          <RectangularInputField required value={productDetails} onChange={setProductDetails} width={600} height={200} area placeholder="Product Details" />
          <br /><br />

          <button>
            <RectangularButton orange width={620} height={30} content={<div>Save Product</div>} />
          </button>
          
        </div>
      </form>
    );

  }

  return ( 
    <HomeLayout content={ getContent() } user={user} />
   );
}
 
export default UpdateProduct;