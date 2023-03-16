import incrementHelpfulTag from "@/pages/api-calls/review/incrementHelpfulTag";
import style from "../../styles/components/Card/ShopReviewCard.module.scss";
import RectangularButton from "../RectangularButton";
import incrementUnhelpfulTag from "@/pages/api-calls/review/incrementUnhelpfulTag";

interface ShopReviewCardProps{
  review: any
}

const ShopReviewCard = (props: ShopReviewCardProps) => {
  
  const { review } = props;

  const incrementHelpfulCount = async () => {

    await incrementHelpfulTag(review.review_id);
    alert('Review Tagged As Helpful')
    
  } 
  
  const incrementUnhelpfulCount = async () => {
    
    await incrementUnhelpfulTag(review.review_id)
    alert('Review Tagged As Helpful')

  }

  return ( 
    <div className={style.shop_review_card}>
      <h3>{ review.product_name }</h3>
      <br />
      <h4>User: { review.first_name }</h4>
      <h4>Rating: { review.rating }</h4>
      <h4>Details: { review.details }</h4>
      <br /><br />
      <div className={style.button_container}>
        <RectangularButton
          content={<div>Tag As Helpful</div>}
          width={200}
          height={30}
          onClick={ incrementHelpfulCount }
        />
        <RectangularButton
          content={<div>Tag As Unhelpful</div>}
          width={200}
          height={30}
          onClick={ incrementUnhelpfulCount }
        />
      </div>
    </div>
   );

}
 
export default ShopReviewCard;