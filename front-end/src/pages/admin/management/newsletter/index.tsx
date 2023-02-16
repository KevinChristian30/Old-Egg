import HomeLayout from "@/layouts/HomeLayout";
import style from "../../../../styles/pages/admin/NewsletterPage.module.scss";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import useMiddleware from "@/hooks/useMiddleware";

const NewsletterPage = () => {

  const user = useAuth()
  const router = useRouter()
  if (useMiddleware(user, router, "Admin")) return;

  const getContent = () => {

    return (
      <div className="">
        Newsletter Page
      </div>
    );

  }

  return ( 
    <HomeLayout user={user} content={ getContent() } />
   );
}
 
export default NewsletterPage;