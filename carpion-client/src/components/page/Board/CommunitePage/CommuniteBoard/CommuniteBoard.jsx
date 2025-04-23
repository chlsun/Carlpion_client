import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./CommuniteBoard.module.css";

import defaultImg from "/img/cBoard/noImage.png";

const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return `${year.slice(2)}.${month}.${day}`;
};

const PostCard = ({
  id,
  type,
  index,
  title,
  content,
  NIKNAME,
  date,
  COUNT,
  likes,
  images = [],
}) => {
  const mainImage = images.length > 0 ? images[0] : defaultImg;

  if (type === "grid") {
    return (
      <Link to={`/cd/${id}`}>
        <div className={styles.GridCard}>
          <img className={styles.GridImage} src={mainImage} alt="preview" />
          <div className={styles.GridTitle}>{title}</div>
        </div>
      </Link>
    );
  }

  if (type === "thumbnail") {
    return (
      <Link to={`/cd/${id}`}>
        <table>
          <tbody>
            <tr className={styles.PostRow}>
              <td className={styles.PostCell} colSpan={6}>
                <div className={styles.ThumbnailWrapper}>
                  <img
                    className={styles.ThumbnailImg}
                    src={mainImage}
                    alt="thumb"
                  />
                  <div className={styles.TextInfo}>
                    <h2>{title}</h2>
                    <p>{content}</p>
                    <div className={styles.ThumbnailMeta}>
                      <span>작성자: {NIKNAME}</span>
                      <span>작성일: {formatDate(date)}</span>
                      <span>조회수: {COUNT}</span>
                      <span>좋아요: {likes}</span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </Link>
    );
  }

  return (
    <tr className={styles.PostRow}>
      <td className={styles.PostCell}>{index + 1}</td>
      <td className={styles.PostCell}>
        <Link to={`/cd/${id}`}>{title}</Link>
      </td>
      <td className={styles.PostCell}>{NIKNAME}</td>
      <td className={styles.PostCell}>{formatDate(date)}</td>
      <td className={styles.PostCell}>{COUNT}</td>
      <td className={styles.PostCell}>{likes}</td>
    </tr>
  );
};

const CommuniteBoard = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [viewType, setViewType] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchType, setSearchType] = useState("title");
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage =
    viewType === "grid" ? 16 : viewType === "thumbnail" ? 5 : 10;

  const fetchPosts = async () => {
    try {
      const response = await axios.get("/reviews");
      const data = response.data.map((item, index) => ({
        id: index + 1,
        title: item.TITLE,
        content: item.CONTENT,
        NIKNAME: item.NICKNAME,
        date: item.CREATE_DATE,
        COUNT: item.COUNT,
        likes: item.LIKES ?? 0,
        images: item.IMAGES || [],
      }));
      setPosts(data);
      setFilteredPosts(data);
    } catch (error) {
      console.error("데이터 로딩 실패:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearch = () => {
    const filtered = posts.filter((post) => {
      const field = post[searchType] || "";
      return field.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredPosts(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / itemsPerPage)
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.BoardContainer}>
      <div className={styles.ActionWrapper}>
        <button className={styles.WriteButton}>작성하기</button>
      </div>

      <div className={styles.ButtonGroup}>
        <button
          className={`${styles.ViewButton} ${
            viewType === "grid" ? styles.active : ""
          }`}
          onClick={() => setViewType("grid")}
        >
          바둑판형
        </button>
        <button
          className={`${styles.ViewButton} ${
            viewType === "thumbnail" ? styles.active : ""
          }`}
          onClick={() => setViewType("thumbnail")}
        >
          썸네일형
        </button>
        <button
          className={`${styles.ViewButton} ${
            viewType === "text" ? styles.active : ""
          }`}
          onClick={() => setViewType("text")}
        >
          텍스트형
        </button>
      </div>

      {viewType === "grid" && (
        <div className={styles.GridContainer}>
          {currentPosts.length === 0 ? (
            <div className={styles.NoPosts}>게시글이 없습니다.</div>
          ) : (
            currentPosts.map((post, idx) => (
              <PostCard
                key={post.id}
                {...post}
                type="grid"
                index={startIndex + idx}
              />
            ))
          )}
        </div>
      )}

      {viewType === "thumbnail" && (
        <div className={styles.ThumbnailContainer}>
          {currentPosts.length === 0 ? (
            <div className={styles.NoPosts}>게시글이 없습니다.</div>
          ) : (
            currentPosts.map((post, idx) => (
              <PostCard
                key={post.id}
                {...post}
                type="thumbnail"
                index={startIndex + idx}
              />
            ))
          )}
        </div>
      )}

      {viewType === "text" && (
        <table className={styles.PostTable}>
          <thead>
            <tr>
              <th className={styles.PostCell}>번호</th>
              <th className={styles.PostCell}>제목</th>
              <th className={styles.PostCell}>작성자</th>
              <th className={styles.PostCell}>작성일</th>
              <th className={styles.PostCell}>조회수</th>
              <th className={styles.PostCell}>좋아요</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.length === 0 ? (
              <tr>
                <td colSpan={6} className={styles.NoPosts}>
                  게시글이 없습니다.
                </td>
              </tr>
            ) : (
              currentPosts.map((post, idx) => (
                <PostCard
                  key={post.id}
                  {...post}
                  type="text"
                  index={startIndex + idx}
                />
              ))
            )}
          </tbody>
        </table>
      )}

      <div className={styles.PaginationWrapper}>
        {totalPages > 5 && (
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            ≪
          </button>
        )}

        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>

        {totalPages <= 5
          ? Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={currentPage === i + 1 ? styles.active : ""}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))
          : (() => {
              const elements = [];

              if (currentPage > 2) {
                elements.push(
                  <button key="first" onClick={() => handlePageChange(1)}>
                    1
                  </button>,
                  <span key="dots1" className={styles.Dots}>
                    ...
                  </span>
                );
              }

              if (currentPage > 1) {
                elements.push(
                  <button
                    key="prev"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    {currentPage - 1}
                  </button>
                );
              }

              elements.push(
                <button key="current" className={styles.active}>
                  {currentPage}
                </button>
              );

              if (currentPage < totalPages) {
                elements.push(
                  <button
                    key="next"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    {currentPage + 1}
                  </button>
                );
              }

              if (currentPage < totalPages - 1) {
                elements.push(
                  <span key="dots2" className={styles.Dots}>
                    ...
                  </span>,
                  <button
                    key="last"
                    onClick={() => handlePageChange(totalPages)}
                  >
                    {totalPages}
                  </button>
                );
              }

              return elements;
            })()}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>

        {totalPages > 5 && (
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            ≫
          </button>
        )}
      </div>

      <div className={styles.ActionWrapper}>
        <button className={styles.WriteButton}>작성하기</button>
      </div>

      <div className={styles.SearchWrapper}>
        <select
          className={styles.SelectBox}
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="title">제목</option>
          <option value="NIKNAME">작성자</option>
          <option value="content">내용</option>
        </select>
        <input
          className={styles.SearchInput}
          type="text"
          placeholder="검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className={styles.SearchButton} onClick={handleSearch}>
          검색
        </button>
      </div>
    </div>
  );
};

export default CommuniteBoard;
