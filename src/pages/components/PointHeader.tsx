
import Image from "next/image";
import styles from "./Header.module.css";
export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Image className={styles.img} src="./point.svg" alt="" width={35} height={28}></Image>
        <h1 className={styles.title}>포인트 내역 관리</h1>
      </div>
    </header>
  );
}


