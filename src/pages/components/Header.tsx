// import Link from "next/link";
// import Image from "next/image";
// import styles from "./Header.module.css";
// export default function Header() {
//   return (
//     <header className={styles.header}>
//       <div className={styles.container}>
//         <Image className={styles.img} src="./point.svg" alt="" width={35} height={28}></Image>
//         <h1 className={styles.title}>포인트 내역 관리</h1>
//       </div>
//     </header>
//   );
// }


// components/Header.tsx
import styles from "./Header.module.css";
import Image from "next/image";

interface HeaderProps {
  title: string;
  imgSrc: string;
  imgAlt?: string;
  imgWidth?: number;
  imgHeight?: number;
}

export default function Header({
  title,
  imgSrc,
  imgAlt = "",
  imgWidth = 35,
  imgHeight = 28,
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Image
          className={styles.img}
          src={imgSrc}
          alt={imgAlt}
          width={imgWidth}
          height={imgHeight}
        />
        <h1 className={styles.title}>{title}</h1>
      </div>
    </header>
  );
}
