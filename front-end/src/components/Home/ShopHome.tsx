import Link from "next/link";
import style from "../../styles/components/Home/ShopHome.module.scss";
import SquareCard from "../Card/SquareCard";
import { faBoxesStacked, faPlus } from "@fortawesome/free-solid-svg-icons";

const ShopHome = () => {
  return ( 
    <div className={style.index}>
      <br /><br /><br /><br /><br /><br />
      <div className={style.container}>
        <Link href="/shop/add-product">
          <SquareCard text="Add Product" icon={faPlus} />
        </Link>
        <Link href="">
          <SquareCard text="View Products" icon={faBoxesStacked} />
        </Link>
      </div>
      <br /><br /><br /><br /><br /><br />
    </div>
   );
}
 
export default ShopHome;