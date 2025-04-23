import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ReportBoard.module.css";

const ReportBoard = () => {
  const role = "admin";
  const currentUser = "user1";
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("title"); // 검색 옵션 (제목, 작성자, 내용)
  const [filteredReports, setFilteredReports] = useState([]);
  const itemsPerPage = 10;

  const reports = [
    { id: 1, title: "욕설 신고", content: "심한 욕설이 포함됨", user: "user1" },
    { id: 2, title: "광고 신고", content: "홍보 링크 포함됨", user: "user2" },
    {
      id: 3,
      title: "도배 신고",
      content: "같은 내용 반복 작성",
      user: "user1",
    },
    {
      id: 4,
      title: "불법 콘텐츠 신고",
      content: "음란물 게시됨",
      user: "user1",
    },
    { id: 5, title: "스팸 신고", content: "스팸 메시지 포함됨", user: "user2" },
    { id: 6, title: "허위 신고", content: "사실 무근", user: "user1" },
    { id: 7, title: "비방 신고", content: "허위 비방", user: "user2" },
    { id: 8, title: "욕설 신고", content: "욕설과 비방", user: "user1" },
    { id: 9, title: "광고 신고", content: "불법 광고 포함", user: "user1" },
    { id: 10, title: "도배 신고", content: "중복된 내용", user: "user1" },
    {
      id: 11,
      title: "불법 콘텐츠 신고",
      content: "음란물 게시",
      user: "user2",
    },
  ];

  // 필터링된 보고서 상태 설정
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
    // 선택된 검색 옵션에 따라 필터링된 결과 업데이트
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
    setCurrentPage(1); // 검색 후 첫 페이지로 이동
  };

  const ReportItem = ({ report }) => (
    <tr className={styles.item}>
      <td>{startIndex + report.id}</td>
      <td>
        <Link to={`/rd/${report.id}`} className={styles.itemLink}>
          {report.title}
        </Link>
      </td>
      <td>{report.user}</td>
      <td>{new Date().toLocaleDateString()}</td>
      <td>{Math.floor(Math.random() * 100)}</td>
    </tr>
  );

  return (
    <div className={styles.reportListWrapper}>
      <div className={styles.reportHeader}>
        <h2>신고 목록</h2>
      </div>

      <table className={styles.reportTable}>
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
              <td colSpan={5} className={styles.empty}>
                신고 내역이 없습니다.
              </td>
            </tr>
          ) : (
            currentReports.map((r) => <ReportItem key={r.id} report={r} />)
          )}
        </tbody>
      </table>

      <div className={styles.paginationWrapper}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.paginationButton}
        >
          {"<"}
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`${styles.paginationButton} ${
              currentPage === i + 1 ? styles.active : ""
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.paginationButton}
        >
          {">"}
        </button>
      </div>

      <div className={styles.searchWrapper}>
        <select
          value={searchOption}
          onChange={handleSearchOptionChange}
          className={styles.searchSelect}
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
          className={styles.searchInput}
        />
        <button className={styles.searchButton} onClick={handleSearchSubmit}>
          검색
        </button>
      </div>

      <div className={styles.actionWrapper}>
        <button className={styles.writeButton}>신고 작성</button>
      </div>
    </div>
  );
};

export default ReportBoard;
