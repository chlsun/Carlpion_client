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
   const [updateFormNum, setUpdateFormNum] = useState(-1);
   const [isPageLoad, setIsPageLoad] = useState(true);
   const [pageInfo, setPageInfo] = useState(null);
   const [pageNumbers, setPageNumbers] = useState([1]);
   const [rentCarList, setRentCarList] = useState(null);
   const [options, setOptions] = useState([]);
   const [parkingInfo, setParkingInfo] = useState(null);
   const [updateParkingInfo, setUpdateParkingInfo] = useState(null);
   const [updateRentCar, setUpdateRentCar] = useState("");
   const [selectedModelNo, setSelectedModelNo] = useState(null);

   const [updateSelectedModelNo, setUpdateSelectedModelNo] = useState(null);

   const [carId, setCarId] = useState("");

   const [rentCar, setRentCar] = useState({
      modelNo: null,
      carId: null,
      parkingId: null,
   });

   const [modalOpen, setModalOpen] = useState(false);
   const [updateModalOpen, setUpdateModalOpen] = useState(false);

   const modalBackground = useRef();

   const modalHandler = (e) => {
      e.preventDefault();
      setModalOpen(!modalOpen);
   };

   const updateModalHandler = (e) => {
      e.preventDefault();
      setUpdateModalOpen(!updateModalOpen);
   };

   const handleSelectChange = (selectedOption) => {
      setSelectedModelNo(selectedOption);
   };

   const updateHandleSelectChange = (selectedOption) => {
      setUpdateSelectedModelNo(selectedOption);
   };

   const pattern = /^\d{2,3}[가-힣]\d{4}$/;

   const insertRequestHandler = (e) => {
      e.preventDefault();

      if (!rentCar.modelNo || !rentCar.parkingId) {
         alert("모든 정보를 기입해주세요");
         return;
      }

      if (rentCar.carId.length < 7 || rentCar.carId.length > 8) {
         alert("차량 번호 7자 이상 8자 이하로 등록가능합니다.");
         return;
      }

      if (!!!pattern.test(rentCar.carId)) {
         alert(
            "차량 번호 형식이 잘못되었습니다.\n00가0000 혹은 000가0000 와 같은 형식으로 입력해주세요."
         );
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
               setParkingInfo(null);
               setSelectedModelNo(null);
            })
            .catch((error) => {
               const errors = error.response.data;
               const firstErrorMessage = Object.values(errors)[0];
               alert(firstErrorMessage);
            });
      }
   };

   useEffect(() => {
      setRentCar({
         modelNo: selectedModelNo ? selectedModelNo.value : null,
         carId: carId,
         parkingId: parkingInfo ? parkingInfo.parkingId : null,
      });
   }, [parkingInfo, carId, selectedModelNo]);

   useEffect(() => {
      if (auth.accessToken) {
         axios
            .get(`http://localhost/admin/model`, {
               headers: {
                  Authorization: `Bearer ${auth.accessToken}`,
               },
            })
            .then((result) => {
               const modelList = result.data;
               const option = modelList.map((model) => {
                  return { value: model.modelNo, label: model.carModel };
               });
               setOptions([...options, ...option]);
            })
            .catch((error) => {
               if (error.response.status == 403) {
                  navi("/");
                  alert("운영자만 이용가능한 페이지입니다.");
               }
            });
      }
   }, [auth.accessToken]);

   useEffect(() => {
      if (auth.accessToken) {
         axios
            .get(`http://localhost/admin/car/${page}`, {
               headers: {
                  Authorization: `Bearer ${auth.accessToken}`,
               },
            })
            .then((result) => {
               setRentCarList(result.data.carModelList);
               setRentCar({
                  modelNo: null,
                  carId: null,
                  parkingId: null,
               });
               setCarId("");
               setPageInfo(result.data.pageInfo);
               const pageArray = [];

               for (
                  let i = result.data.pageInfo.startPage;
                  i <= result.data.pageInfo.endPage;
                  i++
               ) {
                  pageArray.push(i);
               }
               setPageNumbers(pageArray);
            })
            .catch((error) => {
               console.log(error);
            });
      }
   }, [auth.accessToken, isPageLoad]);

   const updateFormHandler = (rentCar, index) => {
      if (updateFormNum == index) {
         setUpdateFormNum(-1);
         updateHandleSelectChange(null);
         setUpdateParkingInfo(null);
         setUpdateRentCar("");
         return;
      }

      setUpdateSelectedModelNo({
         label: rentCar.carModel.carModel,
         value: rentCar.modelNo,
      });

      setUpdateRentCar(rentCar.carId);
      setUpdateFormNum(index);
   };

   const updateRequestHandler = (rentCar) => {
      if (!updateSelectedModelNo.value || !updateRentCar) {
         alert("모든 정보를 기입해주세요");
         return;
      }

      if (updateRentCar.length < 7 || updateRentCar.length > 8) {
         alert("차량 번호 7자 이상 8자 이하로 등록가능합니다.");
         return;
      }

      if (!!!pattern.test(updateRentCar)) {
         alert(
            "차량 번호 형식이 잘못되었습니다.\n00가0000 혹은 000가0000 와 같은 형식으로 입력해주세요."
         );
         return;
      }

      if (auth.accessToken) {
         axios
            .put(
               "http://localhost/admin/car",
               {
                  carNo: rentCar.carNo,
                  modelNo: updateSelectedModelNo.value,
                  carId: updateRentCar,
                  parkingId: updateParkingInfo
                     ? updateParkingInfo.parkingId
                     : rentCar.parkingId,
               },
               {
                  headers: {
                     Authorization: `Bearer ${auth.accessToken}`,
                  },
               }
            )
            .then((result) => {
               alert("수정 되었습니다");
               setUpdateFormNum(-1);
               setIsPageLoad(!isPageLoad);
            })
            .catch((error) => {
               const errors = error.response.data;
               const firstErrorMessage = Object.values(errors)[0];
               alert(firstErrorMessage);
            });
      }
   };

   const deleteRentCarHandler = (rentCar) => {
      if (!!!confirm("정말로 삭제하시겠습니까?")) {
         return;
      }
      if (auth.accessToken) {
         axios
            .delete("http://localhost/admin/car", {
               params: { carNo: rentCar.carNo },
               headers: {
                  Authorization: `Bearer ${auth.accessToken}`,
               },
            })
            .then((result) => {
               alert("삭제 되었습니다.");
               setIsPageLoad(!isPageLoad);
            })
            .catch((error) => {
               const errors = error.response.data;
               const firstErrorMessage = Object.values(errors)[0];
               alert(firstErrorMessage);
            });
      }
   };

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
                     value={selectedModelNo}
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
                        {updateFormNum == index ? (
                           <Select
                              options={options}
                              placeholder="차량모델 선택"
                              onChange={updateHandleSelectChange}
                              value={updateSelectedModelNo}
                              className="update-options"
                           />
                        ) : (
                           <p>{rentCar.carModel.carModel}</p>
                        )}
                     </div>
                     <div className="car-num">
                        {updateFormNum == index ? (
                           <input
                              type="text"
                              onChange={(e) => setUpdateRentCar(e.target.value)}
                              value={updateRentCar}
                           ></input>
                        ) : (
                           <p>{rentCar.carId}</p>
                        )}
                     </div>
                     <div className="parking-name">
                        <p>
                           {updateFormNum == index && updateParkingInfo
                              ? updateParkingInfo.parkingTitle
                              : rentCar.parking.parkingTitle}
                        </p>
                     </div>
                     <div className="parking-addr">
                        <p>
                           {updateParkingInfo
                              ? updateParkingInfo.parkingAddr
                              : rentCar.parking.parkingAddr}
                        </p>
                     </div>
                     <div className="parking-id">
                        <p>
                           {updateParkingInfo
                              ? updateParkingInfo.parkingId
                              : rentCar.parkingId}
                        </p>
                     </div>

                     <div className="btn-box">
                        <button
                           type="button"
                           className="update-btn"
                           onClick={() => updateFormHandler(rentCar, index)}
                        >
                           {updateFormNum == index ? "취소" : "수정"}
                        </button>
                        {updateFormNum == index ? (
                           <>
                              <button
                                 type="button"
                                 className="parking-search"
                                 onClick={updateModalHandler}
                              >
                                 조회
                              </button>
                              <button
                                 type="button"
                                 className="update-request"
                                 onClick={() => updateRequestHandler(rentCar)}
                              >
                                 수정
                              </button>
                           </>
                        ) : (
                           <button
                              type="button"
                              className="delete-btn"
                              onClick={() => deleteRentCarHandler(rentCar)}
                           >
                              삭제
                           </button>
                        )}
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

         {updateModalOpen && (
            <ParkingModal
               setModalOpen={setUpdateModalOpen}
               modalBackground={modalBackground}
               setParkingInfo={setUpdateParkingInfo}
            />
         )}
      </>
   );
};

export default CarPage;
