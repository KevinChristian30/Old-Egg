import style from "../../styles/components/Navbar/SearchBar.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  return ( 
    <div className={style.search_bar}>
      <input type="text" className={style.text_field} />
      <button className={style.search_button}>
        <FontAwesomeIcon icon={faMagnifyingGlass} 
        className={style.icon} />
      </button>
    </div>
   );
}
 
export default SearchBar;