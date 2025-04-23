import React, { useState } from "react";
import styles from "./ReportReply.module.css";

function ReportReply() {
  const isAdmin = true;

  const [messages, setMessages] = useState([
    {
      type: "question",
      message: " 문의드립니다. 언제 처리 되나요?",
      timestamp: "2025-04-17 10:24",
    },
    {
      type: "answer",
      message: "안녕하세요! 해당 문의는 내맘대로 처리할 예정입니다.",
      timestamp: "2025-04-17 10:26",
    },
    {
      type: "question",
      message: "키사마!",
      timestamp: "2025-04-17 10:30",
    },
    {
      type: "answer",
      message: "코와이네 얏떼미로",
      timestamp: "2025-04-17 10:32",
    },
  ]);

  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim() === "") return;

    const newMessage = {
      type: isAdmin ? "answer" : "question",
      message: inputValue,
      timestamp: new Date().toLocaleString(),
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatThread}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`${styles.chatBubbleWrapper} ${
              msg.type === "question" ? styles.right : styles.left
            }`}
          >
            <div className={`${styles.chatBubble} ${styles[msg.type]}`}>
              <span className={styles.chatPrefix}>
                {msg.type === "question" ? "Q." : "A."}
              </span>
              <p className={styles.chatMessage}>{msg.message}</p>
              <span className={styles.chatTimestamp}>{msg.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.chatInputArea}>
        <input
          type="text"
          placeholder="메시지를 입력하세요..."
          className={styles.chatInput}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className={styles.sendButton} onClick={handleSend}>
          전송
        </button>
      </div>
    </div>
  );
}

export default ReportReply;
