
import Image from "next/image";
import styles from "../../components/Header.module.css";
export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Image className={styles.img} src="./truck.svg" alt="" width={35} height={28}></Image>
        <h1 className={styles.title}>수거 내역 리스트</h1>
      </div>
    </header>
  );
}


