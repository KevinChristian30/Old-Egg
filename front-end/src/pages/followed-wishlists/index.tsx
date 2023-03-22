import useAuth from "@/hooks/useAuth";
import HomeLayout from "@/layouts/HomeLayout";
import style from "../../styles/pages/FollowedWishlistsPage.module.scss";
import { useEffect, useState } from "react";
import getFollowedWishlists from "../api-calls/wishlist/getFollowedWishlists";
import WishlistCard from "@/components/Card/WishlistCard";

const FollowedWishlistsPage = () => {

  const user: any = useAuth();

  const [wishlists, setWishlists] = useState<Array<any>>([]);

  useEffect(() => {

    const get = async () => {

      const response = await getFollowedWishlists(user.ID);
      if (response === -1) alert('Something Went Wrong');
      else {

        if (response) setWishlists(response);

      }

    }

    get();

  }, [user])
  
  const getContent = () => {

    return (
      <div className={style.index}>
        <h1>Followed Wishlists</h1>
        <br />
        <div className={style.wishlists_container}>
          {
            wishlists.map((wishlist: any) => {

              return (
                <WishlistCard wishlist={wishlist} key={wishlist.ID} unfollow />
              )

            })
          }
        </div>
      </div>
    );

  }

  return ( <HomeLayout content={ getContent() } user={ user } /> );
}
 
export default FollowedWishlistsPage;