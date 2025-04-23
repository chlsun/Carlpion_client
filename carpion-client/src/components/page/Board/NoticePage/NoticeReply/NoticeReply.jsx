import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./NoticeReply.module.css";

function NoticeReply({ noticeNo }) {
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:80/notice/comments?noticeNo=${noticeNo}`
        );
        setComments(response.data);
      } catch (error) {
        console.error("댓글 불러오기 실패:", error);
      }
    };

    fetchComments();
  }, [noticeNo]);

  const handleSend = async () => {
    if (message.trim() === "") return;

    const newComment = {
      nickname: "사용자",
      content: message,
      noticeNo: noticeNo,
    };

    try {
      const response = await axios.post("/notice/comments", newComment);
      const createdComment = response.data;
      setComments([...comments, createdComment]);
      setMessage("");
    } catch (error) {
      console.error("댓글 추가 실패:", error);
    }
  };

  const handleDelete = async (commentNo) => {
    try {
      await axios.delete(`/notice/comments/${commentNo}`);
      setComments(
        comments.filter((comment) => comment.commentNo !== commentNo)
      );
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
    }
  };

  const handleEditSave = async (commentNo, newContent) => {
    try {
      await axios.put(`/notice/comments/${commentNo}`, {
        content: newContent,
      });
      setComments(
        comments.map((comment) =>
          comment.commentNo === commentNo
            ? { ...comment, content: newContent }
            : comment
        )
      );
    } catch (error) {
      console.error("댓글 수정 실패:", error);
    }
  };

  return (
    <div className={styles.commentWrapper}>
      <div className={styles.commentSection}>
        <div className={styles.commentList}>
          {comments.map((comment) => (
            <CommentItem
              key={comment.commentNo}
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
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <button className={styles.sendButton} onClick={handleSend}>
            전송
          </button>
        </div>
      </div>
    </div>
  );
}
function CommentItem({ comment, onDelete /* , onSaveEdit */ }) {
  // const [isEditing, setIsEditing] = useState(false);
  // const [newContent, setNewContent] = useState(comment.content);
  const [menuOpen, setMenuOpen] = useState(false);

  // const handleEditClick = () => {
  //   setIsEditing(true);
  //   setMenuOpen(false);
  // };

  // const handleCancelEdit = () => {
  //   setIsEditing(false);
  //   setNewContent(comment.content);
  //   setMenuOpen(false);
  // };

  // const handleSaveEdit = () => {
  //   onSaveEdit(comment.commentNo, newContent);
  //   setIsEditing(false);
  //   setMenuOpen(false);
  // };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={styles.comment}>
      <div className={styles.commentHeader}>
        <span className={styles.nickname}>{comment.nickname}</span>
        <div className={styles.rightTop}>
          <span className={styles.commentTime}>{comment.createDate}</span>
          <div className={styles.menuContainer}>
            <button className={styles.menuButton} onClick={handleMenuToggle}>
              &#x22EE;
            </button>
            {menuOpen && (
              <div className={styles.menuDropdown}>
                {/* <button className={styles.menuItem} onClick={handleEditClick}>
                  수정
                </button> */}
                <button
                  className={`${styles.menuItem} ${styles.menuItemDelete}`}
                  onClick={() => onDelete(comment.commentNo)}
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.commentContent}>{comment.content}</div>

      {/* {isEditing ? (
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
      )} */}
    </div>
  );
}

export default NoticeReply;
