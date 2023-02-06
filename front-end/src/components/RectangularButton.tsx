import { ReactElement } from "react";
import style from "../styles/components/RectangularButton.module.scss";

interface RectangularButtonProps{
  content: ReactElement
}

const RectangularButton = (props: RectangularButtonProps) => {

  const content:ReactElement = props.content;

  return ( 
    <div className={style.rectangular_button}>
      { content }
    </div>
   );
}
 
export default RectangularButton;