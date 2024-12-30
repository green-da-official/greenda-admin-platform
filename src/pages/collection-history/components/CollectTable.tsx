import React from "react";
import styles from "./CollectTable.module.css";

// 데이터 타입 정의
export interface CollectTransaction {
  date: string;
  store: string;
  phone: string;
  location: string;
  volume: string;
  request: string;
}

// 테이블 컴포넌트 Props 타입 정의
interface TableProps {
  transactions: CollectTransaction[];
}

const CollectTable = ({ transactions = [] }: TableProps) => {
  return (
    <table className={styles.table}>
      <thead className={styles.tableHeader}>
        <tr>
          <th>날짜</th>
          <th>상호명</th>
          <th>연락처</th>
          <th>수거위치</th>
          <th>수거용량</th>
          <th>요청사항</th>
        </tr>
      </thead>
      <tbody>
        {transactions.length > 0 ? (
          transactions.map((transaction, index) => (
            <tr key={index} className={styles.tableRow}>
              <td>{transaction.date}</td>
              <td>{transaction.store}</td>
              <td>{transaction.phone}</td>
              <td>{transaction.location}</td>
              <td>{transaction.volume}</td>
              <td>{transaction.request}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6} style={{ textAlign: "center" }}>
              데이터가 없습니다.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default CollectTable;
