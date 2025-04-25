import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import rbstyles from "./ReportBoard.module.css";

const ReportBoard = () => {
  const role = "admin";
  const currentUser = "user1";

  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const [searchQuery, setSearchQuery] = useState(""); // 검색 쿼리 상태
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]); // 필터된 보고서
  const [totalPages, setTotalPages] = useState(15); // 총 페이지 수
  const itemsPerPage = 10;

  useEffect(() => {
    fetchReports(currentPage);
  }, [currentPage]);

  useEffect(() => {
    // 처음 로딩 시에는 필터된 보고서를 전체로 설정
    setFilteredReports(reports);
  }, [reports]);

  const fetchReports = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:80/reports?page=${page - 1}`
      );
      setReports(response.data);
      // 서버에서 총 페이지 수도 주면 여기서 setTotalPages(response.data.totalPages) 가능
    } catch (err) {
      console.error("❌ 데이터 로딩 실패:", err);
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    setSearchParams({ page: pageNumber });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // 입력값 업데이트
  };

  const handleSearchSubmit = () => {
    // 검색 버튼 클릭 시 검색을 진행
    if (searchQuery) {
      const filtered = reports.filter((report) =>
        report.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredReports(filtered);
    } else {
      setFilteredReports(reports); // 검색어가 없으면 전체 보고서로 복귀
    }
  };

  const getPageNumbers = () => {
    const maxPages = 5;
    let pages = [];
    if (totalPages <= maxPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, "...", totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [1, "...", totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        ];
      }
    }
    return pages;
  };

  const ReportItem = ({ report, index }) => (
    <tr className={rbstyles.item}>
      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
      <td>
        <Link to={`/rd/${report.reportNo}`} className={rbstyles.itemLink}>
          {report.title}
        </Link>
      </td>
      <td>{report.nickName}</td>
      <td>{new Date(report.createDate).toLocaleDateString()}</td>
      <td>{report.count}</td>
    </tr>
  );

  const hasLeftEllipsis = getPageNumbers().includes("...") && currentPage > 3;
  const hasRightEllipsis =
    getPageNumbers().includes("...") && currentPage < totalPages - 2;

  return (
    <div className={rbstyles.reportListWrapper}>
      <div className={rbstyles.reportHeader}>
        <h2>신고 목록</h2>
      </div>

      <table className={rbstyles.reportTable}>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.length === 0 ? (
            <tr>
              <td colSpan={5} className={rbstyles.empty}>
                신고 내역이 없습니다.
              </td>
            </tr>
          ) : (
            filteredReports.map((r, i) => (
              <ReportItem key={r.reportNo} report={r} index={i} />
            ))
          )}
        </tbody>
      </table>

      <div className={rbstyles.paginationWrapper}>
        {hasLeftEllipsis && (
          <button
            onClick={() => handlePageChange(1)}
            className={rbstyles.paginationButton}
          >
            {"«"}
          </button>
        )}

        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={rbstyles.paginationButton}
        >
          {"<"}
        </button>

        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => {
              if (page !== "...") handlePageChange(page);
            }}
            className={`${rbstyles.paginationButton} ${
              currentPage === page ? rbstyles.active : ""
            }`}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={rbstyles.paginationButton}
        >
          {">"}
        </button>

        {hasRightEllipsis && (
          <button
            onClick={() => handlePageChange(totalPages)}
            className={rbstyles.paginationButton}
          >
            {"»"}
          </button>
        )}
      </div>

      {/* 검색 입력 및 버튼 */}
      <div className={rbstyles.searchWrapper}>
        <input
          type="text"
          className={rbstyles.searchInput}
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="검색어를 입력하세요..."
        />
        <button className={rbstyles.searchButton} onClick={handleSearchSubmit}>
          검색
        </button>
      </div>

      <div className={rbstyles.actionWrapper}>
        <Link to="/rw" className={rbstyles.writeButton}>
          신고 작성
        </Link>
      </div>
    </div>
  );
};

export default ReportBoard;
