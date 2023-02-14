import { useEffect, useState } from "react";
import style from "../../styles/components/Navbar/ThemeToggle.module.scss";
import useTheme from "@/hooks/useTheme";
import getCookie from "@/utility/getCookie";

const ThemeToggle = () => {

  const [checked, setChecked] = useState(true);

  useEffect(() => {

    let theme = getCookie("theme")
    if (theme === "light"){
      setChecked(false)
    } else {
      setChecked(true)
    }

  }, [])

  const change = () => {
  
    useTheme()
    setChecked(!checked)
  
  }

  return ( 
    <div className={style.theme_toggle}>
      <input type="checkbox" onChange={ change } checked={checked}/>
      <span className={style.slider}></span>
    </div>
   );

}
 
export default ThemeToggle;