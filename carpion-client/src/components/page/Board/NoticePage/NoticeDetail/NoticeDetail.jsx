import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ndstyles from "./NoticeDetail.module.css";
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
      <div className={ndstyles.pageTitle}>공지사항</div>

      <div className={ndstyles.container}>
        <div className={ndstyles.topRow}>
          <h1 className={ndstyles.title}>{post.title}</h1>
          <span className={ndstyles.date}>
            {new Date(post.createDate).toLocaleDateString()}
          </span>
        </div>
        <div className={ndstyles.infoRow}>
          <span className={ndstyles.meta}>{post.nickName}</span>
          <div className={ndstyles.rightInfo}>
            <span className={ndstyles.views}>조회수: {post.count}</span>
          </div>
        </div>
        <div className={ndstyles.content}>
          <p>{post.content}</p>

          {post.fileUrl ? (
            <div className={ndstyles.imageGallery}>
              <img
                src={post.fileUrl}
                alt="첨부파일"
                className={ndstyles.image}
              />
            </div>
          ) : (
            <p>첨부파일이 없습니다.</p>
          )}
        </div>

        {isAuthorOrAdmin && (
          <div className={ndstyles.bottomButtonGroup}>
            <button className={ndstyles.editBtn}>수정</button>
            <button className={ndstyles.deleteBtn}>삭제</button>
          </div>
        )}

        <div className={ndstyles.commentPlaceholder}>
          <NoticeReply noticeNo={noticeNo} />
        </div>
      </div>
    </>
  );
}

export default NoticeDetail;
