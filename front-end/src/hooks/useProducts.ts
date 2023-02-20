import getAllProducts from "@/pages/api-calls/products/getAllProducts";
import { useEffect, useState } from "react";

const useProducts = () => {

  const [products, setProducts] = useState({});

  useEffect(() => {

    const getProducts = async () => {

      const result = await getAllProducts();
      setProducts(result);
  
    }
  
    getProducts();

  }, [])

  return products;

}
 
export default useProducts;