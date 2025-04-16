import { useEffect } from "react";
import "./ReservationMap.css";

const { kakao } = window;
const ReservationMap = () => {
   useEffect(() => {
      var container = document.getElementById("map");
      var options = {
         center: new kakao.maps.LatLng(33.450701, 126.570667),
         level: 3,
      };
      var map = new kakao.maps.Map(container, options);
   }, []);
   return (
      <>
         <div id="map">
            <div className="reservation-info">
               <div className="car-info">
                  <div className="car-img">
                     <img src="/img/테슬라.webp" alt="" />
                  </div>
                  <p className="car-model">자동차 모델명</p>
                  <p className="seat-count">5인승</p>
                  <p className="charge-type">충전타입</p>
                  <p className="price">1500원</p>
                  <p className="hour-price">120원/h</p>
               </div>
               <div className="reservation-period">
                  <div className="rental-date">
                     <p className="yymmdd">25/09/28</p>
                     <p className="hour">21:00</p>
                  </div>
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     height="24px"
                     viewBox="0 -960 960 960"
                     width="24px"
                     fill="#e3e3e3"
                  >
                     <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
                  </svg>
                  <div className="return-date">
                     <p className="yymmdd">25/09/29</p>
                     <p className="hour">11:00</p>
                  </div>
               </div>
               <div className="total-time">
                  <p>
                     총 <b>14시간</b> 이용
                  </p>
               </div>
               <div className="rental-addr box">
                  <h4>대여위치</h4>
                  <p>서울시 뭐시기 뭐시기 남대문로120</p>
               </div>
               <div className="return-addr box">
                  <h4>반납위치</h4>
                  <p>서울시 뭐시기 뭐시기 남대문로120</p>
               </div>
               <div className="total-price box">
                  <h4>대여요금</h4>
                  <p>12010원</p>
               </div>
               <div className="rent-btn">
                  <button>예약하기</button>
               </div>
            </div>
         </div>
      </>
   );
};

export default ReservationMap;
