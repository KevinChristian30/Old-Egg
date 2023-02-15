import { MouseEventHandler, ReactElement } from "react";
import style from "../styles/components/RectangularButton.module.scss";

interface RectangularButtonProps{
  content: ReactElement
  onClick?: MouseEventHandler
  width?: number | 330
  height?: number | 44
  
  orange?: boolean
}

const RectangularButton = (props: RectangularButtonProps) => {

  const content:ReactElement = props.content;
  const orange = props.orange;
  const width = props.width;
  const height = props.height

  if (orange) return (
    <div className={`${style["rectangular_button"]} ${style["orange_button"]}`} onClick={props.onClick} style={{width: width, height: height}}>
      { content }
    </div>
  );

  return ( 
    <div className={style.rectangular_button} style={{width: width, height: height}}>
      { content }
    </div>
   );
}
 
export default RectangularButton;