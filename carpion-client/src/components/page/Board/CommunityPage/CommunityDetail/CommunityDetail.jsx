import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import cdstyles from "./CommunityDetail.module.css";
import CommunityReply from "../CommunityReply/CommunityReply";

function CommunityDetail() {
   const apiUrl = window.ENV?.API_URL || "http://localhost:8005";
   const { reviewNo } = useParams();
   const { auth, isAdmin } = useContext(AuthContext);
   const { accessToken, nickname } = auth;
   const navigate = useNavigate();

   const [post, setPost] = useState(null);
   const [loading, setLoading] = useState(true);

   const [likes, setLikes] = useState(0);
   const [liked, setLiked] = useState(false);
   useEffect(() => {
      const fetchPost = async () => {
         if (!reviewNo) return;

         try {
            const res = await axios.get(`${apiUrl}/reviews/${reviewNo}`, {
               headers: accessToken
                  ? { Authorization: `Bearer ${accessToken}` }
                  : {},
            });
            console.log("서버 응답 데이터:", res.data);
            setPost(res.data || null);
            setLikes(res.data.likes || 0);
         } catch (err) {
            console.error("게시글 불러오기 실패:", err);
            alert("게시글을 불러오는 데 실패했습니다.");
            setPost(null);
         } finally {
            setLoading(false);
         }
      };

      fetchPost();
   }, [reviewNo]);

   const handleLike = async () => {
      if (!reviewNo) return;

      if (liked) {
         alert("이미 추천하셨습니다!");
         return;
      }

      setLoading(true);
      try {
         const res = await axios.post(
            `${apiUrl}/reviews/${reviewNo}`,
            {},
            {
               headers: accessToken
                  ? { Authorization: `Bearer ${accessToken}` }
                  : {},
            }
         );

         setLikes(likes + 1);
         setLiked(true);
      } catch (err) {
         console.error("추천 실패:", err);
         alert("추천을 처리하는 데 실패했습니다.");
      } finally {
         setLoading(false);
      }
   };

   const handleDelete = async () => {
      if (window.confirm("정말 삭제하시겠습니까?")) {
         try {
            await axios.delete(`${apiUrl}/reviews/${reviewNo}`, {
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
      }
   };

   if (loading)
      return (
         <div className={cdstyles.container}>게시글을 불러오는 중입니다...</div>
      );

   if (!post)
      return (
         <div className={cdstyles.container}>
            게시글을 불러오는 데 실패했습니다.
         </div>
      );

   const canEditOrDelete = isAdmin || post.nickName === nickname;
   return (
      <>
         <div className={cdstyles.pageTitle}>커뮤니티 게시판</div>

         <div className={cdstyles.container}>
            <div className={cdstyles.topRow}>
               <h1 className={cdstyles.title}>{post.title}</h1>
               <span className={cdstyles.date}>
                  {new Date(post.createDate).toLocaleDateString()}
               </span>
            </div>

            <div className={cdstyles.infoRow}>
               <span className={cdstyles.meta}>
                  {post.nickName} ·{" "}
                  {new Date(post.createDate).toLocaleDateString()}
               </span>
               <button
                  className={`${cdstyles.likeBtn} ${
                     liked ? cdstyles.liked : ""
                  }`}
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
                           src={`${apiUrl}/uploads/${url}`}
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
                  className={`${cdstyles.likeBtn} ${
                     liked ? cdstyles.liked : ""
                  }`}
                  onClick={handleLike}
               >
                  👍 {likes}
               </button>
            </div>
            {canEditOrDelete && (
               <div className={cdstyles.bottomButtonGroup}>
                  <Link to={`/ce/${reviewNo}`} className={cdstyles.editBtn}>
                     수정
                  </Link>
                  <button className={cdstyles.deleteBtn} onClick={handleDelete}>
                     삭제
                  </button>
               </div>
            )}
            <div className={cdstyles.commentPlaceholder}>
               <CommunityReply reviewNo={reviewNo} />
            </div>
         </div>
      </>
   );
}

export default CommunityDetail;
