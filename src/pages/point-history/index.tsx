
import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "./point-history.module.css";
import Header from "../components/PointHeader";
import Pagination from "../components/Pagination";
import Table from "./components/PointTable";
import SearchFilter from "./components/SearchFilter";

const PAGE_SIZE = 7;

// 데이터 타입 정의
interface PointTransaction {
  date: string;
  store: string;
  points: number;
  reason: string;
}

export default function PointHistory() {
  const [startDate, setStartDate] = useState<string>("2024-01-01");
  const [endDate, setEndDate] = useState<string>("2025-01-01");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredTransactions, setFilteredTransactions] = useState<PointTransaction[]>([]);
  const [transactions, setTransactions] = useState<PointTransaction[]>([]);

  // 여러 JSON 파일 불러오기 및 통합
  useEffect(() => {
    const fetchTransactions = async () => {
      const fileNames = [
        "point-history-4.json",
        "point-history-5.json",
        "point-history-6.json",
        "point-history-7.json",
        "point-history-8.json",
        "point-history-9.json",
        "point-history-10.json",
        "point-history-11.json",
        "point-history-12.json",
      ];

      try {
        // 파일들을 병렬로 fetch
        const responses = await Promise.all(
          fileNames.map((fileName) => fetch(`/data/${fileName}`))
        );

        // JSON 데이터를 병렬로 변환
        const dataArrays = await Promise.all(
          responses.map((response) => response.json())
        );

        // 모든 데이터를 하나의 배열로 병합
        const mergedData: PointTransaction[] = dataArrays.flat();
        setTransactions(mergedData);
        setFilteredTransactions(mergedData); // 기본적으로 모든 데이터 표시
      } catch (error) {
        console.error("JSON 파일 불러오기 오류:", error);
      }
    };

    fetchTransactions();
  }, []);

  const handleSearch = () => {
    const filtered = transactions.filter(
      (transaction) =>
        transaction.date >= startDate &&
        transaction.date <= endDate &&
        `${transaction.date} ${transaction.store} ${transaction.points} ${transaction.reason}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    setFilteredTransactions(filtered);
    setCurrentPage(1); // 검색 후 첫 페이지로 이동
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const startRange = (currentPage - 1) * PAGE_SIZE;
  const visibleItems = filteredTransactions.slice(startRange, startRange + PAGE_SIZE);

  return (
    <>
      <Head>
        <title>그린다 포인트 내역 관리</title>
        <meta
          name="description"
          content="그린다 플랫폼 관리자의 포인트 내역 관리 페이지 입니다."
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <div className={styles.container}>
        <Header />
        <div className={styles.searchFilterContainer}>
          <SearchFilter
            startDate={startDate}
            endDate={endDate}
            searchTerm={searchTerm}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            onSearchTermChange={setSearchTerm}
            onSearch={handleSearch}
            onKeyDown={handleKeyDown}
          />
        </div>
        <Table transactions={visibleItems} />
        <Pagination
          currentPage={currentPage}
          totalItems={filteredTransactions.length}
          pageSize={PAGE_SIZE}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
}
