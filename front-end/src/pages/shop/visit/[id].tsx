import HomeLayout from "@/layouts/HomeLayout";
import { useRouter } from "next/router";
import style from "../../../styles/pages/shop/ShopVisitPage.module.scss";
import { ReactNode, useEffect, useState } from "react";
import getShopByID from "@/pages/api-calls/shops/getShopByID";
import useAuth from "@/hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import getProductCategoryByShopID from "@/pages/api-calls/productCategory/getProductCategoryByShopID";
import ProductCategoryCard from "@/components/Card/ProductCategoryCard";
import SimplePagination from "@/components/Pagination/SimplePagination";
import getAllProducts from "@/pages/api-calls/products/getAllProducts";
import RectangularInputField from "@/components/RectangularInputField/RectangularInputField";
import getRecommendedProductsByShop from "@/pages/api-calls/products/getRecommendedProductsByShop";
import ProductCard from "@/components/Card/ProductCard";

interface Shop{
  shop_name: string
  shop_email: string
  shop_password: string
  status: string
  about_us: string
  display_picture_link: string
}

const ProductDetailsPage = () => {

  const user = useAuth();
  const router = useRouter();
  const id = router.query.id;
  
  const [sectionName, setSectionName] = useState("HOME");

  const [shopID, setShopID] = useState<any>(id);
  const [shop, setShop] = useState<Shop>();
  const [productCategories, setProductCategories] = useState([]);

  const [products, setProducts] = useState<any>();
  const [recommendedProducts, setRecommendedProducts] = useState<any>([]);
  const [productCount, setProductCount] = useState<ReactNode>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [isAvailableOnly, setIsAvailableOnly] = useState(false);
  const [keyword, setKeyword] = useState<any>("");
  const [innerKeyword, setInnerKeyword] = useState<any>("");

  useEffect(() => {

    setShopID(router.query.id);

    const getProduct = async () => {

      const response = await getShopByID(shopID);
      if (response === -1) return;
      setShop(response);

    }

    getProduct();

  }, [router.query.id, shopID]);

  useEffect(() => {

    const getProduct = async () => {

      const response = await getShopByID(shopID);
      if (response === -1) return;
      setShop(response);

    }

    const getRecommendation = async () => {

      const response = await getRecommendedProductsByShop(shopID);
      if (response === -1) return;
      setRecommendedProducts(response);

    }

    getProduct();
    getRecommendation();

  }, [shopID]);

  useEffect(() => {

    const getProductCategories = async () => {

      const response:any = await getProductCategoryByShopID(shopID);
      
      if (response === -1) alert('Fetch Failed');
      else {

        setProductCategories(response);

      }

    }

    getProductCategories();

  }, [productCategories]);

  useEffect(() => {

    const getProducts = async () => {

      const response = await getAllProducts(shopID, pageNumber, isAvailableOnly, keyword, innerKeyword);
      if (!response.products && pageNumber > 1) setPageNumber(pageNumber - 1);
      else setProducts(response.products);

      setProductCount(response.count)

    }

    getProducts();

  }, [shopID, pageNumber, keyword, innerKeyword]);

  const onProductCategoryCardClicked = (productCategoryID: Number) => {

    router.push('/shop/visit/' + shopID + '/' + productCategoryID)

  }

  const getContent = () => {

    if (shop?.status === 'Banned') {

      return (
        <div className={style.banned}>
          <FontAwesomeIcon icon={faBan} className={style.icon} />
          <h1>This Shop is Banned</h1>
        </div>
      );

    } 

    const getShopNavbar = () => {

      return (
        <div className={style.navbar}>
          <div className={style.navbar_item} 
              onClick={ () => { setSectionName('HOME') } } >
            { sectionName !== 'HOME' ? <h4>Store Home</h4> : <h4 className={style.isActive} >Store Home</h4> }
          </div>
          <div className={style.navbar_item}
              onClick={ () => { setSectionName('ALLPRODUCTS')}}>
            { sectionName !== 'ALLPRODUCTS' ? <h4>All Products</h4> : <h4 className={style.isActive} >All Products</h4> }
          </div>
          <div className={style.navbar_item}
              onClick={ () => { setSectionName('REVIEWS')}}>
            { sectionName !== 'REVIEWS' ? <h4>Reviews</h4> : <h4 className={style.isActive} >Reviews</h4> }
          </div>
          <div className={style.navbar_item}
              onClick={ () => { setSectionName('RETURNPOLICY')}}>
            { sectionName !== 'RETURNPOLICY' ? <h4>Return Policy</h4 > : <h4 className={style.isActive} >Return Policy</h4> }
          </div>
          <div className={style.navbar_item}
            onClick={ () => { setSectionName('ABOUTUS')}}>
            { sectionName !== 'ABOUTUS' ? <h4>About Us</h4> : <h4 className={style.isActive} >About Us</h4> }
          </div>
        </div>
      );

    }

    const getShopHome = () => {

      return (
        <div className={style.home}>
          <div className={style.banner_container}>
            <img
              className={style.display_picture} 
              src={shop?.display_picture_link} alt="" 
            />
          </div>
          <div className={style.shop_by_categories_container}>
            <h2>SHOP BY CATEGORY</h2>
            <br />
            <div className={style.product_categories_slider}>
              {
                productCategories?.map((productCategory: any) => {

                  return (
                    <div key={productCategory.ID}  
                        onClick={ () => onProductCategoryCardClicked(productCategory.ID) }
                      >
                      <ProductCategoryCard 
                        productCategory={productCategory} 
                        />
                    </div>
                  )

                })
              }
            </div>
          </div>
          <div className={style.recommended_products_container}>
            <h2>Recommended For You</h2>
            <br />
            <div className={style.recommended_products}>
              {
                recommendedProducts?.map((product: any) => {

                  return <ProductCard 
                      product={product}
                      key={product.product_id}
                    />

                })
              }
            </div>
          </div>
        </div>
      )

    }

    const getAllProductsPage = () => {

      const getProducts = async () => {

        setProducts([]);
        const data = await getAllProducts(shopID, pageNumber, !isAvailableOnly, keyword, innerKeyword);
        if (!data.products && pageNumber > 1) setPageNumber(pageNumber - 1);
        else setProducts(data.products);

        setProductCount(data.count);

      }

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
        <div>
        {
          <div className={style.get_all_products_page}>
            <h1>Your Products</h1>
            <h3>Product Count: { productCount }</h3>
            <br /><br />
            <div className={ style.keyword_container }>
              <RectangularInputField
                value={keyword}
                onChange={setKeyword}
                width={400}
                height={34}
                placeholder="Keyword"
              />
              <RectangularInputField
                value={innerKeyword}
                onChange={setInnerKeyword}
                width={400}
                height={34}
                placeholder="Inner Keyword"
              />
            </div>
            <br /><br />
            <div className={style.is_available_only_container}>
              <h4>Show Available Products Only</h4>
              <input type="checkbox" checked={isAvailableOnly} onChange={ onIsAvailableOnlyChange } />
            </div>
            <div className={style.products_container}>
              {
                products?.length > 0 && 
                <SimplePagination 
                  pageNumber={ pageNumber } 
                  onPreviousButtonClicked={ decrementPageNumber }
                  onNextButtonClicked={ incrementPageNumber } 
                  data={ products } 
                  type="customer-product" 
                />
              }
            </div>
          </div>
        }
        </div>
      );

    }

    const getAboutUsPage = () => {

      return (
        <div className={style.about_us_page}>
          <h1>About Us</h1>
          <br /><br />
          <h3>{ shop?.about_us }</h3>
        </div>
      );

    }

    return (
      <div className={style.index}>
        { getShopNavbar() }
        { sectionName === "HOME" && getShopHome() }
        { sectionName === "ALLPRODUCTS" && getAllProductsPage() }
        { sectionName === "ABOUTUS" && getAboutUsPage() }
      </div>  
    );

  }

  return ( <HomeLayout content={ getContent() } user={user} /> );
}
 
export default ProductDetailsPage;