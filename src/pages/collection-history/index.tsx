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
const TOTAL_ITEMS = 50;

// 날짜 포맷 함수
const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

// 데이터 생성
// const transactions: CollectTransaction[] = new Array(TOTAL_ITEMS).fill(0).map((_, index) => ({
//   date: formatDate(new Date(2024, 0, 1 + (index % 30))),
//   store: `매장 ${index + 1}`,
//   phoneNumber: `010-1234-567${index % 10}`, // 전화번호는 문자열로
//   address: `서울시 어딘가 ${index + 1}번지`,
//   volume: `${(index % 3) * 10 + 20}kg`, // 문자열로
//   request: `요청사항 ${index + 1}`,
// }));

export default function CollectionHistory() {
  const [transactions, setTransactions] = useState<CollectTransaction[]>([]);
  const [startDate, setStartDate] = useState<string>("2024-01-01");
  const [endDate, setEndDate] = useState<string>("2025-01-01");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredTransactions, setFilteredTransactions] = useState<
    CollectTransaction[]
  >([]);

  // 데이터 패칭
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/collection-history.json");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data: CollectTransaction[] = await response.json();
        setTransactions(data);
        setFilteredTransactions(data);
      } catch (error) {
        console.error("Error fetching data:", error);
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
  const visibleItems = filteredTransactions.slice(
    startRange,
    startRange + PAGE_SIZE
  );

  return (
    <>
      <Head>
        <title>그린다 수거 내역 리스트</title>
        <meta
          name="description"
          content="그린다 플랫폼 관리자의 수거 내역 리스트 페이지 입니다."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        {/* <Header title="수거 내역 리스트" imgAlt="수거 내역 리스트 아이콘" imgSrc="/truck.svg" /> */}
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
        <CollectTable transactions={visibleItems} />

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

function setTransactions(data: CollectTransaction[]) {
  throw new Error("Function not implemented.");
}

function setFilteredTransactions(data: CollectTransaction[]) {
  throw new Error("Function not implemented.");
}
