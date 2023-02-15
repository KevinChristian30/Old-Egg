import '@/styles/globals.css'
import getCookie from '@/utility/getCookie';
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

  })

  return (
    <>
      <Component {...pageProps} />
    </>
  
  );

}
