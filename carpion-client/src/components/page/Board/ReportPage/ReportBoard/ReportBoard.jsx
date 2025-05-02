import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import rbstyles from "./ReportBoard.module.css";

const ReportBoard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [reports, setReports] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [startBtn, setStartBtn] = useState(1);
  const [endBtn, setEndBtn] = useState(1);

  const itemsPerPage = 10;

  useEffect(() => {
    fetchReports(currentPage);
  }, [currentPage]);

  const fetchReports = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:80/reports?page=${page}`
      );
      const data = response.data;
      console.log("리스폰", response.data);
      setReports(data.list);
      setTotalPages(data.maxPage);
      setStartBtn(data.startBtn);
      setEndBtn(data.endBtn);
    } catch (err) {
      console.error("❌ 데이터 로딩 실패:", err);
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    setSearchParams({ page: pageNumber });
  };

  const getPageNumbers = () => {
    let pages = [];
    if (totalPages <= 5) {
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
          {reports.length === 0 ? (
            <tr>
              <td colSpan={5} className={rbstyles.empty}>
                신고 내역이 없습니다.
              </td>
            </tr>
          ) : (
            reports.map((r, i) => (
              <ReportItem key={r.reportNo} report={r} index={i} />
            ))
          )}
        </tbody>
      </table>

      <div className={rbstyles.paginationWrapper}>
        {currentPage > 3 && totalPages > 5 && (
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
            onClick={() => handlePageChange(page)}
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

        {currentPage < totalPages - 2 && totalPages > 5 && (
          <button
            onClick={() => handlePageChange(totalPages)}
            className={rbstyles.paginationButton}
          >
            {"»"}
          </button>
        )}
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
