import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../styles/components/Navbar/AddressSelector.module.scss"
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import WORDS from "./Words";
import axios from "axios";
import { useEffect, useState } from "react";

const AddressSelector = () => {

  const [city, setCity] = useState("");

  useEffect(() => {

    const getCity = async () => {

      const response = await axios.get("http://ip-api.com/json");
      setCity(response.data.city);

    }

    getCity();
    
  }, []);

  return ( 
    <div className={style.address_selector}>
      <div className={style.left}>
        <FontAwesomeIcon icon={faLocationDot} className={style.icon} />
      </div>
      {
        city === "" ? 
        (
          <div className={style.right}>
            <div className={style.top}>
              <p>Hello</p>
            </div>
            <div className={style.bottom}>
              <p>{WORDS.selectAddress}</p>
            </div>
          </div>
        ) : 
        (
          <div className={style.right}>
            <div className={style.top}>
              <p>Deliver</p>
            </div>
            <div className={style.bottom}>
              <p>{city}</p>
            </div>
          </div>
        )
      }
      
    </div>
   );
}
 
export default AddressSelector;