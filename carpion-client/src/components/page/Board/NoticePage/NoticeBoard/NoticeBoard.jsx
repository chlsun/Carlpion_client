import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import nbstyles from "./NoticeBoard.module.css";
import CustomerBanner from "/img/notice/안내.jpg";

const NoticeItem = ({ notice }) => (
  <li className={nbstyles.item}>
    <Link to={`/nd/${notice.noticeNo}`} className={nbstyles.itemLink}>
      <div className={nbstyles.itemHeader}>
        <span className={nbstyles.itemTitle}>{notice.title}</span>
        <div className={nbstyles.rightBox}>
          <span className={nbstyles.itemDate}>{notice.createDate}</span>
        </div>
      </div>
    </Link>
  </li>
);

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get("http://localhost:80/notice");
        console.log(response.data); // 데이터 구조 확인
        setNotices(response.data.list); // 'list'에 해당하는 배열을 상태로 저장
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className={nbstyles.noticeBoard}>
      <div className={nbstyles.banner}>
        <img src={CustomerBanner} alt="고객센터 배너" />
        <div className={nbstyles.bannerText}>고객센터</div>
      </div>

      <div className={nbstyles.container}>
        <div className={nbstyles.titleRow}>
          <img
            src="/img/notice/사이렌.png"
            alt="공지 아이콘"
            className={nbstyles.titleIcon}
          />
          <h2 className={nbstyles.title}>공지사항</h2>

          <Link to="/nw" className={nbstyles.writeButton}>
            작성
          </Link>
        </div>

        <ul className={nbstyles.list}>
          {notices.length === 0 ? (
            <li className={nbstyles.item}>게시글이 없습니다.</li>
          ) : (
            notices.map((notice) => (
              <NoticeItem key={notice.noticeNo} notice={notice} />
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default NoticeBoard;
