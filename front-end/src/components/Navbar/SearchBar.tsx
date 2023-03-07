import style from "../../styles/components/Navbar/SearchBar.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useRouter } from "next/router";

const SearchBar = () => {

  const [keyword, setKeyword] = useState("");
  const router = useRouter();

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
   );
}
 
export default SearchBar;