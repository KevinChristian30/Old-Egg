import HomeLayout from "@/layouts/HomeLayout";
import style from "../../../../styles/pages/admin/management/NewsletterPage.module.scss";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import useMiddleware from "@/hooks/useMiddleware";
import RectangularInputField from "@/components/RectangularInputField/RectangularInputField";
import RectangularButton from "@/components/RectangularButton";
import { useState } from "react";
import getAllUsers from "@/pages/api-calls/user/getAllUsers";
import sendEmail from "@/utility/sendEmail";

const NewsletterPage = (props:any) => {

  const [subject, setSubject] = useState('');
  const [newsletter, setNewsletter] = useState('');

  const user = useAuth()
  const router = useRouter()
  if (useMiddleware(user, router, "Admin")) return;

  const { users } = props; 

  const onFormSubmitted = (e:any) => {

    e.preventDefault();
    
    var emails = ""
    users.map((user:any) => emails += user.email + ';');

    sendEmail(emails, subject, newsletter);

  }

  const getContent = () => {

    return (
      <div className={style.index}>
        <script src="https://smtpjs.com/v3/smtp.js" defer></script>
        <form onSubmit={ onFormSubmitted }>
          <h1>Newsletter</h1>
          <br />
          <RectangularInputField value={subject} onChange={setSubject} placeholder="Subject" width={790} height={44} />
          <br />
          <RectangularInputField area value={newsletter} onChange={setNewsletter} placeholder="Body" width={800} height={300} />
          <br />
          <button>
            <RectangularButton orange width={200} content={<div>Blast!</div>} />
          </button>
        </form>
      </div>
    );

  }

  return ( 
    <HomeLayout user={user} content={ getContent() } />
   );

}
 
export default NewsletterPage;

export async function getStaticProps(){

  const users = await getAllUsers();

  return {
    props: {
      users: users
    }
  }

}