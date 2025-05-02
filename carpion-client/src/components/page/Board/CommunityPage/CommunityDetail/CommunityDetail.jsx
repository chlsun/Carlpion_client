import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import cdstyles from "./CommunityDetail.module.css";
import CommunityReply from "../CommunityReply/CommunityReply";

function CommunityDetail() {
  const { reviewNo } = useParams();
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { accessToken } = auth;

  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:80/reviews/${reviewNo}`);
        setPost(res.data);
        console.log("post.title:", res.data.title);
        setLikes(res.data.likes || 0);
      } catch (err) {
        console.error("게시글 불러오기 실패:", err);
        alert("게시글을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (reviewNo) {
      fetchPost();
    }
  }, [reviewNo]);

  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
    } else {
      alert("이미 추천하셨습니다!");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await axios.delete(`http://localhost:80/reviews/${reviewNo}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      alert("삭제 완료되었습니다.");
      navigate("/cb");
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  if (loading) {
    return (
      <div className={cdstyles.container}>
        <div>게시글을 불러오는 중입니다...</div>
      </div>
    );
  }

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

          {Array.isArray(post.fileUrls) && post.fileUrls.length > 0 ? (
            <div className={cdstyles.imageGallery}>
              {post.fileUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`첨부파일 ${index + 1}`}
                  className={cdstyles.image}
                />
              ))}
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

        <div className={cdstyles.bottomButtonGroup}>
          {post.hasPermission && (
            <>
              <Link to={`/ce/${reviewNo}`} className={cdstyles.editBtn}>
                수정
              </Link>
              <button className={cdstyles.deleteBtn} onClick={handleDelete}>
                삭제
              </button>
            </>
          )}
        </div>

        <div className={cdstyles.commentPlaceholder}>
          <CommunityReply reviewNo={reviewNo} />
        </div>
      </div>
    </>
  );
}

export default CommunityDetail;
