import React, { useState } from "react";
import "./NoticePage.css";
import CustomerBanner from "/img/notice/안내.jpg";

const notices = [
  {
    id: 1,
    title: "📌 서버 점검 안내",
    date: "2025-04-10",
    content: "4월 12일 오전 2시부터 4시까지 서버 점검이 있습니다.",
  },
  {
    id: 2,
    title: "🎉 신규 기능 업데이트",
    date: "2025-04-09",
    content: "공지사항에 아코디언 UI가 추가되었습니다!",
  },
];

const NoticeItem = ({ notice, isOpen, onToggle }) => (
  <li className="item" onClick={onToggle}>
    <div className="itemHeader">
      <span className="itemTitle">{notice.title}</span>
      <div className="rightBox">
        <span className="itemDate">{notice.date}</span>
        <span className="toggleIcon">{isOpen ? "−" : "+"}</span>
      </div>
    </div>
    {isOpen && <div className="itemContent">{notice.content}</div>}
  </li>
);

const NoticePage = () => {
  const [openId, setOpenId] = useState(null);
  const isAdmin = true;

  const handleToggleItem = (id) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      <div className="banner">
        <img src={CustomerBanner} alt="고객센터 배너" />
        <div className="bannerText">고객센터</div>
      </div>

      <div className="container">
        <div className="titleRow">
          <img
            src="/img/notice/사이렌.png"
            alt="공지 아이콘"
            className="titleIcon"
          />
          <h2 className="title">공지사항</h2>
          {isAdmin && <button className="writeButton">작성</button>}
        </div>

        <ul className="list">
          {notices.map((notice) => {
            const isOpen = openId === notice.id;
            return (
              <NoticeItem
                key={notice.id}
                notice={notice}
                isOpen={isOpen}
                onToggle={() => handleToggleItem(notice.id)}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default NoticePage;
