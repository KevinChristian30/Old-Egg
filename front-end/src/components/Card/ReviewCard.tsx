import deleteReview from "@/pages/api-calls/review/deleteReview";
import style from "../../styles/components/Card/ReviewCard.module.scss";
import RectangularButton from "../RectangularButton";
import getCookie from "@/utility/getCookie";
import { useState } from "react";
import RectangularInputField from "../RectangularInputField/RectangularInputField";
import updateReview from "@/pages/api-calls/review/updateReview";

interface ReviewCardProps{
  review: any
}

const ReviewCard = (props: ReviewCardProps) => {

  const { review } = props;

  const [rating, setRating] = useState(review.rating);
  const [details, setDetails] = useState(review.details);

  const [isUpdating, setIsUpdating] = useState(false);

  const onDeleteButtonClicked = async () => {

    const response = await deleteReview(getCookie('Auth'), review.ID);
    if (response === -1) alert('Server Error');
    else {

      alert('Review Deleted');
      window.location.reload();

    }
    
  }
  
  const onSaveButtonClicked = async () => {

    const response = await updateReview(getCookie('Auth'), review.ID, rating, details);
    if (response === -1) alert('Server Error');
    else {

      alert('Review Updated');
      window.location.reload();

    }

  }

  return ( 
    <div className={style.review_card}>
      <h2>Order ID: { review.order_detail_id }</h2>
      <h3>Rating: { review.rating }</h3>
      <h3>Details: { review.details }</h3>
      <br /><br />
      <div className={style.button_contianer}>
        <RectangularButton 
          content={<div>Delete</div>}
          width={200}
          height={30}
          onClick={ onDeleteButtonClicked }
        />
        <RectangularButton 
          content={ isUpdating ? <div>Close</div> : <div>Update</div>}
          width={200}
          height={30}
          onClick={ () => setIsUpdating(!isUpdating) }
        />
      </div>
      {
        isUpdating && 
        <form className={style.update_form}>
          <br /><br />
          <RectangularInputField
            value={rating}
            onChange={setRating}
            width={500}
            height={30}
            placeholder="Rating"
            number
          />
          <RectangularInputField
            value={details}
            onChange={setDetails}
            width={500}
            height={100}
            placeholder="Details"
            area
          />
          <RectangularButton 
            content={<div>Save</div>}
            width={520}
            height={30}
            onClick={ onSaveButtonClicked }
          />
        </form>
      }
    </div>
   );
}
 
export default ReviewCard;