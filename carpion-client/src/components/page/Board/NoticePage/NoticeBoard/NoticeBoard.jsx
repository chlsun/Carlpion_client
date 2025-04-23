import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // axios 임포트 추가
import styles from "./NoticeBoard.module.css";
import CustomerBanner from "/img/notice/안내.jpg";

const NoticeItem = ({ notice }) => (
  <li className={styles.item}>
    <Link to={`/nd/${notice.noticeNo}`} className={styles.itemLink}>
      <div className={styles.itemHeader}>
        <span className={styles.itemTitle}>{notice.title}</span>
        <div className={styles.rightBox}>
          <span className={styles.itemDate}>{notice.createDate}</span>
        </div>
      </div>
    </Link>
  </li>
);

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const isAdmin = true;

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get("http://localhost:80/notice");
        setNotices(response.data);
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className={styles.noticeBoard}>
      <div className={styles.banner}>
        <img src={CustomerBanner} alt="고객센터 배너" />
        <div className={styles.bannerText}>고객센터</div>
      </div>

      <div className={styles.container}>
        <div className={styles.titleRow}>
          <img
            src="/img/notice/사이렌.png"
            alt="공지 아이콘"
            className={styles.titleIcon}
          />
          <h2 className={styles.title}>공지사항</h2>
          {isAdmin && <button className={styles.writeButton}>작성</button>}
        </div>

        <ul className={styles.list}>
          {notices.length === 0 ? (
            <li className={styles.item}>게시글이 없습니다.</li>
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
