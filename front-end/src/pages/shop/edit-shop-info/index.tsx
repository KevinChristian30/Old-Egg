import HomeLayout from "@/layouts/HomeLayout";
import style from "../../../styles/pages/shop/EditShopInfoPage.module.scss"
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import useMiddleware from "@/hooks/useMiddleware";
import { useEffect, useState } from "react";
import ShopInformation from "@/types/ShopInformation";
import getShopInformation from "@/pages/api-calls/auth/getShopInformation";
import RectangularInputField from "@/components/RectangularInputField/RectangularInputField";
import Image from "next/image";
import RectangularButton from "@/components/RectangularButton";
import updateShopProfile from "@/pages/api-calls/shops/updateShopProfile";
import uploadFile from "@/utility/uploadFile";
import getCookie from "@/utility/getCookie";

const EditShopInfoPage = () => {

  const user:any = useAuth();
  const router = useRouter();

  const [shopInformation, setShopInformation] = useState<ShopInformation>();
  const [aboutUs, setAboutUs] = useState("");
  const [shopName, setShopName] = useState("");
  const [shopProfilePicture, setShopProfilePicture] = useState("");
  const [file, setFile] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    const getProducts = async () => {

      const result = await getShopInformation(user.email);
      setShopInformation(result);
      if (result.shop) {

        setAboutUs(result.shop.about_us);
        setShopName(result.shop.shop_name);
        setShopProfilePicture(result.shop.display_picture_link);

      }

    }
  
    getProducts();

  }, [user]);

  useEffect(() => {

    if (file) setShopProfilePicture(URL.createObjectURL(file));

  }, [file]);

  const handleSaveProfile = async (e: any) => {

    e.preventDefault();
    setIsLoading(true);

    let link = "";
    if (file) link = await uploadFile(file, '/shop-display-pictures');

    if (link != ""){

      setShopProfilePicture(link);

    }

    const token = getCookie('Auth');
    const response = await updateShopProfile(token, user.email, shopName, aboutUs, link);
    if (response === -1) alert("Server Error");
    else {

      alert("Profile Updated");

    }

    setIsLoading(false);

  }

  if (!user.role_id || !shopInformation) return <div>Loading ..</div>
  if (useMiddleware(user, router, "Shop")) return;

  const getContent = () => {

    return (
      <form className={style.index} onSubmit={ (e: any) => handleSaveProfile(e) }>
        <h2>Average Rating: { shopInformation.average_rating }</h2>
        <h2>Number of Sales: { shopInformation.number_of_sales }</h2>
        <br /><br />
        <h3>Shop Name</h3>
        <RectangularInputField
          onChange={setShopName}
          area 
          width={600}
          height={44}
          value={shopName}
        />
        <br />
        <h3>Shop Display Picture</h3>
        {
          shopProfilePicture != "" ?
          <img 
            className={style.input_image}
            src={ shopProfilePicture }
            alt=""
            height={0}
            width={0}
          /> :
          <h4>Your Shop Doesn't Have a Display Picture</h4>
        }
        <br />
        <input type="file" onChange={(e:any) => setFile(e.target.files[0])} />
        <br /><br />
        <h3>About Us</h3>
        <RectangularInputField
          onChange={setAboutUs}
          area 
          width={600}
          height={100}
          value={aboutUs}
        />
        <br /><br /><br /><br />
        {
          !isLoading ?
          <button>
            <RectangularButton
              orange
              content={<div>SAVE PROFILE</div>}
            />
          </button> : 
          <h3>Saving Profile</h3>
        }

      </form> 
    );

  }

  return ( <HomeLayout content={ getContent() } user={user} /> );
}
 
export default EditShopInfoPage;