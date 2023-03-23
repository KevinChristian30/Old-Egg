import useAuth from "@/hooks/useAuth";
import HomeLayout from "@/layouts/HomeLayout";
import style from "../../styles/pages/HelpCenterPage.module.scss";
import ChatRoom from "@/components/ChatRoom/ChatRoom";
import RectangularInputField from "@/components/RectangularInputField/RectangularInputField";
import { useState } from "react";
import RectangularButton from "@/components/RectangularButton";
import deleteMessages from "../api-calls/message/deleteMessages";
import createCustomerServiceReview from "../api-calls/customerServiceReview/createCustomerServiceReview";

const HelpCenterPage = () => {

  const user: any = useAuth();

  const [review, setReview] = useState("");

  const onEndChatButtonClicked = async () => {

    // Delete All Chat
    const deleteResponse = await deleteMessages(user.ID + "", "999");

    // Create Review
    if (review !== "") await createCustomerServiceReview(user.ID, review);
    

    alert('Chat Ended');
    window.location.reload();

  }

  const getContent = () => {

    return (
      <div className={style.index}>
        <h1>Customer Service</h1>
        <br />
        <ChatRoom 
          from={user.ID + ""} 
          to={"999"}
          senderName="Customer Service" 
        />
        <br />
        <h1>End Chat + Review</h1>
        <br />
        <RectangularInputField
          value={review}
          onChange={setReview}
          area
          width={500}
          height={100}
          placeholder="Review Customer Service Staff"
        />
        <RectangularButton 
          content={<div>End Chat</div>}
          height={30}
          orange
          onClick={ onEndChatButtonClicked }
        />
      </div>
    )

  }

  return ( 
    <HomeLayout content={ getContent() } user={ user } /> 
  );
}
 
export default HelpCenterPage;