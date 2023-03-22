import useAuth from "@/hooks/useAuth";
import HomeLayout from "@/layouts/HomeLayout";
import style from "../../../styles/pages/PublicWishlistDetailsPage.module.scss"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import getWishlistDetailsByID from "@/pages/api-calls/wishlist/getWishlistDetailsByID";
import getUserWishlists from "@/pages/api-calls/wishlist/getUserWishlists";
import RectangularButton from "@/components/RectangularButton";
import addItemToCart from "@/pages/api-calls/cart/addItemToCart";
import addWishlistItemsToCart from "@/pages/api-calls/wishlist/addWishlistItemsToCart";
import RectangularInputField from "@/components/RectangularInputField/RectangularInputField";
import createComment from "@/pages/api-calls/comment/createComment";
import getComments from "@/pages/api-calls/comment/getComments";

const PublicWishlistDetailsPage = () => {

  const user: any = useAuth();
  const router = useRouter();
  
  const [wishlistID, setWishlistID] = useState<any>();

  const [wishlistName, setWishlistName] = useState<any>("");
  const [wishlistDetails, setWishlistDetails] = useState<Array<any>>([]);

  const [newComment, setNewComment] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const [comments, setComments] = useState<Array<any>>([]);

  useEffect(() => {

    if (!router.isReady) return;
    const id:any = router.query.id;
    setWishlistID(id);

    const get = async () => {

      const response: any = await getWishlistDetailsByID(id);
      if (response === -1) alert('Something Went Wrong');
      else {

        setWishlistName(response[0].header.wishlist_name);
        setWishlistDetails(response);

      }

      const comments: any = await getComments(id);
      if (comments === -1) alert('Something Went Wrong');
      else {

        setComments(comments);

      }

    }

    get();

  }, [router.isReady]);

  const onAddItemsToWishlistButtonClicked = async () => {

    const response = await addWishlistItemsToCart(user.ID, wishlistID);
    if (response === -1) alert('Something Went Wrong');
    else {

      alert('Items Added to Cart');

    }

  }

  const onInsertCommentButtonClicked = async () => {

    const response = await createComment(user.ID, wishlistID, newComment, isAnonymous);
    if (response === -1) alert('Something Went Wrong');
    else {

      alert('Comment Inserted');
      window.location.reload();

    }

  }

  const getContent = () => {

    return (
      <div className={style.index}>
        <h1>Public Wishlist Details: {wishlistName}</h1>
        <br /><br />
        <div className={style.products_container}>
          {
            wishlistDetails.map((wishlist: any) => {

              if (wishlist.detail.ID != 0)
              return (
                <div className={style.product} key={wishlist.detail.ID}>
                  <h3>Product Name: {wishlist.product.product_name}</h3>
                  <br />
                  <h4>Product Price: ${wishlist.product.product_price}</h4>
                  <h4>Quantity: {wishlist.detail.quantity}</h4>
                </div>
              )

            })
          }
        </div>
        <br /><br /><br />
        <RectangularButton 
          content={<div>Add Items to Cart</div>}
          height={34}
          width={200}
          onClick={ onAddItemsToWishlistButtonClicked }
          orange
        />
        <br /><br /><br />
        <h1>Add Comment</h1>
        <br />
        <div className={style.add_comment_container}>
          <RectangularInputField 
            value={newComment}
            onChange={setNewComment}
            area
            width={400}
            height={100}
            placeholder="Add New Comment"
          />
          <div className={style.line}>
            <h4>Comment as Anonymous</h4>
            <input 
              type="checkbox" 
              checked={isAnonymous}
              onChange={() => { setIsAnonymous(!isAnonymous) }}
            />
          </div>
          <br />
          <RectangularButton 
            content={<div>Insert Comment</div>}
            height={30}
            width={200}
            onClick={ onInsertCommentButtonClicked }
            orange
          />
        </div>
        <br /><br /><br />
        <h1>Comments</h1>
        <br />
        <div className={style.comments_container}>
          {
            comments.map((comment: any) => {

              return (
                <div className={style.comment} key={comment.ID}>
                  <h3>User: {comment.is_anonymous ? "Anonymous" : comment.user_id}</h3>
                  <br />
                  <h4>Comment: {comment.comment}</h4>
                </div>
              )

            })
          }
        </div>
        <br />
      </div>
    );

  }

  return ( <HomeLayout content={ getContent() } user={ user } /> );
}
 
export default PublicWishlistDetailsPage;