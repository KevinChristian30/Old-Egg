import style from "../../styles/components/Navbar/SearchBar.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import searchProducts from "@/pages/api-calls/products/searchProducts";

const SearchBar = () => {

  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const [products, setProducts] = useState<any>([]);

  useEffect(() => {

    const getData = async () => {

      setProducts([]);
      if (keyword == "") return;

      const response = await searchProducts(keyword, "", 1, false);
      if (!response) return;

      if (response !== -1){

        let temp = []
        for (let i = 0; i < 4; i++){
        
          if (response[i]){

            temp.push(response[i]);

          } else break;
        
        }
        setProducts(temp);

      }

    }

    getData();


  }, [keyword]);

  const onSearchBarChange = (e: any) => {

    setKeyword(e.target.value);

  }

  const onSearchButtonClicked = () => {

    if (keyword != "") { 
    
      router.push('/search/' +  keyword); 

    }
    
  } 

  return ( 
    <div className={style.search_bar}>
      <div className={style.top}>
        <input 
          type="text" 
          className={ style.text_field } 
          value={ keyword }
          onChange={ onSearchBarChange }
          placeholder="Keyword"
        />
        <button 
          className={style.search_button} 
          type="button"
          onClick={ onSearchButtonClicked } >
            <FontAwesomeIcon icon={faMagnifyingGlass} 
              className={style.icon} 
            />
        </button>
      </div>
      <div className={style.bottom}>
        {
          products.length > 0 &&
          <div className={style.search_results}>
            {
              products.map((product: any) => {
                return <div 
                  onClick={ () => { setKeyword(product.product_name); setProducts([]); } } 
                  className={style.word}>{product.product_name}
                </div>
              })
            }
          </div>
        }
      </div>
    </div>
   );
}
 
export default SearchBar;