import createFollow from "@/pages/api-calls/follow/createFollow";
import style from "../../styles/components/Card/WishlistCard.module.scss";
import RectangularButton from "../RectangularButton";
import useAuth from "@/hooks/useAuth";
import duplicateWishlist from "@/pages/api-calls/wishlist/duplicateWishlist";
import { useRouter } from "next/router";
import deleteFollow from "@/pages/api-calls/follow/deleteFollow";

interface WishlistCardProps{
  wishlist: any
  unfollow: boolean
}

const WishlistCard = (props: WishlistCardProps) => {
  
  const { wishlist, unfollow } = props;
  const user: any = useAuth();
  const router = useRouter();

  const onFollowButtonClicked = async () => {

    const response = await createFollow(user.ID, wishlist.ID);
    if (response === -1) alert('Something Went Wrong');
    else if (response === -2) alert('You Already Followed This Wishlist');
    else {

      alert('Wishlist Followed');
      window.location.reload();

    }

  }

  const onDuplicateButtonClicked = async () => {

    const response = await duplicateWishlist(user.ID, wishlist.ID);
    if (response !== 'Wishlist Duplicated') alert('Something Went Wrong');
    else {

      alert('Wishlist Duplicated');

    } 

  }

  const onDetailsButtonClicked = async () => {

    router.push('/public-wishlists/details/' + wishlist.ID);

  }

  const onUnfollowButtonClicked = async () => {

    const response = await deleteFollow(user.ID, wishlist.ID);
    if (response === -1) alert('Something Went Wrong');
    else {

      alert('Wishlist Unfollowed');
      window.location.reload();

    }

  }

  return ( 
    <div className={style.wishlist}>
      <div>
        <h3>Wishlist ID: {wishlist.ID}</h3>
        <h3>Wishlist Name: {wishlist.wishlist_name}</h3>
      </div>
      <div className={style.button_container}>
        {
          unfollow ? 
          <RectangularButton
            content={<div>Unfollow</div>} 
            width={80}
            height={24}
            onClick={ onUnfollowButtonClicked }
          /> : 
          <RectangularButton
            content={<div>Follow</div>} 
            width={80}
            height={24}
            onClick={ onFollowButtonClicked }
          />
        }
        <RectangularButton
          content={<div>Duplicate</div>} 
          width={80}
          height={24}
          onClick={ onDuplicateButtonClicked }
        />
        <RectangularButton
          content={<div>Details</div>} 
          width={80}
          height={24}
          onClick={ onDetailsButtonClicked }
        />
      </div>
    </div>
  );
}
 
export default WishlistCard;