import React, { useState } from "react";
import "./ReportBoard.css";

const ReportBoard = () => {
  const [role, setRole] = useState("user");
  const currentUser = "user1";

  const reports = [
    { id: 1, title: "욕설 신고", content: "심한 욕설이 포함됨", user: "user1" },
    { id: 2, title: "광고 신고", content: "홍보 링크 포함됨", user: "user2" },
    {
      id: 3,
      title: "도배 신고",
      content: "같은 내용 반복 작성",
      user: "user1",
    },
  ];

  const visibleReports =
    role === "admin" ? reports : reports.filter((r) => r.user === currentUser);

  return (
    <div className="report-list-wrapper">
      <div className="report-header">
        <h2>신고 목록</h2>
        <div className="role-switch">
          <span
            className={role === "user" ? "active" : ""}
            onClick={() => setRole("user")}
          >
            사용자
          </span>
          <span
            className={role === "admin" ? "active" : ""}
            onClick={() => setRole("admin")}
          >
            관리자
          </span>
        </div>
      </div>

      <table className="report-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>내용</th>
            {role === "admin" && <th>작성자</th>}
          </tr>
        </thead>
        <tbody>
          {visibleReports.length === 0 ? (
            <tr>
              <td colSpan={role === "admin" ? 4 : 3} className="empty">
                신고 내역이 없습니다.
              </td>
            </tr>
          ) : (
            visibleReports.map((r, i) => (
              <tr key={r.id}>
                <td>{i + 1}</td>
                <td>{r.title}</td>
                <td>{r.content}</td>
                {role === "admin" && <td>{r.user}</td>}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReportBoard;
