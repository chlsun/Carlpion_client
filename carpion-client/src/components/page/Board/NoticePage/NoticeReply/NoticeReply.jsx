import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import nrstyles from "./NoticeReply.module.css";
import { AuthContext } from "../../../context/AuthContext";

function NoticeReply({ noticeNo }) {
  const { auth } = useContext(AuthContext);
  const { accessToken, isAuthenticated, user } = auth;
  const [comments, setComments] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const nickName = user ? user.nickName : "사용자"; // 현재 로그인된 사용자의 nickname
  const isAdmin = isAuthenticated; // 관리자 여부 확인

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
        console.log(response.data); // 서버에서 반환되는 댓글 데이터 확인
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
      // 댓글을 추가합니다.
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

      // 댓글 추가 후 새로운 댓글 목록을 가져옵니다.
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

      // 댓글 목록을 새로 업데이트합니다.
      setComments(response.data);
      setInputValue(""); // 입력창 초기화
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
      console.error("댓글 삭제 실패:", error);
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
              isAdmin={isAdmin} // 관리자 여부 전달
              currentUserNickName={nickName} // 현재 사용자 닉네임 전달
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

function CommentItem({ comment, onDelete, isAdmin, currentUserNickName }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  // 댓글 작성자가 현재 로그인된 사용자이거나 관리자일 때 삭제 버튼을 보이도록 함
  const isOwnerOrAdmin = comment.nickname === currentUserNickName || isAdmin;

  return (
    <div className={nrstyles.comment}>
      <div className={nrstyles.commentHeader}>
        {/* comment.nickname이 비어 있으면 "익명"으로 기본값 설정 */}
        <span className={nrstyles.nickname}>{comment.nickname || "익명"}</span>
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
            {menuOpen && (
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
