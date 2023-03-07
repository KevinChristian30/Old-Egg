import getAllProducts from "@/pages/api-calls/products/getAllProducts";
import { useEffect, useState } from "react";

const useProducts = (shopID: Number, pageNumber: Number) => {

  const [products, setProducts] = useState({});

  useEffect(() => {

    const getProducts = async () => {

      const result = await getAllProducts(shopID, pageNumber, false);
      setProducts(result.products); 
  
    }
  
    getProducts();

  }, [])

  return products;

}
 
export default useProducts;