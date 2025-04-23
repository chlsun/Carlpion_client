import React, { useState } from "react";
import styles from "./NoticeReply.module.css";

function NoticeReply() {
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
      nickname: "사용자",
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
    <div className={styles.commentSection}>
      <div className={styles.commentList}>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onDelete={handleDelete}
            onSaveEdit={handleEditSave}
          />
        ))}
      </div>

      <div className={styles.chatInputArea}>
        <input
          type="text"
          placeholder="댓글을 입력하세요..."
          className={styles.chatInput}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button className={styles.sendButton} onClick={handleSend}>
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
    setMenuOpen(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewContent(comment.content);
    setMenuOpen(false);
  };

  const handleSaveEdit = () => {
    onSaveEdit(comment.id, newContent);
    setIsEditing(false);
    setMenuOpen(false);
  };

  return (
    <div className={styles.comment}>
      <div className={styles.commentHeader}>
        <span className={styles.nickname}>{comment.nickname}</span>
        <div className={styles.rightTop}>
          <span className={styles.commentTime}>{comment.time}</span>
          <div className={styles.menuContainer}>
            <button
              className={styles.menuButton}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              &#x22EE;
            </button>
            {menuOpen && (
              <div className={styles.menuDropdown}>
                <button className={styles.menuItem} onClick={handleEditClick}>
                  수정
                </button>
                <button
                  className={`${styles.menuItem} ${styles.delete}`}
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
        <div className={styles.editSection}>
          <textarea
            className={styles.editInput}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <div className={styles.editButtons}>
            <button className={styles.saveButton} onClick={handleSaveEdit}>
              저장
            </button>
            <button className={styles.cancelButton} onClick={handleCancelEdit}>
              취소
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.commentContent}>{comment.content}</div>
      )}
    </div>
  );
}

export default NoticeReply;
