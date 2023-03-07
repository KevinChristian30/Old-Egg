import HomeLayout from "@/layouts/HomeLayout";
import style from "../../../../../styles/pages/admin/management/shops/ViewShopPage.module.scss";
import useAuth from "@/hooks/useAuth";
import useMiddleware from "@/hooks/useMiddleware";
import { useRouter } from "next/router";
import getAllShops from "@/pages/api-calls/shops/GetAllShops";
import Shop from "@/types/Shop";
import ShopCard from "@/components/Card/ShopCard";
import { use, useEffect, useState } from "react";
import SimplePagination from "@/components/Pagination/SimplePagination";

const ViewShopPage = (props:any) => {

  const [shops, setShops] = useState([]);

  const [pageNumber, setPageNumber] = useState(1);

  const [isActiveFilter, setIsActiveFilter] = useState(true);
  const [isBannedFilter, setIsBannedFilter] = useState(true);

  const getData = async () => {

    setShops([]);
    const data = await getAllShops(pageNumber, isActiveFilter, isBannedFilter);
    if (data.length == 0 && pageNumber > 1) setPageNumber(pageNumber - 1);
    setShops(data);

  }

  useEffect(() => {

    getData();

  }, [pageNumber, isActiveFilter, isBannedFilter]);

  const incrementPage = async () => {

    setPageNumber(pageNumber + 1);

  }

  const decrementPage = async () => {
    
    if (pageNumber - 1 === 0) setPageNumber(1);
    else setPageNumber(pageNumber - 1);

  }

  const user:any = useAuth();
  const router = useRouter();
  if (!user.role_id) return <div className="">Loading</div>
  if (useMiddleware(user, router, "Admin")) return;

  const getContent = () => {

    return (
      <div className={style.index}>
        <h1>View Shops</h1>
        <br />
        <div className={style.checkbox_container}>
          <div className={style.line}>
            <p>Active</p>
            <input type="checkbox" className={style.checkbox} 
            checked={isActiveFilter} onChange={() => setIsActiveFilter(!isActiveFilter)} />
          </div>
          <div className={style.line}>
            <p>Banned</p>
            <input type="checkbox" className={style.checkbox} 
            checked={isBannedFilter} onChange={() => setIsBannedFilter(!isBannedFilter)} />
          </div>
        </div>  
        <br />
        <div className={style.container}>
          <SimplePagination
            data={shops}
            onNextButtonClicked={ incrementPage }
            onPreviousButtonClicked={ decrementPage }
            pageNumber={ pageNumber }
            itemsPerRow={ 4 }
            type="shop"
          />
        </div>
      </div>
    );

  }

  return (
    <HomeLayout user={user} content={ getContent() } /> 
   );

}
 
export default ViewShopPage;
