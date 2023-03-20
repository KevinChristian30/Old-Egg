import useAuth from "@/hooks/useAuth";
import HomeLayout from "@/layouts/HomeLayout";
import style from "../../../../styles/pages/admin/management/AdminReviewPage.module.scss";
import { useEffect, useState } from "react";
import getCustomerServiceReview from "@/pages/api-calls/review/getCustomerServiceReview";
import CustomerServiceReviewCard from "@/components/Card/CustomerServiceReviewCard";

const AdminReviewPage = () => {
  
  const user:any = useAuth();

  const [reviews, setReviews] = useState<any>();

  useEffect(() => {
    
    const get = async () => {

      const response = await getCustomerServiceReview();
      if (response === -1) alert('Something Went Wrong');
      else {

        setReviews(response);

      }

    }

    get();

  }, [])

  const getContent = () => {

    return (
      <div className={style.index}>
        <h1>Customer Service Review</h1>
        <br />
        <div className={style.container}>
          {
            reviews?.map((review: any) => {

              return <CustomerServiceReviewCard review={review} />

            })
          }
        </div>
      </div>
    );

  }

  return ( <HomeLayout content={ getContent() } user={ user } /> );
}
 
export default AdminReviewPage;