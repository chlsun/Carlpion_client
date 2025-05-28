import { useEffect, useState } from "react";
import Banner from "./include/banner";
import BoardComponent from "./include/BoardComponent";
import "./MainPage2.css";
import axios from "axios";

const MainPage2 = () => {
   const apiUrl = window.ENV?.API_URL || "http://localhost:8005";
   const [reviewList, setReviewList] = useState(null);
   const [reportList, setReportList] = useState(null);
   const [noticeList, setNoticeList] = useState(null);

   useEffect(() => {
      axios
         .get(`${apiUrl}/board/review`)
         .then((result) => {
            setReviewList(result.data);
         })
         .catch((error) => {
            console.log(error);
         });

      axios
         .get(`${apiUrl}/board/report`)
         .then((result) => {
            setReportList(result.data);
         })
         .catch((error) => {
            console.log(error);
         });

      axios
         .get(`${apiUrl}/board/notice`)
         .then((result) => {
            setNoticeList(result.data);
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
