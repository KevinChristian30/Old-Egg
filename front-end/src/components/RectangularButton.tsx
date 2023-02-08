import { ReactElement } from "react";
import style from "../styles/components/RectangularButton.module.scss";

interface RectangularButtonProps{
  content: ReactElement
  orange?: boolean
}

const RectangularButton = (props: RectangularButtonProps) => {

  const content:ReactElement = props.content;
  const orange = props.orange;

  if (orange) return (
    <div className={`${style["rectangular_button"]} ${style["orange_button"]}`}>
      { content }
    </div>
  );

  return ( 
    <div className={style.rectangular_button}>
      { content }
    </div>
   );
}
 
export default RectangularButton;