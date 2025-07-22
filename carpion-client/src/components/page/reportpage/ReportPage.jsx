import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ReportPage = () => {
   const navi = useNavigate();
   const [boards, setBoards] = useState([]);
   const [page, setPage] = useState(0);
   const apiUrl = window.ENV?.API_URL || "http://localhost:8005";

   return (
      <>
         <h3>문의 / 신고 게시판</h3>
         <div style={{ marginTop: "100px" }}>
            <button onClick={() => navi("/rp")}>글 작성</button>
         </div>
      </>
   );
};

export default ReportPage;
