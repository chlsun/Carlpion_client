import { useEffect, useState } from "react";
import "./CarRentMap.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { kakao } = window;

const CarRentMap = ({
   rentCarList,
   searchAddr,
   rentalDateYMDH,
   returnDateYMDH,
}) => {
   const navi = useNavigate();
   const [isRentalInfo, setIsRentalInfo] = useState(false);

   const [chooseRentCarList, setChooseRentCarList] = useState(null);

   const parkingAddr = [
      { label: "강남구", value: { lat: 37.514575, lot: 127.0495556 } },
      { label: "강동구", value: { lat: 37.52736667, lot: 127.1258639 } },
      { label: "강북구", value: { lat: 37.63695556, lot: 127.0277194 } },
      { label: "강서구", value: { lat: 37.54815556, lot: 126.851675 } },
      { label: "관악구", value: { lat: 37.47538611, lot: 126.9538444 } },
      { label: "광진구", value: { lat: 37.53573889, lot: 127.0845333 } },
      { label: "구로구", value: { lat: 37.49265, lot: 126.8895972 } },
      { label: "금천구", value: { lat: 37.44910833, lot: 126.9041972 } },
      { label: "노원구", value: { lat: 37.65146111, lot: 127.0583889 } },
      { label: "도봉구", value: { lat: 37.66583333, lot: 127.0495222 } },
      { label: "동대문구", value: { lat: 37.571625, lot: 127.0421417 } },
      { label: "동작구", value: { lat: 37.50965556, lot: 126.941575 } },
      { label: "마포구", value: { lat: 37.56070556, lot: 126.9105306 } },
      { label: "서대문구", value: { lat: 37.57636667, lot: 126.9388972 } },
      { label: "서초구", value: { lat: 37.48078611, lot: 127.0348111 } },
      { label: "성동구", value: { lat: 37.56061111, lot: 127.039 } },
      { label: "성북구", value: { lat: 37.58638333, lot: 127.0203333 } },
      { label: "송파구", value: { lat: 37.51175556, lot: 127.1079306 } },
      { label: "양천구", value: { lat: 37.51423056, lot: 126.8687083 } },
      { label: "영등포구", value: { lat: 37.52361111, lot: 126.8983417 } },
      { label: "용산구", value: { lat: 37.53609444, lot: 126.9675222 } },
      { label: "은평구", value: { lat: 37.59996944, lot: 126.9312417 } },
      { label: "종로구", value: { lat: 37.57037778, lot: 126.9816417 } },
      { label: "중구", value: { lat: 37.56100278, lot: 126.9996417 } },
      { label: "중랑구", value: { lat: 37.60380556, lot: 127.0947778 } },
   ];

   useEffect(() => {
      var container = document.getElementById("map");
      var options;

      if (searchAddr.value != "") {
         const selected = parkingAddr.find(
            (item) => item.label === searchAddr.value
         );

         options = {
            center: new kakao.maps.LatLng(
               selected.value.lat,
               selected.value.lot
            ),
            level: 7,
         };
      } else {
         options = {
            center: new kakao.maps.LatLng(37.5642135, 127.0016985),
            level: 9,
         };
      }

      var map = new kakao.maps.Map(container, options);

      rentCarList.forEach((rentCar) => {
         const position = new kakao.maps.LatLng(
            rentCar.parking.lat,
            rentCar.parking.lot
         );

         const marker = new kakao.maps.Marker({
            map: map,
            position: position,
            title: rentCar.id,
         });

         marker.data = rentCar.parkingId;

         kakao.maps.event.addListener(marker, "click", function () {
            const rentCar = marker.data;

            console.log(rentalDateYMDH, returnDateYMDH);

            axios
               .get(`http://localhost/rents/parking`, {
                  params: {
                     rentalDate: rentalDateYMDH ? rentalDateYMDH : null,
                     returnDate: returnDateYMDH ? returnDateYMDH : null,
                     parkingId: rentCar,
                  },
               })
               .then((result) => {
                  console.log(result.data);
                  setChooseRentCarList(result.data);
                  setIsRentalInfo(true);
               })
               .catch((error) => {
                  console.log(error);
               });
         });
      });
   }, []);

   function getDiffHour(rentalDateYMDH, returnDateYMDH) {
      const rentalDateYMDHM = rentalDateYMDH.replaceAll("/", "-") + ":00";
      const returnDateYMDHM = returnDateYMDH.replaceAll("/", "-") + ":00";
      const rentalDateCng = new Date(rentalDateYMDHM.replace(" ", "T"));
      const returnDateCng = new Date(returnDateYMDHM.replace(" ", "T"));

      console.log(rentalDateCng);

      const diffMSec = returnDateCng.getTime() - rentalDateCng.getTime();
      const diffHour = diffMSec / (60 * 60 * 1000);

      console.log(diffHour);

      return diffHour;
   }

   const goToReservation = (carNo) => {
      navi(`/rent/${carNo}`, {
         state: {
            diffHour: getDiffHour(rentalDateYMDH, returnDateYMDH),
            rentalDateYMDH: rentalDateYMDH.slice(2),
            returnDateYMDH: returnDateYMDH.slice(2),
         },
      });
   };

   return (
      <>
         <div id="map">
            <div className={`rental-list ${isRentalInfo && "active"}`}>
               <div>
                  <div className="list-container">
                     {chooseRentCarList && (
                        <>
                           <div
                              className="close-btn"
                              onClick={() => setIsRentalInfo(!isRentalInfo)}
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

                           <div className={`parking-info`}>
                              <h3>
                                 {chooseRentCarList[0].parking.parkingTitle}
                              </h3>
                              <p>{chooseRentCarList[0].parking.parkingAddr}</p>
                           </div>
                           <div className="wall"></div>
                           <div className="car-info-list">
                              {chooseRentCarList.map((rentCar) => (
                                 <div
                                    key={rentCar.carNo}
                                    className={`rentcar-info ${
                                       rentCar.reservationRental ? "active" : ""
                                    }`}
                                 >
                                    <div className="car-img">
                                       <img
                                          src={rentCar.carModel.imgURL}
                                          alt=""
                                       />
                                    </div>

                                    <div className="car-info">
                                       <p className="model">
                                          {rentCar.carModel.carModel} /{" "}
                                          {rentCar.carModel.seatCount}인승
                                       </p>
                                       <p className="charge">
                                          {rentCar.carModel.chargeType}
                                       </p>
                                       <p className="price">
                                          {rentCar.carModel.rentPrice}원 /{" "}
                                          {rentCar.carModel.hourPrice}원/h
                                       </p>
                                    </div>

                                    <button
                                       className="rent-btn"
                                       onClick={() =>
                                          goToReservation(rentCar.carNo)
                                       }
                                    >
                                       예약하기
                                    </button>
                                    <div className="no-rent">
                                       <div className="txt">예약불가</div>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default CarRentMap;
