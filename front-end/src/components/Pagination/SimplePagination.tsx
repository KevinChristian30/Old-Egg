import style from "../../styles/components/Pagination/SimplePagination.module.scss";
import { useState } from "react";
import UserCard from "../Card/UserCard";
import RectangularButton from "../RectangularButton";
import ProductCard from "../Card/ProductCard";
import ShopCard from "../Card/ShopCard";

interface SimplePaginationProps {
  data: any,
  type: string,
  itemsPerRow?: number,
  
  pageNumber: any,
  onNextButtonClicked: any
  onPreviousButtonClicked: any
}

const SimplePagination = (props:SimplePaginationProps) => {

  const { data, type, itemsPerRow, pageNumber } = props;
  const { onNextButtonClicked, onPreviousButtonClicked } = props;

  return ( 
    <div className={style.simple_pagination}>
      <div className={style.button_container}>
        <h3>Page: {pageNumber}</h3>
        <RectangularButton onClick={ onPreviousButtonClicked } orange content={ <div>Prev</div> } width={100} />
        <RectangularButton onClick={ onNextButtonClicked } orange content={ <div>Next</div> } width={100} />
      </div>
      <br />
      <div className={style.container} style={
          {
            display: "grid",
            gridTemplateColumns: `repeat(${itemsPerRow}, auto)`,
          }
        } >
        {
          data.map((content: any) => {
            if (type === 'user') return <UserCard key={content.email} user={content} />
            else if (type === 'shop') return <ShopCard shop={content} />
            else return <ProductCard key={content.product_id} product={content} />
          })
        }
      </div>
    </div>
   );

}
 
export default SimplePagination;