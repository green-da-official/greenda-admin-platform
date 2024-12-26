import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalItems, pageSize, onPageChange }: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const pageRangeSize = 10;
  
  // Calculate current range
  const currentRange = Math.floor((currentPage - 1) / pageRangeSize);
  const rangeStart = currentRange * pageRangeSize + 1;
  const rangeEnd = Math.min(rangeStart + pageRangeSize - 1, totalPages);

  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      {rangeStart > 1 && (
        <button
          onClick={handlePrevious}
          className={`${styles.pageButton} ${styles.arrowButton}`}
          aria-label="이전 페이지"
        >
          <ChevronLeft className={styles.icon} />
        </button>
      )}

      {Array.from(
        { length: rangeEnd - rangeStart + 1 },
        (_, i) => rangeStart + i
      ).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`${styles.pageButton} ${currentPage === page ? styles.active : ""}`}
        >
          {page}
        </button>
      ))}

      {rangeEnd < totalPages && (
        <button
          onClick={handleNext}
          className={`${styles.pageButton} ${styles.arrowButton}`}
          aria-label="다음 페이지"
        >
          <ChevronRight className={styles.icon} />
        </button>
      )}
    </div>
  );
};

export default Pagination;

