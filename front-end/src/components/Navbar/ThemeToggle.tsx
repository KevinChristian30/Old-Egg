import { useEffect, useState } from "react";
import style from "../../styles/components/Navbar/ThemeToggle.module.scss";
import useTheme from "@/hooks/useTheme";

const ThemeToggle = () => {

  return ( 
    <div className={style.theme_toggle}>
      <input type="checkbox" onChange={ useTheme }/>
      <span className={style.slider}></span>
    </div>
   );

}
 
export default ThemeToggle;