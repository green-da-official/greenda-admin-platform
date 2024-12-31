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

const PointTable = ({ transactions = [] }: TableProps) => {
  const handleEdit = (data: PointTransaction) => {
    console.log("수정된 데이터:", data);
  };

  const handleDelete = (index: number) => {
    console.log(`Delete item at index ${index}`);
  };

  return (
    <div className={styles.tableContainer}>
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
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <tr key={index} className={styles.tableRow}>
                <td>{transaction.date}</td>
                <td>{transaction.store}</td>
                <td>{transaction.points}</td>
                <td>{transaction.reason}</td>
                <td>
                  <ActionButtons
                    onEdit={(updatedData) => {
                      handleEdit({
                        ...transaction,
                        points: parseFloat(updatedData.points),
                        reason: updatedData.reason,
                      });
                    }}
                    onDelete={() => {
                      handleDelete(index);
                    }}
                    transaction={transaction}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );}
export default PointTable;
