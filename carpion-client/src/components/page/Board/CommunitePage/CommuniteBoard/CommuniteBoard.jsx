import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as cm from "./CommuniteBoard.styles";

import img1 from "/img/cBoard/img1.jpg";
import img2 from "/img/cBoard/img2.jpg";
import img3 from "/img/cBoard/img3.jpg";
import defaultImg from "/img/cBoard/noImage.png";

const posts = [
  {
    id: 1,
    title: "풍경 사진 모음",
    content: "여기저기 여행 다녀왔어요.",
    NIKNAME: "홍길동",
    date: "2025-04-11",
    COUNT: 123,
    likes: 45,
    images: [img1, img2, img3],
  },
  {
    id: 2,
    title: "차 후기",
    content: "조용하고 분위기 좋은 곳이었어요.",
    NIKNAME: "김철수",
    date: "2025-04-12",
    COUNT: 78,
    likes: 30,
    images: [img2],
  },
  {
    id: 3,
    title: "공지사항",
    content: "5월 1일은 근로자의 날입니다.",
    NIKNAME: "관리자",
    date: "2025-04-10",
    COUNT: 200,
    likes: 80,
    images: [],
  },
  {
    id: 4,
    title: "풍경 사진 모음",
    content: "여기저기 여행 다녀왔어요.",
    NIKNAME: "홍길동",
    date: "2025-04-11",
    COUNT: 123,
    likes: 45,
    images: [img3, img1, img2],
  },
  {
    id: 5,
    title: "카페 방문기",
    content: "조용하고 분위기 좋은 곳이었어요.",
    NIKNAME: "김철수",
    date: "2025-04-12",
    COUNT: 78,
    likes: 30,
    images: [img2],
  },
  {
    id: 6,
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
        <cm.GridCard>
          <cm.GridImage src={mainImage} alt="preview" />
          <cm.GridTitle>{title}</cm.GridTitle>
        </cm.GridCard>
      </Link>
    );
  }

  if (type === "thumbnail") {
    return (
      <Link to={`/cd/${id}`}>
        <table>
          <tbody>
            <cm.PostRow>
              <cm.PostCell colSpan={6}>
                <cm.ThumbnailWrapper>
                  <cm.ThumbnailImg src={mainImage} alt="thumb" />
                  <cm.TextInfo>
                    <h2>{title}</h2>
                    <p>{content}</p>
                    <div className="thumbnail-meta">
                      <span>작성자: {NIKNAME}</span>
                      <span>작성일: {formatDate(date)}</span>
                      <span>조회수: {COUNT}</span>
                      <span>좋아요: {likes}</span>
                    </div>
                  </cm.TextInfo>
                </cm.ThumbnailWrapper>
              </cm.PostCell>
            </cm.PostRow>
          </tbody>
        </table>
      </Link>
    );
  }

  return (
    <cm.PostRow>
      <cm.PostCell>{index + 1}</cm.PostCell>
      <cm.PostCell>
        <Link to={`/cd/${id}`}>{title}</Link>
      </cm.PostCell>
      <cm.PostCell>{NIKNAME}</cm.PostCell>
      <cm.PostCell>{formatDate(date)}</cm.PostCell>
      <cm.PostCell>{COUNT}</cm.PostCell>
      <cm.PostCell>{likes}</cm.PostCell>
    </cm.PostRow>
  );
};

const CommuniteBoard = () => {
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
    <cm.BoardContainer>
      <cm.ActionWrapper>
        <cm.WriteButton>작성하기</cm.WriteButton>
      </cm.ActionWrapper>

      <cm.ButtonGroup>
        <cm.ViewButton
          active={viewType === "grid"}
          onClick={() => setViewType("grid")}
        >
          바둑판형
        </cm.ViewButton>
        <cm.ViewButton
          active={viewType === "thumbnail"}
          onClick={() => setViewType("thumbnail")}
        >
          썸네일형
        </cm.ViewButton>
        <cm.ViewButton
          active={viewType === "text"}
          onClick={() => setViewType("text")}
        >
          텍스트형
        </cm.ViewButton>
      </cm.ButtonGroup>

      {viewType === "grid" && (
        <cm.GridContainer>
          {currentPosts.map((post, idx) => (
            <PostCard
              key={post.id}
              id={post.id}
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
        </cm.GridContainer>
      )}

      {viewType === "thumbnail" && (
        <div className="thumbnail-container">
          {currentPosts.map((post, idx) => (
            <PostCard
              key={post.id}
              id={post.id}
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
        <cm.PostTable>
          <thead>
            <tr>
              <cm.PostCell as="th">번호</cm.PostCell>
              <cm.PostCell as="th">제목</cm.PostCell>
              <cm.PostCell as="th">작성자</cm.PostCell>
              <cm.PostCell as="th">작성일</cm.PostCell>
              <cm.PostCell as="th">조회수</cm.PostCell>
              <cm.PostCell as="th">좋아요</cm.PostCell>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((post, idx) => (
              <PostCard
                key={post.id}
                id={post.id}
                type="text"
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
          </tbody>
        </cm.PostTable>
      )}

      <cm.PaginationWrapper>
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          ≪
        </button>
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
                className={currentPage === i + 1 ? "active" : ""}
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
                  <span
                    key="dots1"
                    style={{ padding: "6px 4px", color: "#888" }}
                  >
                    ...
                  </span>
                );
              }

              if (currentPage - 1 > 0) {
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
                <button key="current" className="active">
                  {currentPage}
                </button>
              );

              if (currentPage + 1 <= totalPages) {
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
                  <span
                    key="dots2"
                    style={{ padding: "6px 4px", color: "#888" }}
                  >
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
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          ≫
        </button>
      </cm.PaginationWrapper>

      <cm.ActionWrapper>
        <cm.WriteButton>작성하기</cm.WriteButton>
      </cm.ActionWrapper>

      <cm.SearchWrapper>
        <cm.SelectBox
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="title">제목</option>
          <option value="NIKNAME">작성자</option>
          <option value="content">내용</option>
        </cm.SelectBox>
        <cm.SearchInput
          type="text"
          placeholder="검색어를 입력하세요..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <cm.SearchButton onClick={handleSearch}>검색</cm.SearchButton>
      </cm.SearchWrapper>
    </cm.BoardContainer>
  );
};

export default CommuniteBoard;
