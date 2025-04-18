import React, { useState } from "react";
import "./ReplyPage.css";

function ReplyPage() {
  const [comments, setComments] = useState([
    {
      id: 1,
      nickname: "홍길동",
      content: "이 기능 정말 좋아요!",
      time: "2025-04-15 14:32:00",
    },
    {
      id: 2,
      nickname: "김개발",
      content: "버그는 없는지 확인해보겠습니다.",
      time: "2025-04-16 09:12:47",
    },
  ]);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() === "") return;

    const newComment = {
      id: Date.now(),
      nickname: "사용자", // 나중에 유저 정보와 연결 가능
      content: message,
      time: new Date().toLocaleString(),
    };

    setComments([...comments, newComment]);
    setMessage("");
  };

  const handleDelete = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  return (
    <div className="comment-section">
      <div className="comment-list">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          placeholder="댓글를 입력하세요..."
          className="chat-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <button className="send-button" onClick={handleSend}>
          전송
        </button>
      </div>
    </div>
  );
}

function CommentItem({ comment, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="comment">
      <div className="comment-header">
        <span className="nickname">{comment.nickname}</span>
        <div className="menu-container">
          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            &#x22EE;
          </button>
          {menuOpen && (
            <div className="menu-dropdown">
              <button className="menu-item">수정</button>
              <button
                className="menu-item delete"
                onClick={() => onDelete(comment.id)}
              >
                삭제
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="comment-content">{comment.content}</div>
      <div className="comment-time">{comment.time}</div>
    </div>
  );
}
export default ReplyPage;
