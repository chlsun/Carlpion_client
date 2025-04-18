import React from "react";
import "./QAPage.css";

function QAPage() {
  const messages = [
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
  ];

  return (
    <div className="chat-container">
      <div className="chat-thread">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-bubble-wrapper ${
              msg.type === "question" ? "right" : "left"
            }`}
          >
            <div className={`chat-bubble ${msg.type}`}>
              <span className="chat-prefix">
                {msg.type === "question" ? "Q." : "A."}
              </span>
              <p className="chat-message">{msg.message}</p>
              <span className="chat-timestamp">{msg.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input-area">
        <input
          type="text"
          placeholder="메시지를 입력하세요..."
          className="chat-input"
        />
        <button className="send-button">전송</button>
      </div>
    </div>
  );
}

export default QAPage;
