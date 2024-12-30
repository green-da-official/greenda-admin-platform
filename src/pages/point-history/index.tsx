import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "./point-history.module.css";
import Header from "../components/PointHeader";
import Pagination from "../components/Pagination";
import Table from "./components/PointTable";
import SearchFilter from "./components/SearchFilter";

const PAGE_SIZE = 7;

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
  const [filteredTransactions, setFilteredTransactions] = useState<
    PointTransaction[]
  >([]);
  const [transactions, setTransactions] = useState<PointTransaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 데이터 로드
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
        const responses = await Promise.all(
          fileNames.map((fileName) => fetch(`/data/${fileName}`))
        );
        const dataArrays = await Promise.all(
          responses.map((response) => {
            if (!response.ok) throw new Error(`Failed to load ${response.url}`);
            return response.json();
          })
        );

        const mergedData: PointTransaction[] = dataArrays.flat();
        setTransactions(mergedData || []);
        setFilteredTransactions(mergedData || []);
      } catch (error) {
        console.error("데이터 로드 오류:", error);
        setTransactions([]);
        setFilteredTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // 검색 기능
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
    setCurrentPage(1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const startRange = (currentPage - 1) * PAGE_SIZE;
  const visibleItems = filteredTransactions.slice(
    startRange,
    startRange + PAGE_SIZE
  );

  return (
    <>
      <Head>
        <title>그린다 포인트 내역 관리</title>
        <meta name="description" content="그린다 포인트 내역 관리" />
        <meta property="og:image" content="/thumbnail.png" />
        <meta
          name="description"
          content="그린다 플랫폼 관리자의 포인트 내역 관리 페이지 입니다."
        />
        <meta
          property="og:url"
          content="https://green-da-admin.vercel.app/point-history"
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
        {loading ? <p>Loading...</p> : <Table transactions={visibleItems} />}
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
