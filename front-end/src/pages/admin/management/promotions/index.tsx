import HomeLayout from "@/layouts/HomeLayout";
import style from "../../../../styles/pages/admin/management/PromotionsPage.module.scss";
import useAuth from "@/hooks/useAuth";
import useMiddleware from "@/hooks/useMiddleware";
import { Router, useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import RectangularButton from "@/components/RectangularButton";
import uploadFile from "@/utility/uploadFile";
import PromotionPicture from "@/types/PromotionPicture";
import addPromotionPicture from "@/pages/api-calls/promotion-pictures/addPromotionPicture";
import getAllPromotionPictures from "@/pages/api-calls/promotion-pictures/getAllPromotionPictures";
import deletePromotionPicture from "@/pages/api-calls/promotion-pictures/deletePromotionPicture";

const PromotionsPage = (props: any) => {

  const [file, setFile] = useState(null);

  const user:any = useAuth();
  const router = useRouter();
  if (!user.role_id) return <div className="">Loading</div>
  if (useMiddleware(user, router, "Admin")) return;

  const handleFileUpload = async (e:any) => {

    e.preventDefault();
    if (file === null){
      alert('File is Null');
      return;
    }
    
    const link = await uploadFile(file, '/promotion-pictures');
    
    const promotionPicture:PromotionPicture = { url: link };
    
    const result = await addPromotionPicture(promotionPicture);
    
    if (result === -1) alert('Promotion Picture Creation Failed, due to Server Error');
    else {
      
      alert('Promotion Picture Created Successfully');
      window.location.reload();
      
    }

  }

  const { promotionPictures } = props;

  const handleRemove = async (image: any) => {

    const result = await deletePromotionPicture(image);
    if (result === -1) alert('Remove Failed, due to Server Error');
    else {

      alert('Picture Removed');
      window.location.reload();

    }

  }

  const getContent = () => {

    return (  
      <div className={style.index}>
        <h1>View Promotion Images</h1>
        <br />
        <div className={style.view_pictures}>
          {
            promotionPictures.map((image:any) => {
              return (
                <div key={image.ID} className={style.promotion_image_container}>
                  <img src={image.url} className={style.promotion_image} alt="" />
                  <RectangularButton onClick={() =>  handleRemove(image)} orange content={<div>Remove</div>} width={100} height={34} />
                </div>
              );
            })
          }
        </div>
        <br /><br /><br /><br /><br />
        <form className={style.add_picture} onSubmit={ handleFileUpload }>
        <h1>Add Promotion Image</h1>
        <input type="file" onChange={(e:any) => setFile(e.target.files[0])} />
          {file &&(
              <Image 
                className={style.input_image}
                src={URL.createObjectURL(file)}
                alt=""
                height={0}
                width={0}
              />
            )
          }
          <button className={style.button}>
            <RectangularButton content={<div>Add Picture</div>} orange width={200} />
          </button>
        </form>
      </div>
    );

  }

  return ( 
    <HomeLayout user={user} content={ getContent() } />
   );

}
 
export default PromotionsPage;

export async function getStaticProps(){

  const promotionPictures = await getAllPromotionPictures();

  return {
    props: {
      promotionPictures: promotionPictures
    }
  }

}