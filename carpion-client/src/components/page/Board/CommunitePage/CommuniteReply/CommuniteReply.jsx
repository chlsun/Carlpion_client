import React, { useState, useEffect } from "react";
import axios from "axios";
import crstyles from "./CommuniteReply.module.css";

function CommuniteReply({ reviewNo }) {
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:80/reviews/comments?reviewNo=${reviewNo}`
        );
        setComments(response.data);
      } catch (error) {
        console.error("댓글 불러오기 실패:", error);
      }
    };

    fetchComments();
  }, [reviewNo]);

  const handleSend = async () => {
    if (message.trim() === "") return;

    const newComment = {
      nickName: "사용자",
      content: message,
      reviewNo: reviewNo,
    };

    try {
      const response = await axios.post("/reviews/comments", newComment);
      const createdComment = response.data;
      setComments([...comments, createdComment]);
      setMessage("");
    } catch (error) {
      console.error("댓글 추가 실패:", error);
    }
  };

  const handleDelete = async (commentNo) => {
    try {
      await axios.delete(`/reviews/comments/${commentNo}`);
      setComments(
        comments.filter((comment) => comment.commentNo !== commentNo)
      );
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
    }
  };

  const handleEditSave = async (commentNo, newContent) => {
    try {
      await axios.put(`/reviews/comments/${commentNo}`, {
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
    <div className={crstyles.commentWrapper}>
      <div className={crstyles.commentSection}>
        <div className={crstyles.commentList}>
          {comments.map((comment) => (
            <CommentItem
              key={comment.commentNo}
              comment={comment}
              onDelete={handleDelete}
              onSaveEdit={handleEditSave}
            />
          ))}
        </div>

        <div className={crstyles.chatInputArea}>
          <input
            type="text"
            placeholder="댓글을 입력하세요..."
            className={crstyles.chatInput}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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
    <div className={crstyles.comment}>
      <div className={crstyles.commentHeader}>
        <span className={crstyles.nickname}>{comment.nickName}</span>
        <div className={crstyles.rightTop}>
          <span className={crstyles.commentTime}>{comment.createDate}</span>
          <div className={crstyles.menuContainer}>
            <button className={crstyles.menuButton} onClick={handleMenuToggle}>
              &#x22EE;
            </button>
            {menuOpen && (
              <div className={crstyles.menuDropdown}>
                {/* <button className={crstyles.menuItem} onClick={handleEditClick}>
                  수정
                </button> */}
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

      {/* {isEditing ? (
        <div className={crstyles.editSection}>
          <textarea
            className={crstyles.editInput}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <div className={crstyles.editButtons}>
            <button className={crstyles.saveButton} onClick={handleSaveEdit}>
              저장
            </button>
            <button className={crstyles.cancelButton} onClick={handleCancelEdit}>
              취소
            </button>
          </div>
        </div>
      ) : (
        <div className={crstyles.commentContent}>{comment.content}</div>
      )} */}
    </div>
  );
}

export default CommuniteReply;
