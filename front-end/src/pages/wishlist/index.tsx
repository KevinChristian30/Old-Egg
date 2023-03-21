import useAuth from "@/hooks/useAuth";
import HomeLayout from "@/layouts/HomeLayout";
import style from "../../styles/pages/WishlistPage.module.scss";
import RectangularInputField from "@/components/RectangularInputField/RectangularInputField";
import { useEffect, useState } from "react";
import RectangularButton from "@/components/RectangularButton";
import createWishlist from "../api-calls/wishlist/createWishlist";
import getUserWishlistsWithDetails from "../api-calls/wishlist/getUserWishlistsWithDetails";
import updateWishlist from "../api-calls/wishlist/updateWishlist";
import { useRouter } from "next/router";

const WishListPage = () => {

  const user: any = useAuth();
  const router = useRouter();

  if (!user) return <div>You Aren't Logged In</div>

  const [wishlistName, setWishlistName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const [wishlists, setWishlists] = useState<any>([]);
  
  const [isUpdating, setIsUpdating] = useState(false);
  const [toUpdateWishlistName, setToUpdateWishlistName] = useState("");
  const [toUpdateWishlistID, setToUpdateWishlistID] = useState<any>();
  const [toUpdateIsPrivate, setToUpdateIsPrivate] = useState<any>(false);

  useEffect(() => {

    const get = async () => {

      const response = await getUserWishlistsWithDetails(user.ID);
      if (response === -1) alert('Something Went Wrong');
      else if (response === -2) alert('Save Failed');
      else {

        if (response) setWishlists(response);
        else setWishlists([]);

        console.log(response);

      }

    }

    get();

  }, [user]);

  const onCreateWishlistButtonClicked = async () => {

    const response = await createWishlist(user.ID, wishlistName, isPrivate);
    if (response == -1) alert('Something Went Wrong');
    else {

      alert('Wishlist Created');
      window.location.reload();

    }

  }

  const showUpdateModal = (wishlist: any) => {

    setIsUpdating(true);

    setToUpdateWishlistID(wishlist.header.ID);
    setToUpdateWishlistName(wishlist.header.wishlist_name);
    setToUpdateIsPrivate(wishlist.header.is_private);

  }

  const saveWishlist = async () => {

    const response = await updateWishlist(toUpdateWishlistID, toUpdateWishlistName, toUpdateIsPrivate);
    if (response === -1) alert('Something Went Wrong');
    else {

      alert('Wishlist Updated');
      window.location.reload();

    }

  }

  const navigateToDetails = (id: Number) => {

    router.push("/wishlist/detail/" + id);

  }

  const getContent = () => {

    return (
      <div className={style.index}>
        <h1>Your Wishlists</h1>
        <br /><br /><br />
        <div className={style.create_wishlist}>
          <h2>Create Wishlist</h2>
          <br /><br />
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
          <br />
          <RectangularButton 
            content={<div>Create Wishlist</div>}
            height={30}
            width={200}
            onClick={ onCreateWishlistButtonClicked }
          />
        </div>
        <br /><br /><br />
        <div className={style.wishlists}>
          <h2>Your Wishlists</h2>
          {
            wishlists?.map((wishlist: any) => {

              return (
                <div className={style.wishlist} key={wishlist.header.ID}>
                  <h3>Wishlist Name: { wishlist.header.wishlist_name }</h3>
                  <h3>Is Private: { wishlist.header.is_private ? "Private" : "Public" }</h3>
                  <br />
                  <h4>Number of Promotions: { wishlist.number_of_promotions }</h4>
                  <br /><br />
                  <div className={style.button_container}>
                    <RectangularButton
                      content={<div>Update</div>} 
                      height={30}
                      width={200}
                      onClick={ () => showUpdateModal(wishlist) }
                    />
                    <RectangularButton
                      content={<div>Details</div>} 
                      height={30}
                      width={200}
                      onClick={ () => navigateToDetails(wishlist.header.ID) }
                    />
                  </div>
                </div>
              )

            })
          }
        </div>
        <br /><br /><br />
        {
          isUpdating && (
            <div className={style.modal_container}>
              <div className={style.modal}>
                <h2>Update</h2>
                <div className={style.middle} >
                  <RectangularInputField
                    value={toUpdateWishlistName}
                    onChange={setToUpdateWishlistName}
                    width={400}
                    height={30}
                    placeholder="Wishlist Name"
                  /> 
                  <div className={style.line}>
                    <h4>Is Private</h4>
                    <input 
                      type="checkbox"
                      checked={toUpdateIsPrivate}
                      onChange={() => setToUpdateIsPrivate(!toUpdateIsPrivate)}
                    />
                  </div>
                </div>
                <div className={style.button_container}>
                  <RectangularButton
                    content={<div>Close</div>}
                    onClick={ () => { setIsUpdating(false) } } 
                    width={200}
                    height={30}
                  />
                  <RectangularButton
                    content={<div>Save</div>}
                    onClick={ saveWishlist } 
                    width={200}
                    height={30}
                  />
                </div>
                
              </div>
            </div>
          )
        }
      </div>
    );

  }

  return ( <HomeLayout content={ getContent() } user={ user } /> );
}
 
export default WishListPage;