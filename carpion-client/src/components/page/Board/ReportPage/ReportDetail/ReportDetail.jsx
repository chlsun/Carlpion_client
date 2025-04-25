import React, { useState, useEffect } from "react";
import rdstyles from "./ReportDetail.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReportReply from "../ReportReply/ReportReply";

function ReportDetail() {
  const { reportNo } = useParams();
  const [post, setPost] = useState(null);

  const currentUser = { id: 1, name: "홍길동", role: "user" };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:80/reports/${reportNo}`);
        setPost(res.data);
      } catch (err) {
        console.error("게시글 불러오기 실패:", err);
      }
    };

    fetchPost();
  }, [reportNo]);
  if (!post) return <div>로딩중...</div>;

  const isAuthorOrAdmin =
    currentUser &&
    (currentUser.id === post.userNo || currentUser.role === "admin");

  return (
    <>
      <div className={rdstyles.pageTitle}>신고/문의 게시판</div>

      <div className={rdstyles.container}>
        <div className={rdstyles.topRow}>
          <h1 className={rdstyles.title}>{post.title}</h1>
          <span className={rdstyles.date}>
            {new Date(post.createDate).toLocaleDateString()}
          </span>
        </div>
        <div className={rdstyles.infoRow}>
          <span className={rdstyles.meta}>{post.nickName}</span>
          <div className={rdstyles.rightInfo}>
            <span className={rdstyles.views}>조회수: {post.count}</span>
          </div>
        </div>

        <div className={rdstyles.content}>
          {post.content.split("\n").map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        {isAuthorOrAdmin && (
          <div className={rdstyles.bottomButtonGroup}>
            <button className={rdstyles.editBtn}>수정</button>
            <button className={rdstyles.deleteBtn}>삭제</button>
          </div>
        )}

        <div className={rdstyles.commentPlaceholder}>
          <ReportReply reportNo={reportNo} />
        </div>
      </div>
    </>
  );
}

export default ReportDetail;
