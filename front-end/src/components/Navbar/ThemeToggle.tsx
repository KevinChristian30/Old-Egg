import { useEffect, useState } from "react";
import style from "../../styles/components/Navbar/ThemeToggle.module.scss";
import useTheme from "@/hooks/useTheme";
import getCookie from "@/utility/getCookie";

const ThemeToggle = () => {

  // const theme = getCookie("theme")

  return ( 
    <div className={style.theme_toggle}>
      <input type="checkbox" onChange={ useTheme }/>
      <span className={style.slider}></span>
    </div>
   );

}
 
export default ThemeToggle;