import HomeLayout from "@/layouts/HomeLayout";
import style from "../../styles/pages/VoucherPage.module.scss";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import RectangularInputField from "@/components/RectangularInputField/RectangularInputField";
import RectangularButton from "@/components/RectangularButton";
import applyVoucher from "../api-calls/vouchers/applyVoucher";

const VoucherPage = () => {

  const user:any = useAuth();

  const [voucher, setVoucher] = useState("");

  const onApplyVoucherButtonClick = async () => {

    const response:any = await applyVoucher(user.email, voucher);
    if (response === -1) alert('Server Error');
    else if (response == -2) alert("Voucher Code doesn't Exist");
    else if (response == -3) alert("Voucher Code Is Fully Redeemed, You are Unlucky");
    else {

      alert(response)
      setVoucher("");
    
    }

  }

  const getContent = () => {

    return (
      <div className={style.index}>
        
        <h1>Voucher</h1>
        <RectangularInputField 
          value={ voucher }
          onChange={ setVoucher }
          width={500}
          height={34}
          placeholder="Voucher Code"
        />
        <br /><br /><br /><br /><br />
        <RectangularButton 
          orange
          content={<div>APPLY VOUCHER</div>}
          height={34}
          onClick={ onApplyVoucherButtonClick }
        />

      </div>  
    );

  }

  return ( <HomeLayout content={ getContent() } user={user} /> );
}
 
export default VoucherPage;