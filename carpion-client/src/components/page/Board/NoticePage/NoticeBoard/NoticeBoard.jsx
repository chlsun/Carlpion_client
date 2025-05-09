import React, { useState, useEffect, useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import nbstyles from "./NoticeBoard.module.css";
import CustomerBanner from "/img/notice/안내.jpg";
import { AuthContext } from "../../../Context/AuthContext";

const NoticeItem = ({ notice }) => (
  <li className={nbstyles.item}>
    <Link to={`/nd/${notice.noticeNo}`} className={nbstyles.itemLink}>
      <div className={nbstyles.itemHeader}>
        <span className={nbstyles.itemTitle}>{notice.title}</span>
        <div className={nbstyles.rightBox}>
          <span className={nbstyles.itemDate}>{notice.createDate}</span>
        </div>
      </div>
    </Link>
  </li>
);

const NoticeBoard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page")) || 1;

  const [notices, setNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [startBtn, setStartBtn] = useState(1);
  const [endBtn, setEndBtn] = useState(1);
  const itemsPerPage = 10;

  const { isAdmin } = useContext(AuthContext);

  useEffect(() => {
    fetchNotices(currentPage);
  }, [currentPage]);

  const fetchNotices = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:80/notice?page=${page}`
      );
      const data = response.data;
      console.log("공지사항 응답:", data);
      setNotices(data.list);
      setTotalPages(data.maxPage);
      setStartBtn(data.startBtn);
      setEndBtn(data.endBtn);
    } catch (error) {
      console.error("데이터 로딩 실패:", error);
    }
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    setSearchParams({ page });
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

  return (
    <div className={nbstyles.noticeBoard}>
      <div className={nbstyles.banner}>
        <img src={CustomerBanner} alt="고객센터 배너" />
        <div className={nbstyles.bannerText}>고객센터</div>
      </div>

      <div className={nbstyles.container}>
        <div className={nbstyles.titleRow}>
          <img
            src="/img/notice/사이렌.png"
            alt="공지 아이콘"
            className={nbstyles.titleIcon}
          />
          <h2 className={nbstyles.title}>공지사항</h2>
          {isAdmin && (
            <Link to="/nw" className={nbstyles.writeButton}>
              작성
            </Link>
          )}
        </div>

        <ul className={nbstyles.list}>
          {notices.length === 0 ? (
            <li className={nbstyles.item}>게시글이 없습니다.</li>
          ) : (
            notices.map((notice) => (
              <NoticeItem key={notice.noticeNo} notice={notice} />
            ))
          )}
        </ul>

        {/* Pagination */}
        <div className={nbstyles.paginationWrapper}>
          {currentPage > 3 && totalPages > 5 && (
            <button
              onClick={() => handlePageChange(1)}
              className={nbstyles.paginationButton}
            >
              {"«"}
            </button>
          )}

          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={nbstyles.paginationButton}
          >
            {"<"}
          </button>

          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              className={`${nbstyles.paginationButton} ${
                currentPage === page ? nbstyles.active : ""
              }`}
              disabled={page === "..."}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={nbstyles.paginationButton}
          >
            {">"}
          </button>

          {currentPage < totalPages - 2 && totalPages > 5 && (
            <button
              onClick={() => handlePageChange(totalPages)}
              className={nbstyles.paginationButton}
            >
              {"»"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard;
