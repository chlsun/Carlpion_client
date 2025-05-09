import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import crstyles from "./CommunityReply.module.css";
import { AuthContext } from "../../../Context/AuthContext";

function CommunityReply({ reviewNo }) {
  const { auth, isAdmin } = useContext(AuthContext);
  const { accessToken, nickname } = auth;
  const [comments, setComments] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null); // 하나만 열리게 관리
  const nickName = nickname || "사용자";

  useEffect(() => {
    const fetchComments = async () => {
      if (!reviewNo) return;
      try {
        const response = await axios.get(
          `http://localhost:80/reviews/comments?reviewNo=${reviewNo}`,
          accessToken
            ? {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            : {}
        );
        setComments(response.data);
      } catch (error) {
        console.error("댓글 불러오기 실패:", error);
      }
    };

    fetchComments();
  }, [reviewNo, accessToken]);

  const handleSend = async () => {
    if (!accessToken) {
      alert("댓글을 작성하려면 로그인해야 합니다.");
      return;
    }
    if (inputValue.trim() === "") return;

    const newComment = {
      nickname: nickName,
      content: inputValue,
      reviewNo: reviewNo,
    };

    try {
      await axios.post(
        "http://localhost:80/reviews/comments",
        newComment,
        accessToken
          ? {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          : {}
      );

      const response = await axios.get(
        `http://localhost:80/reviews/comments?reviewNo=${reviewNo}`,
        accessToken
          ? {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          : {}
      );

      setComments(response.data);
      setInputValue("");
    } catch (error) {
      console.error("댓글 추가 실패:", error);
    }
  };

  const handleDelete = async (commentNo) => {
    try {
      await axios.delete(`http://localhost:80/reviews/comments/${commentNo}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setComments((prev) =>
        prev.filter((comment) => comment.commentNo !== commentNo)
      );
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data === "삭제할 권한이 없습니다."
      ) {
        alert("삭제할 권한이 없습니다.");
      } else {
        console.error("댓글 삭제 실패:", error);
      }
    }
  };

  return (
    <div className={crstyles.commentWrapper}>
      <div className={crstyles.commentSection}>
        <div className={crstyles.commentList}>
          {comments.map((comment) => (
            <CommentItem
              key={comment.commentNo}
              comment={comment}
              onDelete={handleDelete}
              isAdmin={isAdmin}
              currentUserNickName={nickName}
              openMenuId={openMenuId}
              setOpenMenuId={setOpenMenuId}
            />
          ))}
        </div>

        <div className={crstyles.chatInputArea}>
          <input
            type="text"
            placeholder="댓글을 입력하세요..."
            className={crstyles.chatInput}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <button className={crstyles.sendButton} onClick={handleSend}>
            전송
          </button>
        </div>
      </div>
    </div>
  );
}
function CommentItem({
  comment,
  onDelete,
  isAdmin,
  currentUserNickName,
  openMenuId,
  setOpenMenuId,
}) {
  const handleMenuToggle = () => {
    setOpenMenuId(openMenuId === comment.commentNo ? null : comment.commentNo);
  };

  const isOwnerOrAdmin = comment.nickName === currentUserNickName || isAdmin;
  return (
    <div className={crstyles.comment}>
      <div className={crstyles.commentHeader}>
        <span className={crstyles.nickname}>{comment.nickName}</span>
        <div className={crstyles.rightTop}>
          <span className={crstyles.commentTime}>{comment.createDate}</span>
          <div className={crstyles.menuContainer}>
            {isOwnerOrAdmin && (
              <button
                className={crstyles.menuButton}
                onClick={handleMenuToggle}
              >
                &#x22EE;
              </button>
            )}
            {openMenuId === comment.commentNo && (
              <div className={crstyles.menuDropdown}>
                <button
                  className={`${crstyles.menuItem} ${crstyles.menuItemDelete}`}
                  onClick={() => onDelete(comment.commentNo)}
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={crstyles.commentContent}>{comment.content}</div>
    </div>
  );
}

export default CommunityReply;
