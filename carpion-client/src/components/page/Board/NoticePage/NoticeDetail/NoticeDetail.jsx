import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import ndstyles from "./NoticeDetail.module.css";
import NoticeReply from "../NoticeReply/NoticeReply";

function NoticeDetail() {
  const { noticeNo } = useParams();
  const { accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!noticeNo) return;

      try {
        const res = await axios.get(`http://localhost:80/notice/${noticeNo}`, {
          headers: accessToken
            ? { Authorization: `Bearer ${accessToken}` }
            : {},
        });
        console.log("서버 응답 데이터:", res.data);
        setPost(res.data || null);
      } catch (err) {
        console.error("게시글 불러오기 실패:", err);
        alert("게시글을 불러오는 데 실패했습니다.");
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [noticeNo, accessToken]);

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await axios.delete(`http://localhost:80/notice/${noticeNo}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        alert("삭제 완료되었습니다.");
        navigate("/nb");
      } catch (error) {
        console.error("삭제 실패:", error);
        alert("삭제 중 오류가 발생했습니다.");
      }
    }
  };

  if (loading)
    return (
      <div className={ndstyles.container}>게시글을 불러오는 중입니다...</div>
    );
  if (!post)
    return (
      <div className={ndstyles.container}>
        게시글을 불러오는 데 실패했습니다.
      </div>
    );

  const canEditOrDelete = post.isAdmin || post.isOwner;

  return (
    <div className={ndstyles.container}>
      <div className={ndstyles.pageTitle}>공지사항</div>

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
            <img src={post.fileUrl} alt="첨부파일" className={ndstyles.image} />
          </div>
        ) : (
          <p>첨부파일이 없습니다.</p>
        )}
      </div>

      <div className={ndstyles.bottomButtonGroup}>
        <Link to={`/ne/${noticeNo}`} className={ndstyles.editBtn}>
          수정
        </Link>
        <button className={ndstyles.deleteBtn} onClick={handleDelete}>
          삭제
        </button>
      </div>

      <NoticeReply noticeNo={noticeNo} />
    </div>
  );
}

export default NoticeDetail;
