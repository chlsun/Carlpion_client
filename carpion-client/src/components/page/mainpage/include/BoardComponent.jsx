import React from "react";
import "./BoardComponent.css";
import { useNavigate } from "react-router-dom";

const Arrow = () => {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         height="14px"
         viewBox="0 -960 960 960"
         width="14px"
         fill="#ffffff"
      >
         <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
      </svg>
   );
};

const BoardComponent = ({ boardList }) => {
   const navi = useNavigate();

   const gotoBoardPage = (category) => {
      switch (category) {
         case "리뷰":
            navi("/cb");
            break;
         case "신고/문의":
            navi("/rb");
            break;
         case "공지":
            navi("/nb");
            break;
      }
   };

   const gotoBoardDetailPage = (boardNo, category) => {
      switch (category) {
         case "리뷰":
            navi(`/cd/${boardNo}`);
            break;
         case "신고/문의":
            navi(`/rd/${boardNo}`);
            break;
         case "공지":
            navi(`/nd/${boardNo}`);
            break;
      }
   };

   return (
      <div id="main-page-board">
         <div className="more-btn">
            <p onClick={() => gotoBoardPage(boardList[0].category)}>전체보기</p>{" "}
            <Arrow />
            <Arrow />
         </div>
         <div className="review-title">{boardList[0].category} 게시판</div>
         <ul className="post-list">
            {boardList.map((board, index) => (
               <li key={index} className={`post-item`}>
                  <span className="category">{board.category}</span>
                  <span
                     className="title"
                     onClick={() => {
                        gotoBoardDetailPage(board.boardNo, board.category);
                     }}
                  >
                     {board.title}
                  </span>
               </li>
            ))}
         </ul>
      </div>
   );
};

export default BoardComponent;
