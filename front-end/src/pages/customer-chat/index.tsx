import useAuth from "@/hooks/useAuth";
import HomeLayout from "@/layouts/HomeLayout";
import style from "../../styles/pages/CustomerChatPage.module.scss"
import { useEffect, useState } from "react";
import getChattingCustomers from "../api-calls/message/getChattingCustomes";
import ChatRoom from "@/components/ChatRoom/ChatRoom";

const CustomerChatPage = () => {

  const user: any = useAuth();

  const [customers, setCustomers] = useState<Array<any>>([]);
  const [recipient, setRecipient] = useState("");

  useEffect(() => {

    const get = async () => {

      const response = await getChattingCustomers("999");
      if (response === -1) alert('Something Went Wrong');
      else {

        if (response) setCustomers(response);

      }

    }

    get();

  }, []);

  const getContent = () => {

    return (
      <div className={style.index}>
        <h1>Customer's Chat</h1>
        <div className={style.container}>
          <div className={style.left}>
            {
              customers.map((customer: any) => {

                return <h2 
                    key={customer} 
                    className={style.user}
                    onClick={() => setRecipient(customer)}
                  >
                    User: {customer}
                  </h2>

              })
            }
          </div>
          <div className={style.right}>
            <ChatRoom
              from="999"
              to={recipient} 
              senderName={recipient}
            />
          </div>
        </div>
      </div>
    );

  }

  return ( <HomeLayout content={ getContent() } user={ user } /> );
}
 
export default CustomerChatPage;