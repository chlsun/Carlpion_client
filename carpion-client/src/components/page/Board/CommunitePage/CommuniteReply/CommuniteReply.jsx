import React, { useState } from "react";
import "./CommuniteReply.css";

function CommuniteReply() {
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

  const handleEditSave = (id, newContent) => {
    setComments(
      comments.map((comment) =>
        comment.id === id ? { ...comment, content: newContent } : comment
      )
    );
  };

  return (
    <div className="comment-section">
      <div className="comment-list">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onDelete={handleDelete}
            onSaveEdit={handleEditSave}
          />
        ))}
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          placeholder="댓글을 입력하세요..."
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

function CommentItem({ comment, onDelete, onSaveEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(comment.content);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
    setMenuOpen(false); // 수정할 때 메뉴 닫기
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewContent(comment.content); // 원래 내용으로 되돌리기
    setMenuOpen(false); // 취소 시 메뉴 닫기
  };

  const handleSaveEdit = () => {
    onSaveEdit(comment.id, newContent);
    setIsEditing(false); // 수정 후 종료
    setMenuOpen(false); // 저장 후 메뉴 닫기
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen); // 메뉴 열기/닫기
  };

  return (
    <div className="comment">
      <div className="comment-header">
        <span className="nickname">{comment.nickname}</span>
        <div className="right-top">
          <span className="comment-time">{comment.time}</span>
          <div className="menu-container">
            <button className="menu-button" onClick={handleMenuToggle}>
              &#x22EE;
            </button>
            {menuOpen && (
              <div className="menu-dropdown">
                <button className="menu-item" onClick={handleEditClick}>
                  수정
                </button>
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
      </div>

      {isEditing ? (
        <div className="edit-section">
          <textarea
            className="edit-input"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <div className="edit-buttons">
            <button className="save-button" onClick={handleSaveEdit}>
              저장
            </button>
            <button className="cancel-button" onClick={handleCancelEdit}>
              취소
            </button>
          </div>
        </div>
      ) : (
        <div className="comment-content">{comment.content}</div>
      )}
    </div>
  );
}
export default CommuniteReply;
