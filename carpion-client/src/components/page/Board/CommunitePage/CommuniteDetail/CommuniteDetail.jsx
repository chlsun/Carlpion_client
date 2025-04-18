import React, { useState } from "react";
import "./CommuniteDetail.css";
import img1 from "/img/cBoard/img1.jpg";
import img2 from "/img/cBoard/img2.jpg";
import img3 from "/img/cBoard/img3.jpg";
import CommuniteReply from "../CommuniteReply/CommuniteReply";
function CommuniteDetail() {
  const post = {
    title: "커뮤니티 글 제목 예시입니다",
    content: "여기에 본문 내용이 들어갑니다.\n줄바꿈도 표현됩니다.",
    createdAt: "2025-04-17T10:00:00Z",
    author: { id: 1, name: "홍길동" },
    images: [img1, img2, img3],
    likes: 12,
  };

  const currentUser = { id: 1, name: "홍길동", role: "user" };
  const isAuthorOrAdmin =
    currentUser &&
    (currentUser.id === post.author.id || currentUser.role === "admin");

  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
    } else {
      alert("이미 추천하셨습니다!");
    }
  };

  return (
    <>
      <div className="pageTitle">커뮤니티 게시판</div>

      <div className="container">
        <h1 className="title">{post.title}</h1>

        <div className="infoRow">
          <span className="meta">
            {post.author.name} · {new Date(post.createdAt).toLocaleDateString()}
          </span>

          {/* 상단 추천 버튼 */}
          <button
            className={`likeBtn ${liked ? "liked" : ""}`}
            onClick={handleLike}
          >
            👍 {likes}
          </button>
        </div>

        <div className="content">
          {post.content.split("\n").map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        {/* 하단 추천 버튼 - 가운데 정렬 */}
        <div className="likeButtonWrapper">
          <button
            className={`likeBtn ${liked ? "liked" : ""}`}
            onClick={handleLike}
          >
            👍 {likes}
          </button>
        </div>

        {/* 수정/삭제 버튼 - 오른쪽 정렬 */}
        {isAuthorOrAdmin && (
          <div className="bottomButtonGroup">
            <button className="editBtn">수정</button>
            <button className="deleteBtn">삭제</button>
          </div>
        )}

        <div className="commentPlaceholder">
          <CommuniteReply />
        </div>
      </div>
    </>
  );
}

export default CommuniteDetail;
