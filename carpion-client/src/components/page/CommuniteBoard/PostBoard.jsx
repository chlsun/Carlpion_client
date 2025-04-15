import React, { useState } from "react";
import { yul } from "./PostBoard.styles";

import img1 from "/img/cBoard/img1.jpg";
import img2 from "/img/cBoard/img2.jpg";
import img3 from "/img/cBoard/img3.jpg";
import defaultImg from "/img/cBoard/noImage.png";

const posts = [
  {
    title: "풍경 사진 모음",
    content: "여기저기 여행 다녀왔어요.",
    NIKNAME: "홍길동",
    date: "2025-04-11",
    COUNT: 123,
    likes: 45,
    images: [img1, img2, img3],
  },
  {
    title: "차 후기",
    content: "조용하고 분위기 좋은 곳이었어요.",
    NIKNAME: "김철수",
    date: "2025-04-12",
    COUNT: 78,
    likes: 30,
    images: [img2],
  },
  {
    title: "공지사항",
    content: "5월 1일은 근로자의 날입니다.",
    NIKNAME: "관리자",
    date: "2025-04-10",
    COUNT: 200,
    likes: 80,
    images: [],
  },
  {
    title: "풍경 사진 모음",
    content: "여기저기 여행 다녀왔어요.",
    NIKNAME: "홍길동",
    date: "2025-04-11",
    COUNT: 123,
    likes: 45,
    images: [img3, img1, img2],
  },
  {
    title: "카페 방문기",
    content: "조용하고 분위기 좋은 곳이었어요.",
    NIKNAME: "김철수",
    date: "2025-04-12",
    COUNT: 78,
    likes: 30,
    images: [img2],
  },
  {
    title: "공지사항",
    content: "5월 1일은 근로자의 날입니다.",
    NIKNAME: "관리자",
    date: "2025-04-10",
    COUNT: 200,
    likes: 80,
    images: [],
  },
];

const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return `${year.slice(2)}.${month}.${day}`;
};

const PostCard = ({
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
      <yul.GridCard>
        <yul.GridImage src={mainImage} alt="preview" />
        <yul.GridTitle>{title}</yul.GridTitle>
      </yul.GridCard>
    );
  }

  if (type === "thumbnail") {
    return (
      <table>
        <tbody>
          <yul.PostRow>
            <yul.PostCell colSpan={6}>
              <yul.ThumbnailWrapper>
                <yul.ThumbnailImg src={mainImage} alt="thumb" />
                <yul.TextInfo>
                  <h2>{title}</h2>
                  <p>{content}</p>
                  <div className="thumbnail-meta">
                    <span>작성자: {NIKNAME}</span>
                    <span>작성일: {formatDate(date)}</span>
                    <span>조회수: {COUNT}</span>
                    <span>좋아요: {likes}</span>
                  </div>
                </yul.TextInfo>
              </yul.ThumbnailWrapper>
            </yul.PostCell>
          </yul.PostRow>
        </tbody>
      </table>
    );
  }

  return (
    <yul.PostRow>
      <yul.PostCell>{index + 1}</yul.PostCell>
      <yul.PostCell>{title}</yul.PostCell>
      <yul.PostCell>{NIKNAME}</yul.PostCell>
      <yul.PostCell>{formatDate(date)}</yul.PostCell>
      <yul.PostCell>{COUNT}</yul.PostCell>
      <yul.PostCell>{likes}</yul.PostCell>
    </yul.PostRow>
  );
};

