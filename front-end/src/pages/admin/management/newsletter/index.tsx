import HomeLayout from "@/layouts/HomeLayout";
import style from "../../../../styles/pages/admin/management/NewsletterPage.module.scss";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import useMiddleware from "@/hooks/useMiddleware";
import RectangularInputField from "@/components/RectangularInputField/RectangularInputField";
import RectangularButton from "@/components/RectangularButton";
import { useState } from "react";
import axios from "axios";
import { ENV } from "@/ENV";

const NewsletterPage = () => {

  const [subject, setSubject] = useState('');
  const [newsletter, setNewsletter] = useState('');
  const [sending, setSending] = useState(false);

  const user:any = useAuth();
  const router = useRouter();
  if (!user.role_id) return <div className="">Loading</div>
  if (useMiddleware(user, router, "Admin")) return;

  const onFormSubmitted = async (e:any) => {

    e.preventDefault();
    
    const requestBody = {
      "mail_subject": subject,
      "mail_body": newsletter
    };

    setSending(true);
    const response = await axios.post(ENV.API + "blast-newsletter", requestBody);
    if (response.data === 'Email Blast Error'){

      alert("Error While Sending Email");
      
    } else {
      
      alert("Newsletter Sent Successfully");

    }

    setSubject("")
    setNewsletter("")
    setSending(false);

  }

  const getContent = () => {

    if (sending) return <h1>Blasting Email ...</h1>
    else return (
      <div className={style.index}>
        <script src="https://smtpjs.com/v3/smtp.js" defer></script>
        <form onSubmit={ onFormSubmitted }>
          <h1>Newsletter</h1>
          <br />
          <RectangularInputField required value={subject} onChange={setSubject} placeholder="Subject" width={790} height={44} />
          <br />
          <RectangularInputField required area value={newsletter} onChange={setNewsletter} placeholder="Body" width={800} height={300} />
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
