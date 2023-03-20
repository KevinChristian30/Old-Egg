import deleteReview from "@/pages/api-calls/review/deleteReview";
import style from "../../styles/components/Card/ReviewCard.module.scss";
import getCookie from "@/utility/getCookie";
import { useState } from "react";
import RectangularInputField from "../RectangularInputField/RectangularInputField";
import updateReview from "@/pages/api-calls/review/updateReview";

interface ReviewCardProps{
  review: any
}

const CustomerServiceReviewCard = (props: ReviewCardProps) => {

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
      <h2>User ID: { review.user_id }</h2>
      <h3>Rating: { review.rating }</h3>
      <h3>Details: { review.details }</h3>
    </div>
   );
}
 
export default CustomerServiceReviewCard;