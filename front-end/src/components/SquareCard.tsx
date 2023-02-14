import { FontawesomeObject, IconProp } from "@fortawesome/fontawesome-svg-core";
import style from "../styles/components/SquareCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SquareCardProps{
  text: string
  icon: IconProp
}

const SquareCard = (props: SquareCardProps) => {
  
  const { text, icon } = props;

  return ( 
    <div className={style.square_card}>
      <p>{text}</p>
      <FontAwesomeIcon icon={icon} className={style.icon} />
    </div>
   );
}
 
export default SquareCard;