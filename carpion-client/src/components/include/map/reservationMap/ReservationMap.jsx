import { useEffect, useState } from "react";
import "./ReservationMap.css";

const { kakao } = window;
const ReservationMap = ({ rentCarInfo, reservationDate, handlePayment }) => {
   const [totalPrice, setTotalPrice] = useState(0);

   useEffect(() => {
      if (rentCarInfo) {
         setTotalPrice(
            rentCarInfo[0].carModel.rentPrice +
               rentCarInfo[0].carModel.hourPrice * reservationDate.diffHour
         );
         console.log(rentCarInfo);
         var container = document.getElementById("map");
         var options = {
            center: new kakao.maps.LatLng(
               rentCarInfo[0].parking.lat,
               rentCarInfo[0].parking.lot
            ),
            level: 3,
         };
         var map = new kakao.maps.Map(container, options);

         var markerPosition = new kakao.maps.LatLng(
            rentCarInfo[0].parking.lat,
            rentCarInfo[0].parking.lot
         );

         var marker = new kakao.maps.Marker({
            position: markerPosition,
         });

         marker.setMap(map);

         console.log(reservationDate);
      }
   }, [rentCarInfo]);

   function toStringByDate(date) {
      return String(date).split(" ")[0];
   }
   function toStringByHour(date) {
      return String(date).split(" ")[1] + ":00";
   }

   if (rentCarInfo == null) return null;

   return (
      <>
         <div id="map">
            <div className="reservation-info">
               <div className="car-info">
                  <div className="car-img">
                     <img src={rentCarInfo[0].carModel.imgURL} alt="" />
                  </div>
                  <p className="car-model">
                     {rentCarInfo[0].carModel.carModel}
                  </p>
                  <p className="seat-count">
                     {rentCarInfo[0].carModel.seatCount}인승
                  </p>
                  <p className="charge-type">
                     {rentCarInfo[0].carModel.chargeType}
                  </p>
                  <p className="price">{rentCarInfo[0].carModel.rentPrice}원</p>
                  <p className="hour-price">
                     {rentCarInfo[0].carModel.hourPrice}원/h
                  </p>
               </div>
               <div className="reservation-period">
                  <div className="rental-date">
                     <p className="yymmdd">
                        {toStringByDate(reservationDate.rentalDateYMDH)}
                     </p>
                     <p className="hour">
                        {toStringByHour(reservationDate.rentalDateYMDH)}
                     </p>
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
                     <p className="yymmdd">
                        {toStringByDate(reservationDate.returnDateYMDH)}
                     </p>
                     <p className="hour">
                        {toStringByHour(reservationDate.returnDateYMDH)}
                     </p>
                  </div>
               </div>
               <div className="total-time">
                  <p>
                     총 <b>{reservationDate.diffHour}시간</b> 이용
                  </p>
               </div>
               <div className="rental-addr box">
                  <h4>대여위치</h4>
                  <p>{rentCarInfo[0].parking.parkingAddr}</p>
               </div>
               <div className="return-addr box">
                  <h4>반납위치</h4>
                  <p>{rentCarInfo[0].parking.parkingAddr}</p>
               </div>
               <div className="total-price box">
                  <h4>대여요금</h4>
                  <p>{totalPrice}원</p>
               </div>
               <div className="rent-btn">
                  <button onClick={() => handlePayment()}>예약하기</button>
               </div>
            </div>
         </div>
      </>
   );
};

export default ReservationMap;
