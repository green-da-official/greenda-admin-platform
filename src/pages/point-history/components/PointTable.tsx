import React from "react";
import styles from "./PointTable.module.css";
import ActionButtons from "./ActionButtons";
interface PointTransaction {
  date: string;
  store: string;
  points: number;
  reason: string;
}

interface TableProps {
  transactions: PointTransaction[];
}

const PointTable = ({ transactions }: TableProps) => {
  const handleEdit = (index: number) => {
    console.log(`Edit item at index ${index}`);
  };

  const handleDelete = (index: number) => {
    console.log(`Delete item at index ${index}`);
  };

  return (
    <table className={styles.table}>
      <thead className={styles.tableHeader}>
        <tr>
          <th>날짜</th>
          <th>상호명</th>
          <th>적립/회수</th>
          <th>사유</th>
          <th>-</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => (
          <tr key={index} className={styles.tableRow}>
            <td>{transaction.date}</td>
            <td>{transaction.store}</td>
            <td>{transaction.points}</td>
            <td>{transaction.reason}</td>
            {/* <td>
              <button className={styles.actionButton}>수정</button>
              <button className={styles.deleteButton}>삭제</button>
            </td> */}
            <td>
              <ActionButtons
                onEdit={(data) => {
                  console.log("수정된 데이터:", data);
                }}
                onDelete={() => {
                  console.log("삭제 완료");
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PointTable;
