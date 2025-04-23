import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./CommuniteDetail.module.css";
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
      <div className={styles.pageTitle}>커뮤니티 게시판</div>

      <div className={styles.container}>
        <div className={styles.topRow}>
          <h1 className={styles.title}>{post.title}</h1>
          <span className={styles.views}>조회수: {post.count}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.meta}>
            {post.nickname} · {new Date(post.createDate).toLocaleDateString()}
          </span>

          <button
            className={`${styles.likeBtn} ${liked ? styles.liked : ""}`}
            onClick={handleLike}
          >
            👍 {likes}
          </button>
        </div>

        <div className={styles.content}>
          <p>{post.content}</p>

          {post.fileUrl ? (
            <div className={styles.imageGallery}>
              <img src={post.fileUrl} alt="첨부파일" className={styles.image} />
            </div>
          ) : (
            <p>첨부파일이 없습니다.</p>
          )}
        </div>

        <div className={styles.likeButtonWrapper}>
          <button
            className={`${styles.likeBtn} ${liked ? styles.liked : ""}`}
            onClick={handleLike}
          >
            👍 {likes}
          </button>
        </div>

        {isAuthorOrAdmin && (
          <div className={styles.bottomButtonGroup}>
            <button className={styles.editBtn}>수정</button>
            <button className={styles.deleteBtn}>삭제</button>
          </div>
        )}

        <div className={styles.commentPlaceholder}>
          <CommuniteReply reviewNo={reviewNo} />
        </div>
      </div>
    </>
  );
}

export default CommuniteDetail;
