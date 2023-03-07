import HomeLayout from "@/layouts/HomeLayout";
import style from "../../../styles/pages/SearchPage.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import RectangularInputField from "@/components/RectangularInputField/RectangularInputField";
import searchProducts from "@/pages/api-calls/products/searchProducts";
import SimplePagination from "@/components/Pagination/SimplePagination";
import useAuth from "@/hooks/useAuth";
import RectangularButton from "@/components/RectangularButton";
import createSearchQuery from "@/pages/api-calls/searchQuery/createSearchQuery";

const SearchPage = () => {
  
  const user:any = useAuth();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState<any>(router.query.keyword);
  const [innerKeyword, setInnerKeyword] = useState<any>("")
  const [pageNumber, setPageNumber] = useState(1);
  const [isAvailableOnly, setIsAvailableOnly] = useState(false);

  useEffect(() => {

    if (router.query.keyword) setKeyword(router.query.keyword);

  }, []);

  useEffect(() => {

    const getData = async () => {

      const response = await searchProducts(keyword, innerKeyword, pageNumber, isAvailableOnly);
      if (response !== -1){

        setProducts(response);

      }

    }

    setPageNumber(1);
    getData();


  }, [keyword, innerKeyword, isAvailableOnly]);

  useEffect(() => {

    const getData = async () => {

      setProducts([]);
      const response = await searchProducts(keyword, innerKeyword, pageNumber, isAvailableOnly);
      if (!response && pageNumber > 1) setPageNumber(pageNumber - 1);
      else setProducts(response);

    }

    getData();


  }, [pageNumber]);


  const incrementPage = () => {

    setPageNumber(pageNumber + 1);

  }

  const decrementPage = () => {

    if (pageNumber - 1 === 0) setPageNumber(1);
    else setPageNumber(pageNumber - 1);

  }

  const onIsAvailableOnlyChange = () => {

    setIsAvailableOnly(!isAvailableOnly);

  }

  const onSaveSearchQueryButtonClicked = async () => {

    let response: any;
    response = await createSearchQuery(user.email, keyword, innerKeyword, isAvailableOnly);

    if (response === -1) alert("Failed to Save Search Query");
    else if (response == -2) alert("You Already Have 10 Search Queries");
    else alert("Search Query Saved");

  }

  const getContent = () => {

    return (
      <div className={style.index}>
        <h1>Search</h1>
        <RectangularInputField
          value={keyword}
          onChange={setKeyword}
          width={400}
          height={34}
          placeholder="Keyword"
        />
        <br /><br /><br />
        {
          products ?
          <>
            <h2>Filters</h2>
            <br />
            <RectangularInputField 
              onChange={ setInnerKeyword }
              value={ innerKeyword }
              width={400}
              height={34}
              placeholder="Inner Keyword"
            />
            <br />
            <div className={style.is_available_only_container}>
              <h4>Show Available Products Only</h4>
              <input 
                type="checkbox" 
                checked={ isAvailableOnly } 
                onChange={ onIsAvailableOnlyChange } 
              />
            </div>
            <br /><br /><br />
            <h2>Search Results:</h2>
            <br />
            <SimplePagination
              data={products}
              type="customer-product"
              itemsPerRow={4}
              pageNumber={pageNumber}
              onNextButtonClicked={ incrementPage }
              onPreviousButtonClicked={ decrementPage }
            />
          </> :
          <h2>Item Not Found</h2>
        }
        <br /><br /><br />
        <RectangularButton
          content={<div>Save Search Query</div>}
          width={250}
          orange
          onClick={ onSaveSearchQueryButtonClicked }
        />
      </div>
    );

  }

  return ( <HomeLayout content={ getContent() } user={user} /> );
}
 
export default SearchPage;