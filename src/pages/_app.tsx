import { Provider } from "@/components/ui/provider"
import "@/styles/globals.css";
import localFont from "next/font/local";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Toaster } from "@/components/ui/toaster"


const Pretendard = localFont({
  src: [
    {
      path: "./fonts/PretendardVariable.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/PretendardVariable.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/PretendardVariable.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/PretendardVariable.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/PretendardVariable.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/PretendardVariable.woff2",
      weight: "900",
      style: "normal",
    },
  ],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Head>
        <title>그린다 플랫폼 관리자</title>
        <meta
          name="description"
          content="그린다 플랫폼 관리자 사이트 입니다."
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>

     
        <main className={Pretendard.className}>
          <Component {...pageProps} />
          <Toaster />
        </main>
   
    </Provider>
  );
}
