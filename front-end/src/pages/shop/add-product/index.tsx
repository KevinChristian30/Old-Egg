import HomeLayout from "@/layouts/HomeLayout";
import style from "../../../styles/pages/shop/AddProductPage.module.scss";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import useMiddleware from "@/hooks/useMiddleware";

const AddProductPage = () => {

  const user = useAuth();
  const router = useRouter();
  if (!user) return <div className="">Loading...</div>
  if (useMiddleware(user, router, "Shop")) return;

  const getContent = () => {
    
    return (
      <div className={style.index}>
        
      </div>
    );

  }

  return <HomeLayout content={getContent()} user={user} />

}
 
export default AddProductPage;