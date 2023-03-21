import createFollow from "@/pages/api-calls/follow/createFollow";
import style from "../../styles/components/Card/WishlistCard.module.scss";
import RectangularButton from "../RectangularButton";
import useAuth from "@/hooks/useAuth";

interface WishlistCardProps{
  wishlist: any
}

const WishlistCard = (props: WishlistCardProps) => {
  
  const { wishlist } = props;
  const user: any = useAuth();

  const onFollowButtonClicked = async () => {

    const response = await createFollow(user.ID, wishlist.ID);
    if (response === -1) alert('Something Went Wrong');
    else {

      alert('Wishlist Followed');
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
        <RectangularButton
          content={<div>Follow</div>} 
          width={80}
          height={24}
          onClick={ onFollowButtonClicked }
        />
        <RectangularButton
          content={<div>Duplicate</div>} 
          width={80}
          height={24}
        />
        <RectangularButton
          content={<div>Details</div>} 
          width={80}
          height={24}
        />
      </div>
    </div>
  );
}
 
export default WishlistCard;