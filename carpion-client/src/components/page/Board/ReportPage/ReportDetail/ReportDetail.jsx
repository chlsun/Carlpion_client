import React from "react";
import styles from "./ReportDetail.module.css";
import img1 from "/img/cBoard/img1.jpg";
import img2 from "/img/cBoard/img2.jpg";
import img3 from "/img/cBoard/img3.jpg";
import ReportReply from "../ReportReply/ReportReply";

function ReportDetail() {
  const post = {
    title: "신고/문의 제목 예시입니다",
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

  return (
    <>
      <div className={styles.pageTitle}>신고/문의 게시판</div>

      <div className={styles.container}>
        <h1 className={styles.title}>{post.title}</h1>

        <div className={styles.infoRow}>
          <span className={styles.meta}>
            {post.author.name} · {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className={styles.content}>
          {post.content.split("\n").map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        {isAuthorOrAdmin && (
          <div className={styles.bottomButtonGroup}>
            <button className={styles.editBtn}>수정</button>
            <button className={styles.deleteBtn}>삭제</button>
          </div>
        )}

        <div className={styles.commentPlaceholder}>
          <ReportReply />
        </div>
      </div>
    </>
  );
}

export default ReportDetail;
