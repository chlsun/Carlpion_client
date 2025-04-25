import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import rbstyles from "./ReportBoard.module.css";

const ReportBoard = () => {
  const role = "admin";
  const currentUser = "user1";
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("title");
  const [filteredReports, setFilteredReports] = useState([]);
  const [reports, setReports] = useState([]);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("http://localhost:80/reports");
        setReports(response.data);
      } catch (err) {
        console.error("데이터 로딩 실패:", err);
      }
    };
    fetchReports();
  }, []);

  const visibleReports =
    role === "admin"
      ? filteredReports.length > 0
        ? filteredReports
        : reports
      : filteredReports.length > 0
      ? filteredReports.filter((r) => r.user === currentUser)
      : reports.filter((r) => r.user === currentUser);

  const totalPages = Math.ceil(visibleReports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentReports = visibleReports.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchOptionChange = (e) => {
    setSearchOption(e.target.value);
  };

  const handleSearchSubmit = () => {
    const filtered = reports.filter((r) => {
      if (searchOption === "title") {
        return r.title.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (searchOption === "user") {
        return r.user.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (searchOption === "content") {
        return r.content.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return false;
    });
    setFilteredReports(filtered);
    setCurrentPage(1);
  };

  const ReportItem = ({ report }) => (
    <tr className={rbstyles.item}>
      <td>{startIndex + report.reportNo}</td>
      <td>
        <Link to={`/rd/${report.reportNo}`} className={rbstyles.itemLink}>
          {report.title}
        </Link>
      </td>
      <td>{report.user}</td>
      <td>{new Date().toLocaleDateString()}</td>
      <td>{Math.floor(Math.random() * 100)}</td>
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
          {currentReports.length === 0 ? (
            <tr>
              <td colSpan={5} className={rbstyles.empty}>
                신고 내역이 없습니다.
              </td>
            </tr>
          ) : (
            currentReports.map((r) => (
              <ReportItem key={r.reportNo} report={r} />
            ))
          )}
        </tbody>
      </table>

      <div className={rbstyles.paginationWrapper}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={rbstyles.paginationButton}
        >
          {"<"}
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`${rbstyles.paginationButton} ${
              currentPage === i + 1 ? rbstyles.active : ""
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={rbstyles.paginationButton}
        >
          {">"}
        </button>
      </div>

      <div className={rbstyles.searchWrapper}>
        <select
          value={searchOption}
          onChange={handleSearchOptionChange}
          className={rbstyles.searchSelect}
        >
          <option value="title">제목</option>
          <option value="user">작성자</option>
          <option value="content">내용</option>
        </select>

        <input
          type="text"
          placeholder="검색"
          value={searchTerm}
          onChange={handleSearchChange}
          className={rbstyles.searchInput}
        />
        <button className={rbstyles.searchButton} onClick={handleSearchSubmit}>
          검색
        </button>
      </div>

      <div className={rbstyles.actionWrapper}>
        <button className={rbstyles.writeButton}>신고 작성</button>
      </div>
    </div>
  );
};

export default ReportBoard;
