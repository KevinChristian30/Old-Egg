import RectangularButton from "@/components/RectangularButton";
import RectangularInputField from "@/components/RectangularInputField/RectangularInputField";
import useAuth from "@/hooks/useAuth";
import useMiddleware from "@/hooks/useMiddleware";
import HomeLayout from "@/layouts/HomeLayout";
import resetShopPassword from "@/pages/api-calls/shops/resetShopPassword";
import setCookie from "@/utility/setCookie";
import { useRouter } from "next/router";
import { useState } from "react";

const ChangePasswordScreen = () => {

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const user:any = useAuth();
  const router = useRouter();
  if (!user) return <div className="">Loading...</div>
  if (useMiddleware(user, router, "Shop")) return;

  const onFormSubmitted = async (e:any) => {

    console.log(user);

    e.preventDefault();
    const response = await resetShopPassword(user.email, password, repeatPassword);

    if (response == 1){

      alert('Password Saved');
      setCookie('Auth', '', 1);
      router.push('/sign-in');

    } else if (response == -1) alert('Server Error');
    else alert(response);

  }

  const getContent = () => {

    return (
      <form action="" onSubmit={ onFormSubmitted }>
        <h1>Change Password</h1>
        <br />
        <RectangularInputField
          value={password}
          onChange={setPassword}
          password
          placeholder="New Password"
          width={500}
          height={44}
        />
        <br />
        <RectangularInputField
          value={repeatPassword}
          onChange={setRepeatPassword}
          password
          placeholder="Repeat New Password"
          width={500}
          height={44}
        />
        <br /><br /><br /><br /><br /><br />
        <button>
          <RectangularButton
            orange
            width={300} 
            content={<div>RESET PASSWORD</div>}
          />
        </button>
      </form>
    );

  }

  return ( <HomeLayout content={ getContent() } user={user} /> );
}
 
export default ChangePasswordScreen;