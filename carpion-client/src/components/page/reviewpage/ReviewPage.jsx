import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ReviewPage = () => {
  const navi = useNavigate();
  const [boards, setBoards] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost/reviews`, {
        params: {
          page: page,
        },
      })
      .then((response) => {
        console.log(response.data);
        setBoards([...boards, ...response.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);

  return (
    <>
      <h3>리뷰 페이지</h3>
      <div>
        <button onClick={() => navi("/reviewForm")}>
          글 작성
        </button>
        { boards.map((board) => (
          <div 
            key={board.reviewNo}
            onClick={() => navi(`/reviews/${board.reviewNo}`)}
          >
            <div>{board.title}</div>
            <div>{board.content}</div>
            <div>{board.userNo}</div>
            <div>{board.createDate}</div>
            <div>{board.count}</div>
            <div>{/* 추천 위치 */}</div>
          </div>
          
        ))}       
      </div> 
    </>
  );
};

export default ReviewPage;
