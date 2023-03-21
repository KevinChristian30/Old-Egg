import useAuth from "@/hooks/useAuth";
import HomeLayout from "@/layouts/HomeLayout";
import style from "../../styles/pages/PublicWishlistsPage.module.scss";
import { useEffect, useState } from "react";
import getPublicWishlists from "../api-calls/wishlist/getPublicWishlists";
import getWishlistDetailsByID from "../api-calls/wishlist/getWishlistDetailsByID";
import SimplePagination from "@/components/Pagination/SimplePagination";

// export const getStaticPaths = async () => {

//   const response = await getPublicWishlists();

//   const paths = response.map((wishlist: any) => {

//     return {
//       params: {
//         id: wishlist.ID.toString()
//       }
//     }

//   })
  
//   return {
//     paths: paths,
//     fallback: false
//   }

// }

// export const getStaticProps = async (context: any) => {

//   const id = context.params.id;
//   const response = await getWishlistDetailsByID(id);

//   return {
//     props: {
//       wishlist: response
//     }
//   }

// }

const PublicWishlistsPage = () => {

  const user: any = useAuth();

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  const [wishlists, setWishlists] = useState<Array<any>>([]);

  useEffect(() => {

    const get = async () => {

      const response = await getPublicWishlists(pageNumber, pageSize);
      if (response === -1) alert('Something Went Wrong');
      else if (response.length === 0) setPageNumber(pageNumber - 1);
      else {

        setWishlists(response);

      }

    }

    get();

  }, [pageNumber, pageSize]);

  const incrementPage = () => {

    setPageNumber(pageNumber + 1);

  }

  const decrementPage = () => {

    if (pageNumber > 1) setPageNumber(pageNumber - 1);

  }

  const getContent = () => {

    return (
      <div className={style.index}>
        <h1>Public Wishlists</h1>
        <br />
        <div className={style.line}>
          <h4>Page Size</h4>
          <select value={pageSize} onChange={(e:any) => setPageSize(e.target.value)}>
            <option value={15}>15</option>
            <option value={30}>30</option>
            <option value={60}>60</option>
            <option value={90}>90</option>
          </select>
        </div>
        <br />
        <div className={style.wishlist_container}>
          <SimplePagination 
            data={wishlists}
            pageNumber={pageNumber}
            onNextButtonClicked={ incrementPage }
            onPreviousButtonClicked={ decrementPage }
            type="wishlist"
            itemsPerRow={3}
          />
        </div>
      </div>
    );

  }

  return ( <HomeLayout content={ getContent() } user={ user } /> );
}
 
export default PublicWishlistsPage;
