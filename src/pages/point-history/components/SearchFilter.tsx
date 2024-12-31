import React from "react";
import styles from "./SearchFilter.module.css";

interface SearchFilterProps {
  startDate: string;
  endDate: string;
  searchTerm: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onSearchTermChange: (value: string) => void;
  onSearch: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchFilter = ({
  startDate,
  endDate,
  searchTerm,
  onStartDateChange,
  onEndDateChange,
  onSearchTermChange,
  onSearch,
  onKeyDown,
}: SearchFilterProps) => {
  return (
    <div className={styles.searchFilterContainer}>
      <div className={styles.labelContainer}>
        <label className={styles.label}>조회기간</label>
      </div>

      <section className={styles.searchSection}>
        <div className={styles.searchRow}>
          <div className={styles.dateRange}>
            <input
              type="date"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              onKeyDown={onKeyDown}
              className={styles.input}
            />
            <span>-</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.searchRow}>
          <input
            type="text"
            placeholder="검색어를 입력해주세요"
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            onKeyDown={onKeyDown}
            className={styles.input}
          />
          <button className={styles.searchButton} onClick={onSearch}>
            조회
          </button>
        </div>
      </section>
    </div>
  );
};

export default SearchFilter;