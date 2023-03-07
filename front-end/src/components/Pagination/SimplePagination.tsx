import style from "../../styles/components/Pagination/SimplePagination.module.scss";
import { useState } from "react";
import UserCard from "../Card/UserCard";
import RectangularButton from "../RectangularButton";
import ProductCard from "../Card/ProductCard";
import ShopCard from "../Card/ShopCard";
import Link from "next/link";
import getProductByID from "@/pages/api-calls/products/getProductByID";
import NavbarButton from "../Navbar/NavbarButton";
import { useRouter } from "next/router";

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

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalProduct, setModalProduct] = useState<any>();

  const router = useRouter();

  const displayModal = async (id: string) => {

    setIsModalVisible(true);
    const product = await getProductByID(id);
    setModalProduct(product);

  }

  const onProductCardClicked = (id: string) => {

    router.push('/product/details/' + id);

  }

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
            if (type === 'user') {
              return <UserCard key={content.email} user={content} />
            } else if (type === 'shop') {
              return <ShopCard shop={content} />
            } else if (type === 'shop-product') {
              return (
                <Link key={content.product_id} href={"/shop/update-product/" + content.product_id}>
                  <ProductCard product={content} />
                </Link>
              );
            } else if (type === 'customer-product'){

              return (
                <div 
                  key={content.product_id} 
                  className={style.card_container}  
                >

                  <div onClick={ () => onProductCardClicked(content.product_id) }>
                    <ProductCard product={content} />
                  </div>

                  <div className={style.quick_view_button} onClick={ () => displayModal(content.product_id) }>
                    <NavbarButton child={<div>Quick View</div>} />
                  </div>

                </div>
              )

            }
          })
        }
      </div>
      {
        isModalVisible &&
        <div className={style.modal} onClick={ () => setIsModalVisible(false) }>
          <div className={style.left}>
            <img 
              src={modalProduct?.product_image_links[0]} 
              className={style.image}
            />
            <h2>Name: {modalProduct?.product_name}</h2>
            <h2>Price: {modalProduct?.product_price}</h2>
            <h2>Stock: {modalProduct?.product_stock}</h2>
          </div>
          <div className={style.right}>
            <div>
              <h3>Description: </h3>
              <h4>{modalProduct?.product_description}</h4>
            </div>
            <div>
              <h3>Details: </h3>
              <h4>{modalProduct?.product_details}</h4>
            </div>

          </div>
        </div>
      }
    </div>
   );

}
 
export default SimplePagination;