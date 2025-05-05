import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import rrstyles from "./ReportReply.module.css";
import { AuthContext } from "../../../Context/AuthContext";

function ReportReply({ reportNo }) {
  const { auth } = useContext(AuthContext);
  const { accessToken, isAuthenticated, user } = auth;

  const isAdmin = isAuthenticated;
  const nickName = user ? user.nickName : "일반 사용자";

  const [comments, setComments] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      if (!reportNo) return;

      try {
        const response = await axios.get(
          `http://localhost:80/reports/comments?reportNo=${reportNo}`,
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
  }, [reportNo, accessToken]);

  const handleSend = async () => {
    if (!accessToken) {
      alert("댓글을 작성하려면 로그인해야 합니다.");
      return;
    }

    if (inputValue.trim() === "") return;

    const newComment = {
      reportNo,
      content: inputValue,
      role: isAdmin ? "ROLE_ADMIN" : "ROLE_USER",
    };

    console.log("보낼 데이터:", newComment);

    try {
      const response = await axios.post(
        "http://localhost:80/reports/comments",
        newComment,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const savedComment = {
        ...response.data,
        role: newComment.role,
      };

      setComments((prev) => [...prev, savedComment]);
      setInputValue("");
    } catch (error) {
      console.error("댓글 전송 실패:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const handleDelete = async (commentNo) => {
    try {
      await axios.delete(`http://localhost:80/reports/comments/${commentNo}`, {
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
    <div className={rrstyles.chatContainer}>
      {comments.length > 0 && (
        <div className={rrstyles.chatThread}>
          {comments.map((comment, idx) => {
            const messageType =
              comment.role === "ROLE_ADMIN" ? "answer" : "question";
            return (
              <div
                key={idx}
                className={`${rrstyles.chatBubbleWrapper} ${
                  messageType === "question" ? rrstyles.right : rrstyles.left
                }`}
              >
                <div
                  className={`${rrstyles.chatBubble} ${rrstyles[messageType]}`}
                >
                  <span className={rrstyles.chatPrefix}>
                    {messageType === "question" ? "Q." : "A."}
                  </span>
                  <p className={rrstyles.chatMessage}>{comment.content}</p>
                  <span className={rrstyles.chatTimestamp}>
                    {comment.createDate}
                  </span>

                  {isAdmin && (
                    <button
                      className={rrstyles.deleteButton}
                      onClick={() => handleDelete(comment.commentNo)}
                    >
                      x
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className={rrstyles.chatInputArea}>
        <input
          type="text"
          placeholder="메시지를 입력하세요..."
          className={rrstyles.chatInput}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className={rrstyles.sendButton} onClick={handleSend}>
          전송
        </button>
      </div>
    </div>
  );
}

export default ReportReply;
