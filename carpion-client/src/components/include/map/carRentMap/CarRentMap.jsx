import { useEffect, useState } from "react";
import "./CarRentMap.css";

const { kakao } = window;

const CarRentMap = () => {
   const [isRentalInfo, setIsRentalInfo] = useState(false);
   useEffect(() => {
      var container = document.getElementById("map");
      var options = {
         center: new kakao.maps.LatLng(33.450701, 126.570667),
         level: 3,
      };

      var map = new kakao.maps.Map(container, options);

      var position = new kakao.maps.LatLng(33.450701, 126.570667);

      var marker = new kakao.maps.Marker({
         position: position,
         clickable: true,
      });

      marker.setMap(map);

      kakao.maps.event.addListener(marker, "click", function () {
         setIsRentalInfo(true);
      });
   }, []);

   return (
      <>
         <div id="map">
            {isRentalInfo && (
               <div className="rental-list">
                  <div
                     className="close-btn"
                     onClick={() => setIsRentalInfo(false)}
                  >
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#e3e3e3"
                     >
                        <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
                     </svg>
                  </div>
                  <div className="parking-info">
                     <h3>뭐시기 주차장</h3>
                     <p>서울시 뭐시기 뭐시기 남대문로120</p>
                  </div>
                  <div className="wall"></div>
                  <div className="car-info-list">
                     <div className="rentcar-info">
                        <div className="car-img">
                           <img src="/img/테슬라.webp" alt="" />
                        </div>

                        <div className="car-info">
                           <p className="model">자동차 모델명 / 5인승</p>
                           <p className="charge">충전타입</p>
                           <p className="price">1500원 / 120원/h</p>
                        </div>

                        <button className="rent-btn">예약하기</button>
                     </div>
                     <div className="rentcar-info">
                        <div className="car-img">
                           <img src="/img/테슬라.webp" alt="" />
                        </div>

                        <div className="car-info">
                           <p className="model">자동차 모델명 / 5인승</p>
                           <p className="charge">충전타입</p>
                           <p className="price">1500원 / 120원/h</p>
                        </div>

                        <button className="rent-btn">예약하기</button>
                     </div>
                     <div className="rentcar-info">
                        <div className="car-img">
                           <img src="/img/테슬라.webp" alt="" />
                        </div>

                        <div className="car-info">
                           <p className="model">자동차 모델명 / 5인승</p>
                           <p className="charge">충전타입</p>
                           <p className="price">1500원 / 120원/h</p>
                        </div>

                        <button className="rent-btn">예약하기</button>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </>
   );
};

export default CarRentMap;
