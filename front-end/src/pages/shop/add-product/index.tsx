import HomeLayout from "@/layouts/HomeLayout";
import style from "../../../styles/pages/shop/AddProductPage.module.scss";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import useMiddleware from "@/hooks/useMiddleware";
import RectangularInputField from "@/components/RectangularInputField/RectangularInputField";
import { useState } from "react";
import useProductCategories from "@/hooks/useProductCategoies";
import RectangularSelectField from "@/components/RectangularSelectField";
import RectangularButton from "@/components/RectangularButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import ImageInput from "@/components/ImageInput";
import { v4 } from "uuid";
import uploadFile from "@/utility/uploadFile";
import CreateProduct from "@/pages/api-calls/shops/product/CreateProduct";
import Product from "@/types/Product";

const AddProductPage = () => {
  
  const productCategories = useProductCategories();

  const [productName, setProductName] = useState('');
  const [productCategoryID, setProductCategoryID] = useState(1);
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productStock, setProductStock] = useState(0);
  const [productDetails, setProductDetails] = useState(''); 

  const [files, setFiles] = useState<any>([]);
  const [error, setError] = useState(false);

  const user:any = useAuth();
  const router = useRouter();
  if (!user) return <div className="">Loading...</div>
  if (useMiddleware(user, router, "Shop")) return;

  const handleFormSubmit = async (e:any) => {

    e.preventDefault();

    if (files.length === 0){
      alert('Image Must be Chosen');
      return
    }

    let countNullFiles = 0;
    files.map((file:any) => { if (!file) countNullFiles++; })
    if (countNullFiles > 0){
      alert('Files Cannot be Null');
      return;
    }

    const id = v4();
    
    await files.map(async (file:any) => {

      const link = await uploadFile(file, '/products');

      const product: Product = {
        product_id: id,
        shop_id: user.id,
        product_category_id: Number(productCategoryID),
        product_name: productName,
        product_image_url: link,
        product_description: productDescription,
        product_price: Number(productPrice),
        product_stock: Number(productStock),
        product_details: productDetails
      }
  
      const result = await CreateProduct(product);
      if (result === -1){
        alert('Product Creation Failed');
        setError(true);
        return;
      }  

    })

    
    if (!error) {
      alert('Product Created Successfully');
      setProductName('')
      setProductCategoryID(1)
      setProductDescription('')
      setProductPrice(0)
      setProductStock(0)
      setProductDetails('')
      setFiles([])
    }

  }

  const getContent = () => {
    
    return (
      <form className={style.index} onSubmit={handleFormSubmit}>
        <h1>Add Product</h1>
        <br />
        <div className={style.container}>
          <RectangularInputField required value={productName} onChange={setProductName} width={600} height={30} placeholder="Product Name" />
          <RectangularSelectField idAttributeName="product_category_id" optionAttributeName="product_category_name" value={productCategoryID} onChange={setProductCategoryID} data={productCategories} width={620} height={30} />
          <br />
          <h3>Add Image</h3>
          <div className={style.images_input_container}>
            <RectangularButton width={50} height={20} orange 
              content={<FontAwesomeIcon icon={faPlus} className={style.icon} />}
              onClick={() => { setFiles([...files, null]) }}
               />
            <RectangularButton width={50} height={20} orange 
              content={<FontAwesomeIcon icon={faFilter} className={style.icon} />}
              onClick={() => {
                const filteredArray = files.filter((_:any, index:any) => _ !== null);
                setFiles(filteredArray);
               }}
               />
            <RectangularButton width={50} height={20} orange 
              content={<FontAwesomeIcon icon={faTrash} className={style.icon} />}
              onClick={() => {
                setFiles([])
               }}
               />
          </div>
          {
            files.map((file:any) => {
              return (
                <ImageInput key={ v4() } 
                  value={file} 
                  onChange={(value:any) => { 
                    const temp = files;
                    temp[temp.indexOf(file)] = value; 
                    setFiles(temp); 
                  }}
                />
              )
            })  
          }
          <br />
          <RectangularInputField required value={productDescription} onChange={setProductDescription} width={600} height={100} area placeholder="Product Description" />
          <RectangularInputField required value={productPrice} onChange={setProductPrice} width={600} height={30} number placeholder="Product Price ($)" />
          <RectangularInputField required value={productStock} onChange={setProductStock} width={600} height={30} number placeholder="Product Stock" />
          <RectangularInputField required value={productDetails} onChange={setProductDetails} width={600} height={200} area placeholder="Product Details" />
          <button><RectangularButton orange width={620} height={30} content={<div>Add Product</div>} /></button>
        </div>
      </form>
    );

  }

  return <HomeLayout content={getContent()} user={user} />

}
 
export default AddProductPage;