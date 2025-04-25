import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import cdstyles from "./CommuniteDetail.module.css";
import CommuniteReply from "../CommuniteReply/CommuniteReply";

function CommuniteDetail() {
  const { reviewNo } = useParams();
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const currentUser = { id: 1, name: "홍길동", role: "user" };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:80/reviews/${reviewNo}`);
        console.log("게시글 데이터:", res.data);
        console.log("fileUrl:", res.data.fileUrl);
        setPost(res.data);
        setLikes(res.data.count ?? 0);
      } catch (err) {
        console.error("게시글 불러오기 실패:", err);
      }
    };

    fetchPost();
  }, [reviewNo]);

  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
    } else {
      alert("이미 추천하셨습니다!");
    }
  };

  if (!post) return <div>로딩중...</div>;

  const isAuthorOrAdmin =
    currentUser &&
    (currentUser.id === post.userNo || currentUser.role === "admin");

  return (
    <>
      <div className={cdstyles.pageTitle}>커뮤니티 게시판</div>

      <div className={cdstyles.container}>
        <div className={cdstyles.topRow}>
          <h1 className={cdstyles.title}>{post.title}</h1>
          <span className={cdstyles.views}>조회수: {post.count}</span>
        </div>
        <div className={cdstyles.infoRow}>
          <span className={cdstyles.meta}>
            {post.nickname} · {new Date(post.createDate).toLocaleDateString()}
          </span>

          <button
            className={`${cdstyles.likeBtn} ${liked ? cdstyles.liked : ""}`}
            onClick={handleLike}
          >
            👍 {likes}
          </button>
        </div>

        <div className={cdstyles.content}>
          <p>{post.content}</p>

          {post.fileUrl ? (
            <div className={cdstyles.imageGallery}>
              <img
                src={`http://localhost:80/uploads/${post.fileUrl}`}
                alt="첨부파일"
                className={cdstyles.image}
              />
            </div>
          ) : (
            <p>첨부파일이 없습니다.</p>
          )}
        </div>

        <div className={cdstyles.likeButtonWrapper}>
          <button
            className={`${cdstyles.likeBtn} ${liked ? cdstyles.liked : ""}`}
            onClick={handleLike}
          >
            👍 {likes}
          </button>
        </div>

        {isAuthorOrAdmin && (
          <div className={cdstyles.bottomButtonGroup}>
            <button className={cdstyles.editBtn}>수정</button>
            <button className={cdstyles.deleteBtn}>삭제</button>
          </div>
        )}

        <div className={cdstyles.commentPlaceholder}>
          <CommuniteReply reviewNo={reviewNo} />
        </div>
      </div>
    </>
  );
}

export default CommuniteDetail;
