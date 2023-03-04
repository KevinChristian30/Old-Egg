import getAllProductCategories from "@/pages/api-calls/shops/product-categories/GetAllProductCategories";
import { useEffect, useState } from "react";

const useProductCategories = () => {

  const [productCategories, setProductCategories] = useState([]);

  useEffect(() => {

    const getProductCategories = async () => {

      const result = await getAllProductCategories();
      setProductCategories(result);
  
    }
  
    getProductCategories();

  }, [])

  return productCategories;

}

export default useProductCategories;