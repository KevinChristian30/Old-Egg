import useProductCategories from "@/hooks/useProductCategoies";
import style from "../../../styles/components/Home/CustomerHome/CustomerHome.module.scss";
import ImageCarousel from "./ImageCarousel";
import CategoryCard from "@/components/Card/CategoryCard";
import Link from "next/link";
import SquareCard from "@/components/Card/SquareCard";
import { faComment, faGlobe, faHashtag, faListCheck, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import useAuth from "@/hooks/useAuth";
import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";
import getRecommendedProducts from "@/pages/api-calls/products/getRecommendedProducts";
import ProductCard from "@/components/Card/ProductCard";
import getPopularProductCategories from "@/pages/api-calls/productCategory/getPopularProductCategories";
import getTopShops from "@/pages/api-calls/shops/getTopShops";
import getPopularSearchQueries from "@/pages/api-calls/searchQuery/getPopularSearchQueries";
import RectangularInputField from "@/components/RectangularInputField/RectangularInputField";
import RectangularButton from "@/components/RectangularButton";
import subscribeToNewsletter from "@/pages/api-calls/user/subscribeToNewsletter";

const CustomerHome = (props: any) => {

  const user:any = useAuth();

  const categories = useProductCategories();
  const [batchNumber, setBatchNumber] = useState(1);

  const [recommendedProducts, setRecommendedProducts] = useState<any>([]);
  const [popularCategories, setPopularCategories] = useState<any>([]);
  const [featuredBrands, setFeaturedBrands] = useState<any>([]);
  const [top3Shops, setTop3Shops] = useState<any>([]);
  const [popularSearchQueries, setPopularSearchQueries] = useState<any>([]);

  const [email, setEmail] = useState("");

  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {

    function handleScroll() {

      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.scrollY;

      if (windowHeight + scrollPosition + 2000 >= documentHeight) setIsBottom(true);
      else setIsBottom(false);

    }

    window.addEventListener('scroll', handleScroll);

    return () => {

      window.removeEventListener('scroll', handleScroll);
    
    };

  }, []);

  useEffect(() => {

    const get = async () => {

      const recommendedResponse = await getRecommendedProducts(batchNumber);
      setBatchNumber(batchNumber + 1);
  
      if (recommendedResponse === -1) alert('Error While Fetching');
      else if (!recommendedResponse) return {}
      else {
  
        setRecommendedProducts([...recommendedProducts, ...recommendedResponse]);
  
      }

      const popularCategoriesResponse = await getPopularProductCategories();

      if (popularCategoriesResponse === -1) alert('Error While Fetching');
      else if (!popularCategoriesResponse) {}
      else {

        setPopularCategories(popularCategoriesResponse);

      }

      const featuredBrandsResponse = await getTopShops(10);
      if (featuredBrandsResponse === -1) alert('Error While Fetching');
      else if (!featuredBrandsResponse) {}
      else {

        setFeaturedBrands(featuredBrandsResponse);

      }

      const top3ShopsRersponse = await getTopShops(3);
      if (top3ShopsRersponse === -1) alert('Error While Fetching');
      else if (!top3ShopsRersponse) {}
      else {

        setTop3Shops(top3ShopsRersponse);

      }

      const popularSearchQueryResponse = await getPopularSearchQueries();
      if (popularSearchQueryResponse === -1) alert('Error While Fetching');
      else if (!popularSearchQueryResponse) {}
      else {

        setPopularSearchQueries(popularSearchQueryResponse);
        
      }
    
    }

    get();

  }, []);

  useEffect(() => {

    const get = async () => {

      const response = await getRecommendedProducts(batchNumber);
      setBatchNumber(batchNumber + 1);
  
      if (response === -1) alert('Error While Fetching');
      else if (!response) return;
      else {
  
        setRecommendedProducts([...recommendedProducts, ...response]);
  
      }
  
    }

    const handleInfiniteScroll = async () => {

      if (isBottom) await get();

    }

    handleInfiniteScroll();

  }, [isBottom]);

  if (!categories || categories.length == 0) return <div className="">Loading...</div>

  const send = async () => {

    const body = {
      from: "1",
      to: "2",
      message: "Test"
    }
    
    socket.send(JSON.stringify(body));

  }

  const onSubscribeToEmailAndNewsletterButtonClicked = async () => {

    const response:any = await subscribeToNewsletter(email);
    if (response === -1) alert('Server Error');
    else alert(response);

    setEmail("");

  }

  return (
    <div className={style.index}>
      <div className={style.carousel_container}>
        <ImageCarousel />
        <div className={style.categories_container}>
          {
            categories.map((category: any) => {
              return <CategoryCard key={category.ID} category={category} /> 
            })
          }
        </div>
      </div>
      <br /><br /><br></br><br /><br />
      <div className={style.recommended_products}>
        <h1>Product Recommendation</h1>
        <br /><br />
        <div className={style.container}>
          {
            recommendedProducts.map((product: any) => {

              return <ProductCard key={product.product_id} product={product} />

            })
          }
        </div>
      </div>
      <br /><br /><br></br><br /><br />
      {
        <div className={style.popular_categories}>
          <h1>Popular Categories</h1>
          <br /><br />
          <div className={style.popular_category_container}>
            {
              popularCategories.map((category: any) => {

                return (
                  <div className={style.popular_category} key={category.product_category_name}>
                    <h3>{category.product_category_name}</h3>
                  </div>
                );

              })
            }
          </div>
        </div>
      }
      <br /><br /><br></br><br /><br />
      <div className={style.featured_brands}>
        <h1>Featured Brands</h1>
        <br /><br />
        <Marquee speed={100} gradient={false}>
          {
            featuredBrands.map((brand: any) => {
              return (
                <div className={style.featured_brand} key={brand.shop_name}>
                  <img src={brand.display_picture_link ? brand.display_picture_link : ""} alt="No Image"></img>
                  <p>{brand.shop_name}</p>
                </div>
              )
            })
          }
        </Marquee>
      </div>
      <br /><br /><br></br><br /><br />
      <div className={style.top_3_shops}>
        <h1>Top 3 Shops</h1>
        <br /><br />
        <div className={style.container}>
          {
            top3Shops.map((shop: any) => {

              return (
                <div className={style.shop} key={shop.shop_name}>
                  <h2>{shop.shop_name}</h2>
                </div>
              )

            })
          }
        </div>
      </div>
      <br /><br /><br></br><br /><br />
      <div className={style.popular_search_queries}>
        <h1>Popular Search Queries</h1>
        <br /><br />
        <div className={style.container}>
          {
            popularSearchQueries.map((query: any) => {

              return (
                <div key={query.keyword} className={style.search_query}>
                  <h2>{query.keyword}</h2>
                  <h3>{query.count} Searches</h3>
                </div>
              )

            })
          }
        </div>
      </div>
      <br /><br /><br></br><br /><br />
      <div className={style.subscribe_to_email_and_newsletter}>
        <h1>Subscribe to Email and Newsletter</h1>
        <br /><br />
        <div className={style.container}>
          <RectangularInputField
            value={email}
            onChange={setEmail}
            height={34}
            width={300}
            placeholder="Email"
          />
          <RectangularButton
            onClick={ onSubscribeToEmailAndNewsletterButtonClicked }
            content={<div>Subscribe</div>}
            width={320}
            height={34}
            orange
          />
        </div>
      </div>
      <br /><br /><br></br><br /><br />
      {
        user.ID &&
        <div className={style.navigation_container}>
          <Link href="/voucher">
            <SquareCard text={"Voucher"} icon={faMoneyBill} />
          </Link>
          <Link href="/user/review">
            <SquareCard text={"Your Reviews"} icon={faComment} />
          </Link>
          <Link href="/wishlist">
            <SquareCard text={"My Wishlists"} icon={faListCheck} />
          </Link>
          <Link href="/public-wishlists">
            <SquareCard text={"Public Wishlists"} icon={faGlobe} />
          </Link>
          <Link href="/followed-wishlists">
            <SquareCard text={"Followed Lists"} icon={faHashtag} />
          </Link>
        </div>
      }
    </div> 
   );
   
}
 
export default CustomerHome;
