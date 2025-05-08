import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import rdstyles from "./ReportDetail.module.css";
import ReportReply from "../ReportReply/ReportReply";

function ReportDetail() {
  const { reportNo } = useParams();
  const { auth, isAdmin } = useContext(AuthContext);
  const { accessToken, nickname } = auth;
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!reportNo) return;

      try {
        const res = await axios.get(`http://localhost:80/reports/${reportNo}`, {
          headers: accessToken
            ? { Authorization: `Bearer ${accessToken}` }
            : {},
        });
        console.log("서버 응답 데이터:", res.data);
        setPost(res.data);
      } catch (err) {
        console.error("게시글 불러오기 실패:", err);
        alert("게시글을 불러오는 데 실패했습니다.");
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [reportNo]);

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

  if (loading)
    return (
      <div className={rdstyles.container}>게시글을 불러오는 중입니다...</div>
    );

  if (!post)
    return (
      <div className={rdstyles.container}>
        게시글을 불러오는 데 실패했습니다.
      </div>
    );

  const canEditOrDelete = isAdmin || post.nickName === nickname;

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
          <span className={rdstyles.meta}>
            {post.nickName} · {new Date(post.createDate).toLocaleDateString()}
          </span>
        </div>

        <div className={rdstyles.content}>
          <p>{post.content}</p>

          {/* 첨부파일 처리: 여러 이미지 또는 단일 이미지 처리 */}
          {Array.isArray(post.fileUrls) && post.fileUrls.length > 0 ? (
            <div className={rdstyles.imageGallery}>
              {post.fileUrls.map((url, index) => (
                <img
                  key={index}
                  src={`http://localhost:80/uploads/${url}`}
                  alt={`첨부파일 ${index + 1}`}
                  className={rdstyles.image}
                />
              ))}
            </div>
          ) : post.fileUrl ? (
            <div className={rdstyles.imageGallery}>
              <img
                src={`http://localhost:80/uploads/${post.fileUrl}`}
                alt="첨부파일"
                className={rdstyles.image}
              />
            </div>
          ) : (
            <p>첨부파일이 없습니다.</p>
          )}
        </div>

        {canEditOrDelete && (
          <div className={rdstyles.bottomButtonGroup}>
            <Link to={`/re/${reportNo}`} className={rdstyles.editBtn}>
              수정
            </Link>
            <button className={rdstyles.deleteBtn} onClick={handleDelete}>
              삭제
            </button>
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
