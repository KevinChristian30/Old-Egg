import useAuth from "@/hooks/useAuth";
import HomeLayout from "@/layouts/HomeLayout";
import style from "../../../styles/pages/user/UserReviewPage.module.scss";
import { useEffect, useState } from "react";
import ReviewCard from "@/components/Card/ReviewCard";
import getReviews from "@/pages/api-calls/review/getReviews";

const UserReviewPage = () => {

  const user:any = useAuth();

  const [reviews, setReviews] = useState<any>([]);

  useEffect(() => {

    const get = async () => {

      const response = await getReviews(user.ID);
      if (response === -1) alert('Server Error');
      else {

        setReviews(response);

      }

    } 

    get();
  
  }, [user]);

  const getContent = () => {

    return (
      <div className={style.index}>
        <h1>Your Reviews</h1>
        <br /><br /><br />
        <div className={style.reviews}>
          {
            reviews.map((review: any) => {
              return <ReviewCard key={review.ID} review={review} />
            })
          }
        </div>
      </div>
    );

  }

  return ( 
    <HomeLayout content={ getContent() } user={ user } />
   );
}
 
export default UserReviewPage;