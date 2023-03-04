import WORDS from '@/components/Navbar/Words';
import '@/styles/globals.css'
import getCookie from '@/utility/getCookie';
import setCookie from '@/utility/setCookie';
import type { AppProps } from 'next/app'
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {

    let theme = getCookie("theme");
    if (theme === "light"){
      document.documentElement.setAttribute('data-theme', "light");
    } else {
      document.documentElement.setAttribute('data-theme', "dark");
    }

    let language = getCookie("language");
    if (!language) setCookie("language", "english", 10);
    WORDS.currentLanguage = language;

    if (WORDS.currentLanguage === "indonesian") {

      WORDS.selectAddress = "Pilih Alamat";
      WORDS.signIn = "Masuk";
      WORDS.register = "Daftar";
      WORDS.returns = "Pengembalian";
      WORDS.orders = "Pesanan";
      WORDS.feedback = "Umpan Balik";
      WORDS.helpCenter = "Bantuan";
      WORDS.welcome = "Selamat Datang";
    
    } else {

      WORDS.selectAddress ="Select Address";
      WORDS.signIn = "Sign In";
      WORDS.register = "Register";
      WORDS.returns = "Returns";
      WORDS.orders = "Orders";
      WORDS.feedback = "FEEDBACK";
      WORDS.helpCenter = "HELP CENTER";
      WORDS.welcome = "Welcome";

    }

  })

  return (
    <>
      <Component {...pageProps} />
    </>
  
  );

}
