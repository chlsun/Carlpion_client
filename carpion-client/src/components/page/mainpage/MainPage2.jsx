import { useEffect, useState } from "react";
import BoardComponent from "./include/BoardComponent";
import "./MainPage2.css";
import axios from "axios";
import Banner from "./include/Banner";

const MainPage2 = () => {
   const apiUrl = window.ENV?.API_URL || "https://my-carlpion-api-727992776618.asia-northeast3.run.app";

   console.log(apiUrl);
   
   const [reviewList, setReviewList] = useState(null);
   const [reportList, setReportList] = useState(null);
   const [noticeList, setNoticeList] = useState(null);

   useEffect(() => {
      axios
         .get(`${apiUrl}/board/review`)
         .then((result) => {
            console.log(result.data.item);
            setReviewList(result.data.item);
         })
         .catch((error) => {
            console.log(error);
         });

      axios
         .get(`${apiUrl}/board/report`)
         .then((result) => {
            setReportList(result.data.item);
         })
         .catch((error) => {
            console.log(error);
         });

      axios
         .get(`${apiUrl}/board/notice`)
         .then((result) => {
            setNoticeList(result.data.item);
         })
         .catch((error) => {
            console.log(error);
         });
   }, []);

   if (reviewList == null || reportList == null || noticeList == null)
      return null;

   return (
      <>
         <div id="main-page">
            <Banner />

            <div className="board-container">
               <BoardComponent boardList={reviewList} />
               <BoardComponent boardList={reportList} />
               <BoardComponent boardList={noticeList} />
            </div>
         </div>
      </>
   );
};

export default MainPage2;
