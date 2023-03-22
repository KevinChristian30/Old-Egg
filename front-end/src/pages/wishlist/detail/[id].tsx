import useAuth from "@/hooks/useAuth";
import HomeLayout from "@/layouts/HomeLayout";
import style from "../../../styles/pages/WishlistDetailPage.module.scss";
import { useEffect, useState } from "react";
import getWishlistDetailsByID from "@/pages/api-calls/wishlist/getWishlistDetailsByID";
import { useRouter } from "next/router";
import RectangularInputField from "@/components/RectangularInputField/RectangularInputField";
import RectangularButton from "@/components/RectangularButton";
import updateWishlist from "@/pages/api-calls/wishlist/updateWishlist";
import WishlistItemCard from "@/components/Card/WishlistItemCard";
import saveNote from "@/pages/api-calls/wishlist/saveNote";
import addWishlistItemsToCart from "@/pages/api-calls/wishlist/addWishlistItemsToCart";

const WishlistDetailPage = () => {

  const user: any = useAuth();
  const router = useRouter();

  const [note, setNote] = useState("");

  const [wishlistID, setWishlistID] = useState<any>();

  const [wishlistDetails, setWishlistDetails] = useState<Array<any>>([]);

  const [wishlistName, setWishlistName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  useEffect(() => {

    if (!router.isReady) return;

    const get = async () => {

      const id: any = router.query.id;
      setWishlistID(id);

      const response = await getWishlistDetailsByID(id); 
      if (response === -1) alert('Something Went Wrong');
      else {

        console.log(response);

        if (response) {

          setWishlistName(response[0].header.wishlist_name);
          setIsPrivate(response[0].header.is_private);
          setNote(response[0].header.note);
          setWishlistDetails(response);

        }

      }

    }

    get();
    
  }, [router.isReady]);

  const onSaveButtonClicked = async () => {

    const response = await updateWishlist(wishlistID, wishlistName, isPrivate);
    if (response !== 'Wishlist Updated') alert('Something Went Wrong');
    else {

      alert('Wishlist Updated');
      window.location.reload();

    }

  }

  const onSaveNoteButtonClicked = async () => {

    const response = await saveNote(wishlistID, note);
    if (response === -1) alert('Something Went Wrong');
    else {

      alert('Note Saved');
      window.location.reload();

    }

  }

  const addItemsToCart = async () => {

    const response = await addWishlistItemsToCart(user.ID, wishlistID);
    if (response === -1) alert('Something Went Wrong');
    else {

      alert('Items Added to Cart');
      window.location.reload();

    }

  }

  const getContent = () => {

    return (
      <div className={style.index}>
        <h1>Wishlist Detail</h1>
        <br />
        <div className={style.wishlist_header}>
          <RectangularInputField
            value={wishlistName}
            onChange={setWishlistName}
            width={400}
            height={30}
            placeholder="Wishlist Name"
          />
          <br />
          <div className={style.line}>
            <h4>Is Private</h4>
            <input 
              type="checkbox" 
              checked={isPrivate}
              onChange={() => setIsPrivate(!isPrivate)}
            />
          </div>
          <br />
          <RectangularButton  
            content={<div>Save</div>}
            width={200}
            height={30}
            orange
            onClick={ onSaveButtonClicked }
          />
        </div>
        <br /><br /><br />
        <div className={style.wishlist_products}>
          {
            wishlistDetails.map((wishlist: any) => {

              if (wishlist.detail.ID != 0)
              return ( <WishlistItemCard wishlist={wishlist} /> )

            })
          }
        </div>
        <br /><br /><br />
        <div className={style.right}>
          <h2>Wishlist Note</h2>
          <br />
          <RectangularInputField 
            value={note}
            onChange={setNote}
            height={100}
            width={400}
            placeholder="Note"
            area
          />
          <RectangularButton
            content={<div>Save Note</div>} 
            width={420}
            height={24}
            onClick={ onSaveNoteButtonClicked }
            orange
          />
        </div>
        <br /><br /><br />
        <RectangularButton
          content={<div>Add Wishlist Items to Cart</div>} 
          height={34}
          orange
          onClick={ addItemsToCart }
        />
      </div>
    );

  }

  return ( <HomeLayout content={ getContent() } user={ user } /> );
}
 
export default WishlistDetailPage;