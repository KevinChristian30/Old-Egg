import HomeLayout from "@/layouts/HomeLayout";
import style from "../../../../../styles/pages/admin/management/shops/AddShopPage.module.scss";
import useMiddleware from "@/hooks/useMiddleware";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import RectangularInputField from "@/components/RectangularInputField/RectangularInputField";
import { useState } from "react";
import RectangularButton from "@/components/RectangularButton";
import Shop from "@/types/Shop";
import addShop from "@/pages/api-calls/shops/AddShop";
import sendEmail from "@/utility/sendEmail";

const AddShopPage = () => {

  const [shopName, setShopName] = useState('');
  const [shopEmail, setShopEmail] = useState('');
  const [shopPassword, setShopPassword] = useState('');

  const user = useAuth();
  const router = useRouter();
  if (useMiddleware(user, router, "Admin")) return;

  const onFormSubmitted = (e:any) => {

    e.preventDefault();
    const shop:Shop = {
      shop_name: shopName,
      shop_email: shopEmail,
      shop_password: shopPassword,
      status: 'Active'  
    }

    const result:any = addShop(shop);
    if (result === -1) alert('Shop Creation Failed, Server Error');
    else if (result === -2) alert('Email is Not Unique');
    else if (result === -3) alert('Password Hashing Failed');
    else {
      
      sendEmail(shopEmail, "NewEgg Shop Account Creation",
        "Dear client, here are your NewEgg Account Credentials\nShop Name: " + shopName + "\nEmail: " + shopEmail + "\nShop Password: " + shopPassword
      );
      alert('Shop Added Successfully');
      window.location.reload();

    }

  }

  const getContent = () => {

    return (
      <form className={style.index} onSubmit={ onFormSubmitted }>
        <h1>Add Shop</h1>
        <br /><br />
        <RectangularInputField required value={shopName} onChange={setShopName} placeholder="Shop Name" width={500} height={44} />
        <br />
        <RectangularInputField required email value={shopEmail} onChange={setShopEmail} placeholder="Shop Email" width={500} height={44} />
        <br />
        <RectangularInputField required password value={shopPassword} onChange={setShopPassword} placeholder="Shop Password" width={500} height={44} />
        <br /><br />
        <button>
          <RectangularButton orange content={<div>Add Shop</div>} width={150} />
        </button>
      </form>
    );

  }

  return (
    <HomeLayout user={user} content={ getContent() } /> 
   );
}
 
export default AddShopPage;