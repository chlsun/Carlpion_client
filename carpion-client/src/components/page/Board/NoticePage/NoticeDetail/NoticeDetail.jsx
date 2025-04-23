import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./NoticeDetail.module.css";
import NoticeReply from "../NoticeReply/NoticeReply";

function NoticeDetail() {
  const { noticeNo } = useParams();
  const [post, setPost] = useState(null);

  const currentUser = { id: 1, name: "홍길동", role: "user" };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:80/notice/${noticeNo}`);
        setPost(res.data);
      } catch (err) {
        console.error("게시글 불러오기 실패:", err);
      }
    };

    fetchPost();
  }, [noticeNo]);
  if (!post) return <div>로딩중...</div>;

  const isAuthorOrAdmin =
    currentUser &&
    (currentUser.id === post.userNo || currentUser.role === "admin");

  return (
    <>
      <div className={styles.pageTitle}>공지사항</div>

      <div className={styles.container}>
        <div className={styles.topRow}>
          <h1 className={styles.title}>{post.title}</h1>
          <span className={styles.views}>조회수: {post.count}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.meta}>
            {post.nickname} · {new Date(post.createDate).toLocaleDateString()}
          </span>
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

        {isAuthorOrAdmin && (
          <div className={styles.bottomButtonGroup}>
            <button className={styles.editBtn}>수정</button>
            <button className={styles.deleteBtn}>삭제</button>
          </div>
        )}

        <div className={styles.commentPlaceholder}>
          <NoticeReply noticeNo={noticeNo} />
        </div>
      </div>
    </>
  );
}

export default NoticeDetail;
