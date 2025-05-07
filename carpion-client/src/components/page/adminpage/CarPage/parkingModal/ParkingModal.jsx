import { useContext, useState } from "react";
import "./ParkingModal.css";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";
import ParkingMap from "../../../../include/map/parkingMap/ParkingMap";

const ParkingModal = ({ setModalOpen, modalBackground, setParkingInfo }) => {
   const { auth } = useContext(AuthContext);

   const [mapOpenNum, setMapOpenNum] = useState(-1);
   const [search, setSearch] = useState("");
   const [parkingsInfo, setParkingsInfo] = useState([]);

   const bgModalHandler = (e) => {
      if (e.target === modalBackground.current) {
         setModalOpen(false);
      }
   };

   const modalHandler = () => {
      setModalOpen(false);
   };

   const chooseParkingZone = (parking) => {
      setParkingInfo({
         parkingTitle: parking.parkingTitle,
         parkingAddr: parking.parkingAddr,
         parkingId: parking.parkingId,
      });
      setModalOpen(false);
   };

   const searchHandler = (e) => {
      if (auth.accessToken) {
         axios
            .get(`http://localhost/parking/${search}`, {
               headers: {
                  Authorization: auth.accessToken,
               },
            })
            .then((result) => {
               console.log(result);
               setParkingsInfo(result.data);
            })
            .catch((error) => {
               console.log(error);
            });
      }
      e.preventDefault();
   };

   const openMapHandler = (index) => {
      if (mapOpenNum == index) {
         setMapOpenNum(-1);
         return;
      }

      setMapOpenNum(index);
   };

   return (
      <>
         <div id="paking-modal" ref={modalBackground} onClick={bgModalHandler}>
            <div className="modal-container">
               <div className="exit-btn" onClick={modalHandler}>
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     height="24px"
                     viewBox="0 -960 960 960"
                     width="24px"
                     fill="#e3e3e3"
                  >
                     <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
                  </svg>
               </div>
               <form className="search-form" onSubmit={searchHandler}>
                  <input
                     type="text"
                     className="search-input"
                     placeholder="원하는 주차장 주소를 입력해주세요"
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                  />
                  <button type="submit" className="search-btn">
                     검색
                  </button>
               </form>

               <div className="search-list">
                  {parkingsInfo.length > 0 ? (
                     parkingsInfo.map((parking, index) => (
                        <div className="parking-box" key={index}>
                           <div
                              className="parking-info"
                              key={parking.parkingId}
                           >
                              <div className="num">
                                 <p>{index + 1}</p>
                              </div>
                              <div className="name">
                                 <p>{parking.parkingTitle}</p>
                              </div>
                              <div className="addr">
                                 <p>{parking.parkingAddr}</p>
                              </div>
                              <div className="id">
                                 <p>{parking.parkingId}</p>
                              </div>
                              <button
                                 className="open-map"
                                 onClick={() => openMapHandler(index)}
                              >
                                 {mapOpenNum == index ? "접기" : "조회"}
                              </button>
                              <button
                                 className="choose-btn"
                                 onClick={() => chooseParkingZone(parking)}
                              >
                                 선택
                              </button>
                           </div>
                           {mapOpenNum == index && (
                              <ParkingMap parkingInfo={parking} />
                           )}
                        </div>
                     ))
                  ) : (
                     <div className="no-parkingList">
                        원하는 주차장 주소를 검색해주세요...
                     </div>
                  )}
               </div>
            </div>
         </div>
      </>
   );
};

export default ParkingModal;
