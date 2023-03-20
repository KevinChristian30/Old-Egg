import HomeLayout from "@/layouts/HomeLayout";
import style from "../../../styles/pages/shop/ShopReviewPage.module.scss";
import { useEffect, useState } from "react";
import RectangularInputField from "@/components/RectangularInputField/RectangularInputField";
import ShopReviewCard from "@/components/Card/ShopReviewCard";
import useAuth from "@/hooks/useAuth";
import getReviewsByShop from "@/pages/api-calls/review/getReviewsByShop";
import ReviewCard from "@/components/Card/ReviewCard";

const ShopReviewPage = () => {

  const user: any = useAuth();
  const [shopID, setShopID] = useState<any>();

  const [reviews, setReviews] = useState<any>([]);
  const [reviewDate, setReviewDate] = useState<any>([]);
  const [reviewKeyword, setReviewKeyword] = useState<any>([]);
  const [reviewStatistics, setReviewStatistics] = useState<any>({});

  useEffect(() => {

    setShopID(user.id);

  }, [user]);

  useEffect(() => {

    const getReviews = async () => {

      const response:any = await getReviewsByShop(shopID, reviewDate, reviewKeyword);
      if (response === -1) return;
      setReviews(response);

      let stat:any = {};
      stat.numberOfRating = 0;
      stat.averageRating = 0;
      stat.oneStar = 0;
      stat.twoStar = 0;
      stat.threeStar = 0;
      stat.fourStar = 0;
      stat.fiveStar = 0;

      response?.map((review: any) => {

        stat.numberOfRating++;
        if (review.rating) stat.averageRating += review.rating;

        if (review.rating == 1) stat.oneStar++;
        else if (review.rating == 2) stat.twoStar++;
        else if (review.rating == 3) stat.threeStar++;
        else if (review.rating == 4) stat.fourStar++;
        else if (review.rating == 5) stat.fiveStar++;

      })

      if (stat.numberOfRating != 0) 
        stat.averageRating = Number(stat.averageRating) / Number(stat.numberOfRating);

      setReviewStatistics(stat);

    }

    getReviews();

  }, [shopID, reviewDate, reviewKeyword])

  const getContent = () => {

    return (
      <div className={style.index}>
        <h1>Review Statistics</h1>
        <br />
        <h3>Number of Ratings: { reviewStatistics?.numberOfRating }</h3>
        <h3>Average Rating: { reviewStatistics?.averageRating }</h3>
        <br />
        <h3>1 Star: { reviewStatistics?.oneStar }</h3>
        <h3>2 Star: { reviewStatistics?.twoStar }</h3>
        <h3>3 Star: { reviewStatistics?.threeStar }</h3>
        <h3>4 Star: { reviewStatistics?.fourStar }</h3>
        <h3>5 Star: { reviewStatistics?.fiveStar }</h3>
        <br />
        <h1>Filter Reviews</h1>
        <br />
        <input 
          type="date" 
          value={reviewDate}
          onChange={ (e: any) => setReviewDate(e.target.value) }
        />
        <br /><br />
        <RectangularInputField 
          value={ reviewKeyword }
          onChange={ setReviewKeyword }
          width={300}
          height={30}
          placeholder="Keyword"
        />
        <br /><br /><br />
        <div className={style.review_container}>
          {
            reviews?.map((review: any) => {

              return (
                <div className={style.review}>
                   <h2>Order ID: { review.order_detail_id }</h2>
                    <h3>Rating: { review.rating }</h3>
                    <h3>Details: { review.details }</h3>
                    <h3>Review Date: { review.review_date }</h3>
                </div>
              )

            })
          }
        </div>
      </div>
    );

  }

  return ( <HomeLayout content={ getContent() } user={ user } /> );
}
 
export default ShopReviewPage;