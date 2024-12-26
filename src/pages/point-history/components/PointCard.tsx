import styles from "./PointCard.module.css";

export default function PointCard() {
  return (
    <>
      <div className={styles.gradientBox}>
        <div className={styles.pointTitle}>
          월별 지급된 포인트
          <div className={styles.pointCount}>4000 P</div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.pointTitle}>일별 지급된 포인트 <div className={styles.pointCount}>800 P</div></div>
       
      </div>
    </>
  );
}
