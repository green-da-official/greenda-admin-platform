// import PointCard from "./point-history/components/PointCard";
import Head from "next/head";

import styles from "./index.module.css";


// import Header from "";
//
import Link from "next/link";
export default function Home() {
  return (
    <>
    
      <>
        <Head>
          <title>그린다 홈</title>
          <meta name="description" content="그린다 홈" />
          <link rel="icon" href="/favicon.svg" />
        </Head>

        <div className={styles.container}>
          <h1 className={styles.title}>관리 페이지</h1>
          <div className={styles.buttonContainer}>
            <Link href="/point-history" className={styles.button}>
              포인트 내역 관리
            </Link>
            <Link href="/collection-history" className={styles.button}>
              수거 내역 관리
            </Link>
          </div>
         
        </div>
      </>
    </>
  );
}
