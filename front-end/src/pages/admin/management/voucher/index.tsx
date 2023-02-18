import HomeLayout from "@/layouts/HomeLayout";
import style from "../../../../styles/pages/admin/management/VoucherPage.module.scss";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import useMiddleware from "@/hooks/useMiddleware";
import RectangularInputField from "@/components/RectangularInputField/RectangularInputField";
import RectangularButton from "@/components/RectangularButton";
import { useState } from "react";
import addVoucher from "@/pages/api-calls/vouchers/addVoucher";
import Voucher from "@/types/Voucher";
import { ENV } from "@/ENV";

const getSubmitButton = () => {

  return (
    <div className={style.submit_button}>
      Add Voucher
    </div>
  );

}

const VoucherPage = () => {

  const [voucherCode, setVoucherCode] = useState('');
  const [voucherDiscount, setVoucherDiscount] = useState('');
  const [voucherDescription, setVoucherDescription] = useState('');

  const user:any = useAuth();
  const router = useRouter();
  if (!user.role_id) return <div className="">Loading</div>
  if (useMiddleware(user, router, "Admin")) return;

  const onFormSubmitted = async (e:any) => {

    e.preventDefault();

    const voucher: Voucher = {
      "voucher_code" : voucherCode,
      "voucher_discount" : Number(voucherDiscount),
      "voucher_description" : voucherDescription
    }

    const result = await addVoucher(voucher);
    if (result === -1) alert("Server Error");
    else if (result === -2) alert("Voucher Code Already Exists");
    else {

      alert("Voucher Added");
      router.back();

    }

  }

  const getContent = () => {
    
    return (
      <form className={style.index} onSubmit={ onFormSubmitted }>
        <h1>Add Voucher</h1>
        <br />
        <div className={style.container}>
          <RectangularInputField required value={voucherCode} onChange={setVoucherCode} width={500} height={44} 
          placeholder="Voucher Code" />
          <RectangularInputField required number value={voucherDiscount} onChange={setVoucherDiscount} width={500} height={44} 
          placeholder="Voucher Discount ($)" />
          <RectangularInputField required area value={voucherDescription}  onChange={setVoucherDescription} width={510} height={132} 
          placeholder="Voucher Description" />
          <button>
            <RectangularButton orange content={ getSubmitButton() } width={525}  />
          </button>
        </div>
      </form>

    );

  }

  return ( 
    <>
      <HomeLayout user={user} content={getContent()} />
    </>
   );
}
 
export default VoucherPage;