const PostBoard = () => {
  const [viewType, setViewType] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchType, setSearchType] = useState("title");
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage =
    viewType === "grid" ? 16 : viewType === "thumbnail" ? 5 : 10;

  const totalPages = Math.ceil(posts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, posts.length);
  const currentPosts = posts.slice(startIndex, endIndex);

  const handleSearch = () => {
    console.log(`검색: ${searchType} - ${searchTerm}`);
  };

  return (
    <yul.BoardContainer>
      <yul.ActionWrapper>
        <yul.WriteButton>작성하기</yul.WriteButton>
      </yul.ActionWrapper>
      <yul.ButtonGroup>
        <yul.ViewButton
          active={viewType === "grid"}
          onClick={() => setViewType("grid")}
        >
          바둑판형
        </yul.ViewButton>
        <yul.ViewButton
          active={viewType === "thumbnail"}
          onClick={() => setViewType("thumbnail")}
        >
          썸네일형
        </yul.ViewButton>
        <yul.ViewButton
          active={viewType === "text"}
          onClick={() => setViewType("text")}
        >
          텍스트형
        </yul.ViewButton>
      </yul.ButtonGroup>

      {viewType === "grid" && (
        <yul.GridContainer>
          {currentPosts.map((post, idx) => (
            <PostCard
              key={idx}
              type="grid"
              index={startIndex + idx}
              title={post.title}
              content={post.content}
              NIKNAME={post.NIKNAME}
              date={post.date}
              COUNT={post.COUNT}
              likes={post.likes}
              images={post.images}
            />
          ))}
        </yul.GridContainer>
      )}

      {viewType === "thumbnail" && (
        <div className="thumbnail-container">
          {currentPosts.map((post, idx) => (
            <PostCard
              key={idx}
              type="thumbnail"
              index={startIndex + idx}
              title={post.title}
              content={post.content}
              NIKNAME={post.NIKNAME}
              date={post.date}
              COUNT={post.COUNT}
              likes={post.likes}
              images={post.images}
            />
          ))}
        </div>
      )}

      {viewType === "text" && (
        <yul.PostTable>
          <thead>
            <tr>
              <yul.PostCell as="th">번호</yul.PostCell>
              <yul.PostCell as="th">제목</yul.PostCell>
              <yul.PostCell as="th">작성자</yul.PostCell>
              <yul.PostCell as="th">작성일</yul.PostCell>
              <yul.PostCell as="th">조회수</yul.PostCell>
              <yul.PostCell as="th">좋아요</yul.PostCell>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((post, idx) => (
              <yul.PostRow key={idx}>
                <yul.PostCell>{startIndex + idx + 1}</yul.PostCell>
                <yul.PostCell>{post.title}</yul.PostCell>
                <yul.PostCell>{post.NIKNAME}</yul.PostCell>
                <yul.PostCell>{formatDate(post.date)}</yul.PostCell>
                <yul.PostCell>{post.COUNT}</yul.PostCell>
                <yul.PostCell>{post.likes}</yul.PostCell>
              </yul.PostRow>
            ))}
          </tbody>
        </yul.PostTable>
      )}

      <yul.PaginationWrapper>
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          ≪
        </button>

        <button
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>

        {totalPages <= 5 ? (
          Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))
        ) : (
          <>
            {currentPage > 2 && (
              <>
                <button onClick={() => handlePageChange(1)}>1</button>
                <span style={{ padding: "6px 4px", color: "#888" }}>...</span>
              </>
            )}

            {currentPage - 1 > 0 && (
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className={currentPage === currentPage - 1 ? "active" : ""}
              >
                {currentPage - 1}
              </button>
            )}

            <button
              className="active"
              onClick={() => handlePageChange(currentPage)}
            >
              {currentPage}
            </button>

            {currentPage + 1 <= totalPages && (
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className={currentPage === currentPage + 1 ? "active" : ""}
              >
                {currentPage + 1}
              </button>
            )}

            {currentPage < totalPages - 1 && (
              <>
                <span style={{ padding: "6px 4px", color: "#888" }}>...</span>
                <button onClick={() => handlePageChange(totalPages)}>
                  {totalPages}
                </button>
              </>
            )}
          </>
        )}

        <button
          onClick={() =>
            handlePageChange(Math.min(currentPage + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>

        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          ≫
        </button>
      </yul.PaginationWrapper>

      <yul.ActionWrapper>
        <yul.WriteButton>작성하기</yul.WriteButton>
      </yul.ActionWrapper>
      <yul.SearchWrapper>
        <yul.SelectBox
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="title">제목</option>
          <option value="NIKNAME">작성자</option>
          <option value="content">내용</option>
        </yul.SelectBox>
        <yul.SearchInput
          type="text"
          placeholder="검색어를 입력하세요..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <yul.SearchButton onClick={handleSearch}>검색</yul.SearchButton>
      </yul.SearchWrapper>
    </yul.BoardContainer>
  );
};

export default PostBoard;
