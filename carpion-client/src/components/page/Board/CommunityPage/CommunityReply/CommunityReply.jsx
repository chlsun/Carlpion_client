import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import crstyles from "./CommunityReply.module.css";
import { AuthContext } from "../../../Context/AuthContext";

function CommunityReply({ reviewNo }) {
  const { auth } = useContext(AuthContext);
  const { accessToken, isAuthenticated, user } = auth;
  const [comments, setComments] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const nickName = user ? user.nickName : "사용자"; // 현재 로그인된 사용자의 nickname
  const isAdmin = isAuthenticated; // 관리자 여부 확인

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
        console.log(response.data);
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
      // 댓글을 추가합니다.
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

      // 댓글 추가 후 새로운 댓글 목록을 가져옵니다.
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

      // 댓글 목록을 새로 업데이트합니다.
      setComments(response.data);
      setInputValue(""); // 입력창 초기화
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
function CommentItem({ comment, onDelete, isAdmin, currentUserNickName }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };
  const isOwnerOrAdmin = comment.nickname === currentUserNickName || isAdmin;
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
            {menuOpen && (
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
