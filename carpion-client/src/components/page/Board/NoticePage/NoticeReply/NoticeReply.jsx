import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import nrstyles from "./NoticeReply.module.css";
import { AuthContext } from "../../../Context/AuthContext";

function NoticeReply({ noticeNo }) {
  const { auth, isAdmin } = useContext(AuthContext);
  const { accessToken, nickname } = auth;
  const [comments, setComments] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);

  const nickName = nickname || "사용자";

  useEffect(() => {
    const fetchComments = async () => {
      if (!noticeNo) return;
      try {
        const response = await axios.get(
          `http://localhost:80/notice/comments?noticeNo=${noticeNo}`,
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
  }, [noticeNo, accessToken]);

  const handleSend = async () => {
    if (!accessToken) {
      alert("댓글을 작성하려면 로그인해야 합니다.");
      return;
    }
    if (inputValue.trim() === "") return;

    const newComment = {
      nickname: nickName,
      content: inputValue,
      noticeNo: noticeNo,
    };

    try {
      await axios.post(
        "http://localhost:80/notice/comments",
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
        `http://localhost:80/notice/comments?noticeNo=${noticeNo}`,
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
      await axios.delete(`http://localhost:80/notice/comments/${commentNo}`, {
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
    <div className={nrstyles.commentWrapper}>
      <div className={nrstyles.commentSection}>
        <div className={nrstyles.commentList}>
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

        <div className={nrstyles.chatInputArea}>
          <input
            type="text"
            placeholder="댓글을 입력하세요..."
            className={nrstyles.chatInput}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <button className={nrstyles.sendButton} onClick={handleSend}>
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
    <div className={nrstyles.comment}>
      <div className={nrstyles.commentHeader}>
        <span className={nrstyles.nickname}>{comment.nickName}</span>
        <div className={nrstyles.rightTop}>
          <span className={nrstyles.commentTime}>{comment.createDate}</span>
          <div className={nrstyles.menuContainer}>
            {isOwnerOrAdmin && (
              <button
                className={nrstyles.menuButton}
                onClick={handleMenuToggle}
              >
                &#x22EE;
              </button>
            )}
            {openMenuId === comment.commentNo && (
              <div className={nrstyles.menuDropdown}>
                <button
                  className={`${nrstyles.menuItem} ${nrstyles.menuItemDelete}`}
                  onClick={() => onDelete(comment.commentNo)}
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={nrstyles.commentContent}>{comment.content}</div>
    </div>
  );
}

export default NoticeReply;
