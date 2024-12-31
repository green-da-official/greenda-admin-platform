import Head from "next/head";
import Header from "../collection-history/components/CollectionHeader";
import { useState, useEffect } from "react";
import CollectTable, {
  CollectTransaction,
} from "../collection-history/components/CollectTable";
import styles from "./collection-history.module.css";
import Pagination from "../components/Pagination";
import SearchFilter from "../point-history/components/SearchFilter";

// 상수 정의
const PAGE_SIZE = 5;

export default function CollectionHistory() {
  const [transactions, setTransactions] = useState<CollectTransaction[]>([]);
  const [startDate, setStartDate] = useState<string>("2024-01-01");
  const [endDate, setEndDate] = useState<string>("2025-01-01");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredTransactions, setFilteredTransactions] = useState<CollectTransaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 데이터 패칭
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/collection-history.json");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data: CollectTransaction[] = await response.json();
        setTransactions(data); // 데이터 저장
        setFilteredTransactions(data); // 필터링 데이터 초기화
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // 로딩 상태 업데이트
      }
    };
    fetchData();
  }, []);

  // 검색 실행 함수
  const handleSearch = () => {
    const filtered = transactions.filter(
      (transaction) =>
        transaction.date >= startDate &&
        transaction.date <= endDate &&
        `${transaction.date} ${transaction.store} ${transaction.phone} ${transaction.location} ${transaction.volume} ${transaction.request}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    setFilteredTransactions(filtered);
    setCurrentPage(1);
  };

  // Enter 키 이벤트 핸들러
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // 현재 페이지 데이터 계산
  const startRange = (currentPage - 1) * PAGE_SIZE;
  const visibleItems = filteredTransactions.slice(startRange, startRange + PAGE_SIZE);

  return (
    <>
      <Head>
        <title>그린다 수거 내역 관리</title>
        <meta name="description" content="그린다 수거 내역 관리" />
        <meta property="og:image" content="/thumbnail3.png" />
        <meta
          name="description"
          content="그린다 플랫폼 관리자의 수거 내역 관리 페이지 입니다."
        />
        <meta
          property="og:url"
          content="https://green-da-admin.vercel.app/collection-history"
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <div className={styles.container}>
        <Header />

        {/* SearchFilter 컴포넌트 */}
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

        {/* CollectTable 컴포넌트 */}
        {loading ? (
          <p>Loading...</p> // 로딩 상태 표시
        ) : (
          <CollectTable transactions={visibleItems} />
        )}

        {/* 페이지네이션 */}
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
