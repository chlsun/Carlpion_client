import React, { useState, useEffect, useContext } from "react";
import rdstyles from "./ReportDetail.module.css";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import ReportReply from "../ReportReply/ReportReply";

function ReportDetail() {
  const { reportNo } = useParams();
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { accessToken } = auth;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:80/reports/${reportNo}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setPost(res.data);
      } catch (err) {
        console.error("게시글 불러오기 실패:", err);
        alert("게시글을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    if (accessToken && reportNo) {
      fetchPost();
    } else {
      setLoading(false);
    }
  }, [reportNo, accessToken]);

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await axios.delete(`http://localhost:80/reports/${reportNo}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      alert("삭제 완료되었습니다.");
      navigate("/rb");
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  // 로딩 중일 때 또는 post가 null이면
  if (loading || !post) {
    return (
      <div className={rdstyles.container}>
        <div>게시글을 불러오는 중입니다...</div>
      </div>
    );
  }

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

        <div className={rdstyles.bottomButtonGroup}>
          {post.hasPermission && (
            <>
              <Link to={`/re/${reportNo}`} className={rdstyles.editBtn}>
                수정
              </Link>
              <button className={rdstyles.deleteBtn} onClick={handleDelete}>
                삭제
              </button>
            </>
          )}
        </div>

        <div className={rdstyles.commentPlaceholder}>
          <ReportReply reportNo={reportNo} />
        </div>
      </div>
    </>
  );
}

export default ReportDetail;
