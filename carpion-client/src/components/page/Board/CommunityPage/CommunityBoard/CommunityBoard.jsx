import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import cbstyles from "./CommunityBoard.module.css";
import defaultImg from "/img/cBoard/noImage.png";

const formatDate = (dateString) => {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return `${year.slice(2)}.${month}.${day}`;
};

const NoPostsMessage = () => (
  <div className={cbstyles.NoPosts}>게시글이 없습니다.</div>
);

const PostCard = React.memo(
  ({
    index,
    title,
    content,
    nickName,
    createDate,
    count,
    likes,
    reviewNo,
    type,
  }) => {
    const [fileUrls, setFileUrls] = useState([]);

    useEffect(() => {
      const fetchFileUrls = async () => {
        try {
          const response = await axios.get(
            `http://localhost:80/reviews/${reviewNo}`
          );
          const data = response.data;

          setFileUrls(data.fileUrls || []);
        } catch (err) {
          console.error("❌ 이미지 로딩 실패:", err);
        }
      };

      fetchFileUrls();
    }, [reviewNo]);

    const mainImage =
      fileUrls.length > 0
        ? `http://localhost:80/uploads/${fileUrls[0]}`
        : defaultImg;

    const formattedDate = formatDate(createDate);
    const likeCount = likes ?? 0;

    if (type === "grid") {
      return (
        <Link to={`/cd/${reviewNo}`}>
          <div className={cbstyles.GridCard}>
            <img className={cbstyles.GridImage} src={mainImage} alt="preview" />
            <div className={cbstyles.GridTitle}>{title}</div>
          </div>
        </Link>
      );
    }

    if (type === "thumbnail") {
      return (
        <Link to={`/cd/${reviewNo}`}>
          <div className={cbstyles.ThumbnailWrapper}>
            <img
              className={cbstyles.ThumbnailImg}
              src={mainImage}
              alt="thumb"
            />
            <div className={cbstyles.TextInfo}>
              <h2>{title}</h2>
              <p>{content}</p>
              <div className={cbstyles.ThumbnailMeta}>
                <span className={cbstyles.author}>작성자: {nickName}</span>
                <span className={cbstyles.date}>작성일: {formattedDate}</span>
                <span className={cbstyles.views}>조회수: {count}</span>
                <span className={cbstyles.likes}>좋아요: {likeCount}</span>
              </div>
            </div>
          </div>
        </Link>
      );
    }

    return (
      <tr className={cbstyles.PostRow}>
        <td className={cbstyles.PostCell}>{index}</td>
        <td className={cbstyles.PostCell}>
          <Link to={`/cd/${reviewNo}`}>{title}</Link>
        </td>
        <td className={cbstyles.PostCell}>{nickName}</td>
        <td className={cbstyles.PostCell}>{formattedDate}</td>
        <td className={cbstyles.PostCell}>{count}</td>
        <td className={cbstyles.PostCell}>{likeCount}</td>
      </tr>
    );
  }
);

const CommunityBoard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const initialViewType = searchParams.get("viewType") || "grid";

  const [viewType, setViewType] = useState(initialViewType);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [reviews, setReviews] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const itemsPerPage =
    viewType === "grid" ? 16 : viewType === "thumbnail" ? 5 : 10;

  const fetchReviews = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:80/reviews", {
        params: { page, type: viewType },
      });
      const data = response.data;
      setReviews(data.list);
      setTotalPages(data.maxPage);
    } catch (err) {
      console.error("❌ 데이터 로딩 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!searchParams.has("page")) {
      setSearchParams({ page: "1" });
    }
    fetchReviews(currentPage);
  }, [currentPage, viewType, searchParams]);

  const handlePageChange = useCallback(
    (pageNumber) => {
      if (pageNumber < 1 || pageNumber > totalPages) return;
      setCurrentPage(pageNumber);
      setSearchParams({ page: pageNumber, viewType });
    },
    [totalPages, setSearchParams, viewType]
  );

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  const currentPosts = reviews;

  const handleViewTypeChange = (type) => {
    setViewType(type);
    setSearchParams({ page: currentPage, viewType: type });
  };

  return (
    <div className={cbstyles.BoardContainer}>
      <div className={cbstyles.ButtonGroup}>
        <button
          className={`${cbstyles.ViewButton} ${
            viewType === "grid" ? cbstyles.active : ""
          }`}
          onClick={() => handleViewTypeChange("grid")}
        >
          바둑판형
        </button>
        <button
          className={`${cbstyles.ViewButton} ${
            viewType === "thumbnail" ? cbstyles.active : ""
          }`}
          onClick={() => handleViewTypeChange("thumbnail")}
        >
          썸네일형
        </button>
        <button
          className={`${cbstyles.ViewButton} ${
            viewType === "text" ? cbstyles.active : ""
          }`}
          onClick={() => handleViewTypeChange("text")}
        >
          텍스트형
        </button>
      </div>

      {viewType === "grid" && (
        <div className={cbstyles.GridContainer}>
          {loading ? (
            <div className={cbstyles.Loading}>로딩 중...</div>
          ) : currentPosts.length === 0 ? (
            <NoPostsMessage />
          ) : (
            currentPosts.map((post, index) => (
              <PostCard
                key={post.reviewNo}
                index={index + 1}
                {...post}
                type="grid"
              />
            ))
          )}
        </div>
      )}

      {viewType === "thumbnail" && (
        <div className={cbstyles.ThumbnailContainer}>
          {loading ? (
            <div className={cbstyles.Loading}>로딩 중...</div>
          ) : currentPosts.length === 0 ? (
            <NoPostsMessage />
          ) : (
            currentPosts.map((post, index) => (
              <PostCard
                key={post.reviewNo}
                index={index + 1}
                {...post}
                type="thumbnail"
              />
            ))
          )}
        </div>
      )}

      {viewType === "text" && (
        <table className={cbstyles.PostTable}>
          <thead>
            <tr>
              <th className={cbstyles.PostCell}>번호</th>
              <th className={cbstyles.PostCell}>제목</th>
              <th className={cbstyles.PostCell}>작성자</th>
              <th className={cbstyles.PostCell}>작성일</th>
              <th className={cbstyles.PostCell}>조회수</th>
              <th className={cbstyles.PostCell}>좋아요</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6}>
                  <div className={cbstyles.Loading}>로딩 중...</div>
                </td>
              </tr>
            ) : currentPosts.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <NoPostsMessage />
                </td>
              </tr>
            ) : (
              currentPosts.map((post, index) => (
                <PostCard
                  key={post.reviewNo}
                  index={index + 1}
                  {...post}
                  type="text"
                />
              ))
            )}
          </tbody>
        </table>
      )}

      <div className={cbstyles.paginationWrapper}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cbstyles.paginationButton}
        >
          {"<"}
        </button>
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(page)}
            className={`${cbstyles.paginationButton} ${
              currentPage === page ? cbstyles.active : ""
            }`}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cbstyles.paginationButton}
        >
          {">"}
        </button>
      </div>

      <div className={cbstyles.ActionWrapper}>
        <Link to="/cw">
          <button className={cbstyles.WriteButton}>작성하기</button>
        </Link>
      </div>
    </div>
  );
};

export default CommunityBoard;
