import style from "../../styles/components/Navbar/ThemeToggle.module.scss";

const ThemeToggle = () => {
  return ( 
    <div className={style.theme_toggle}>
      <input type="checkbox" />
      <span className={style.slider}></span>
    </div>
   );
}
 
export default ThemeToggle;