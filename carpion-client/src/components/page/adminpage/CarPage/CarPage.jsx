import "./CarPage.css";
import Select from "react-select";
import { useContext, useEffect, useRef, useState } from "react";
import ParkingModal from "./parkingModal/ParkingModal";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";

const CarPage = () => {
   const { page } = useParams();
   const { auth } = useContext(AuthContext);
   const [isPageLoad, setIsPageLoad] = useState(true);
   const [rentCarList, setRentCarList] = useState(null);
   const [options, setOptions] = useState([]);
   const [parkingInfo, setParkingInfo] = useState(null);
   const [selectedModelNo, setSelectedModelNo] = useState(null);
   const [carId, setCarId] = useState("");

   const [rentCar, setRentCar] = useState({
      modelNo: null,
      carId: null,
      parkingId: null,
   });

   const [modalOpen, setModalOpen] = useState(false);
   const modalBackground = useRef();

   const modalHandler = (e) => {
      e.preventDefault();
      setModalOpen(!modalOpen);
   };

   const handleSelectChange = (selectedOption) => {
      setSelectedModelNo(selectedOption.value);
   };

   useEffect(() => {
      console.log(rentCarList);
   }, [rentCarList]);

   const insertRequestHandler = (e) => {
      e.preventDefault();

      if (!rentCar.modelNo || !rentCar.parkingId) {
         alert("모든 정보를 기입해주세요");
         return;
      }

      if (rentCar.carId.length < 7 || rentCar.carId.length > 8) {
         console.log("뭐임 들어옴");
         alert("차량 번호 7자 이상 8자 이하로 등록가능합니다.");
         return;
      }

      if (auth.accessToken) {
         axios
            .post("http://localhost/admin/car", rentCar, {
               headers: {
                  Authorization: `Bearer ${auth.accessToken}`,
               },
            })
            .then((result) => {
               alert("렌트차량이 추가되었습니다.");
               setIsPageLoad(!isPageLoad);
            })
            .catch((error) => {
               console.log(error);
            });
      }
   };

   useEffect(() => {
      setRentCar({
         modelNo: selectedModelNo,
         carId: carId,
         parkingId: parkingInfo ? parkingInfo.parkingId : null,
      });
   }, [parkingInfo, carId, selectedModelNo]);

   useEffect(() => {
      if (auth.accessToken) {
         axios
            .get(`http://localhost/admin/car/${page}`, {
               headers: {
                  Authorization: `Bearer ${auth.accessToken}`,
               },
            })
            .then((result) => {
               console.log(result.data.carModelList);
               setRentCarList(result.data.carModelList);
            })
            .catch((error) => {
               console.log(error);
            });

         axios
            .get(`http://localhost/admin/model`, {
               headers: {
                  Authorization: `Bearer ${auth.accessToken}`,
               },
            })
            .then((result) => {
               const modelList = result.data;
               const abc = modelList.map((model) => {
                  return { value: model.modelNo, label: model.carModel };
               });
               setOptions([...options, ...abc]);
            })
            .catch((error) => {
               if (error.response.status == 403) {
                  navi("/");
                  alert("운영자만 이용가능한 페이지입니다.");
               }
            });
      }
   }, [auth.accessToken, isPageLoad]);
   if (rentCarList == null) return null;
   return (
      <>
         <main id="car-page">
            <form className="car-input" onSubmit={insertRequestHandler}>
               <div className="input-box model-name">
                  <Select
                     options={options}
                     placeholder="차량모델 선택"
                     onChange={handleSelectChange}
                  />
               </div>
               <div className="input-box car-num">
                  <input
                     type="text"
                     placeholder="차량 번호"
                     onChange={(e) => setCarId(e.target.value)}
                     value={carId}
                  />
               </div>
               <div className="input-box parking-name">
                  <p>
                     {parkingInfo ? parkingInfo.parkingTitle : "주차장 이름"}
                  </p>
               </div>
               <div className="input-box parking-addr">
                  <p>{parkingInfo ? parkingInfo.parkingAddr : "주차장 주소"}</p>
               </div>
               <div className="input-box parking-id">
                  <p>{parkingInfo ? parkingInfo.parkingId : "주차장 관리ID"}</p>
               </div>
               <div className="btn">
                  <button className="select-btn" onClick={modalHandler}>
                     주차장 조회
                  </button>
                  <button className="insert-btn" type="submit">
                     추가하기
                  </button>
               </div>
            </form>

            <div className="car-list">
               {rentCarList.map((rentCar, index) => (
                  <div className="car" key={rentCar.carId}>
                     <div className="car-no">
                        <p>{index + 1 + (page - 1) * 10}</p>
                     </div>
                     <div className="model-name">
                        <p>{rentCar.carModel.carModel}</p>
                     </div>
                     <div className="car-num">
                        <p>{rentCar.carId}</p>
                     </div>
                     <div className="parking-name">
                        <p>{rentCar.parking.parkingTitle}</p>
                     </div>
                     <div className="parking-addr">
                        <p>{rentCar.parking.parkingAddr}</p>
                     </div>
                     <div className="parking-id">
                        <p>{rentCar.parkingId}</p>
                     </div>
                     <div className="btn-box">
                        <button type="button" className="update-btn">
                           수정
                        </button>
                        <button type="button" className="delete-btn">
                           삭제
                        </button>
                     </div>
                  </div>
               ))}
            </div>

            <div className="pagination">
               <div className="page-num">1</div>
               <div className="page-num">2</div>
               <div className="page-num active">3</div>
               <div className="page-num">4</div>
               <div className="page-num">5</div>
               <div className="page-num">6</div>
               <div className="page-num">7</div>
               <div className="page-num">8</div>
               <div className="page-num">9</div>
            </div>
         </main>

         {modalOpen && (
            <ParkingModal
               setModalOpen={setModalOpen}
               modalBackground={modalBackground}
               setParkingInfo={setParkingInfo}
            />
         )}
      </>
   );
};

export default CarPage;
