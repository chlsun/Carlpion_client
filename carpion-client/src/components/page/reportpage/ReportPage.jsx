import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ReportPage = () => {
  const navi = useNavigate();
  const [boards, setBoards] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    // axios
    //   .get(`http://localhost/reports`,{
    //     params: {
    //       page: page,
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //     setBoards([...boards, ...response.data]);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, );

  return (
    <>
      <h3>문의 / 신고 게시판</h3>
      <div>
        <button onClick={() => navi("/reportForm")}>
          글 작성
        </button>
        { boards.map((board) => (
          <div 
            key={board.reportNo}
            onClick={() => navi(`/reports/${board.reportNo}`)}
          >
            <div>{board.title}</div>
            <div>{board.content}</div>
            <div>{board.userNo}</div>
            <div>{board.createDate}</div>
            <div>{board.count}</div>
          </div>
        ))}       
      </div>     
    </> 
  );
}

export default ReportPage;
