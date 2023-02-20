import style from "../../styles/components/Pagination/SimplePagination.module.scss";
import User from "@/types/User";
import { useState } from "react";
import UserCard from "../Card/UserCard";
import RectangularButton from "../RectangularButton";
import ProductCard from "../Card/ProductCard";

interface SimplePaginationProps {
  data: any,
  itemsPerPage: number,
  type: string
}

const SimplePagination = (props:SimplePaginationProps) => {

  const [pageNumber, setPageNumber] = useState(0);
  let displayedContent:any[] = [];

  const { data, itemsPerPage, type } = props;
  const maxPage = Math.ceil(data.length / itemsPerPage)

  displayedContent = [];
  for (let i = pageNumber * itemsPerPage; i < pageNumber * itemsPerPage + itemsPerPage; i++){

    if (data[i]){
      displayedContent.push(data[i]);
    } else break;

  }

  const incrementPage = () => {

    if (pageNumber + 1 > maxPage) setPageNumber(0)
    setPageNumber((pageNumber + 1) % maxPage);
    
  }
  
  const decrementPage = () => {
    
    if (pageNumber - 1 < 0) setPageNumber(maxPage - 1);
    else setPageNumber((pageNumber - 1) % maxPage);

  }

  return ( 
    <div className={style.simple_pagination}>
      <div className={style.button_container}>
        <h3>Page: {pageNumber + 1}</h3>
        <RectangularButton onClick={ decrementPage } orange content={ <div>Prev</div> } width={100} />
        <RectangularButton onClick={ incrementPage } orange content={ <div>Next</div> } width={100} />
      </div>
      <br />
      <div className={style.container}>
        {
          displayedContent.map((content) => {
            if (type === 'user') return <UserCard key={content.email} user={content} />
            else return <ProductCard key={content.product_id} product={content} />
          })
        }
      </div>
    </div>
   );

}
 
export default SimplePagination;