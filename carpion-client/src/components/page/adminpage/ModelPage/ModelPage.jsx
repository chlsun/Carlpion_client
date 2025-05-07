import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import "./ModelPage.css";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const ModelPage = () => {
   const navi = useNavigate();
   const fileInputRef = useRef(null);

   const { page } = useParams();
   const { auth } = useContext(AuthContext);
   const [imgFile, setimgFile] = useState(null);
   const [preview, setPreview] = useState(null);
   const [isPageLoad, setIsPageLoad] = useState(true);
   const [carModelList, setCarModelList] = useState(null);
   const [pageInfo, setPageInfo] = useState(null);
   const [pageNumbers, setPageNumbers] = useState([1]);
   const [updateIndex, setUpdateIndex] = useState(-1);
   const [carModelInfo, setCarModelInfo] = useState({
      carModel: "",
      rentPrice: "",
      hourPrice: "",
      chargeType: "",
      seatCount: "",
   });

   const [updateCarModel, setUpdateCarModel] = useState({
      modelNo: -1,
      carModel: "",
      rentPrice: "",
      hourPrice: "",
      chargeType: "",
      seatCount: "",
   });
   const [updateImgFile, setUpdateImgFile] = useState(null);
   const [updatePreview, setUpdatePreview] = useState(null);
   const [isUpdateForm, setIsUpdateForm] = useState(false);
   const [zoomedImage, setZoomedImage] = useState(null);
   const modalBackground = useRef();
   useEffect(() => {
      if (auth.accessToken) {
         axios
            .get(`http://localhost/admin/model/${page}`, {
               headers: {
                  Authorization: `Bearer ${auth.accessToken}`,
               },
            })
            .then((result) => {
               console.log(result);
               setCarModelList(result.data.carModelList);
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

               if (result.data.carModelList.length == 0 && page > 1) {
                  navi(`/admin/model/${page - 1}`);
               }
            })
            .catch((error) => {
               console.log(error);
               if (error.response.status == 403) {
                  navi("/");
                  alert("운영자만 이용가능한 페이지입니다.");
               }
            });
      }
   }, [auth, page, isPageLoad]);

   const setCarModelHandler = (e) => {
      console.log(carModelInfo);
      e.preventDefault();
      if (!!!auth.accessToken) {
         alert("로그인 후 다시 시도해주세요");
      }
      if (
         !!!imgFile ||
         !!!carModelInfo.carModel.trim() ||
         !!!carModelInfo.rentPrice.trim() ||
         !!!carModelInfo.hourPrice.trim() ||
         !!!carModelInfo.chargeType.trim() ||
         !!!carModelInfo.seatCount.trim()
      ) {
         alert("모든 정보를 기입해주세요");
         return;
      }
      const formData = new FormData();
      formData.append("carModel", carModelInfo.carModel);
      formData.append("rentPrice", carModelInfo.rentPrice);
      formData.append("hourPrice", carModelInfo.hourPrice);
      formData.append("chargeType", carModelInfo.chargeType);
      formData.append("seatCount", carModelInfo.seatCount);
      formData.append("file", imgFile);
      axios
         .post("http://localhost/admin/model", formData, {
            headers: {
               Authorization: `Bearer ${auth.accessToken}`,
               "Content-Type": "multipart/form-data",
            },
         })
         .then((result) => {
            console.log(result);
            setIsPageLoad(!isPageLoad);
            setCarModelInfo({
               carModel: "",
               rentPrice: "",
               hourPrice: "",
               chargeType: "",
               seatCount: "",
            });
            setimgFile(null);
            setPreview(null);
            if (fileInputRef.current) {
               fileInputRef.current.value = null;
            }
            alert("차량 모델이 추가되었습니다.");
         })
         .catch((error) => {
            console.log(error);
         });
   };
   const saveImgFile = (e) => {
      setPreview(null);
      const selectedFile = e.target.files[0];
      if (selectedFile) {
         setimgFile(selectedFile);
         setPreview(URL.createObjectURL(selectedFile));
      }
   };

   const updateFormHandler = (carModel, index) => {
      setUpdateIndex(-1);

      setIsUpdateForm(!isUpdateForm);
      setUpdateIndex(index);

      setUpdateCarModel({
         modelNo: carModel.modelNo,
         carModel: carModel.carModel,
         rentPrice: carModel.rentPrice,
         hourPrice: carModel.hourPrice,
         chargeType: carModel.chargeType,
         seatCount: carModel.seatCount,
      });
      setUpdateImgFile(carModel.imgURL);
   };

   const updateImgHanlder = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
         setUpdateImgFile(selectedFile);
         setUpdatePreview(URL.createObjectURL(selectedFile));
      }
   };

   const updateRequest = () => {
      console.log("updateImgFile : ", updateImgFile);
      console.log("modelNo : ", updateCarModel.modelNo);
      console.log("carModel : ", updateCarModel.carModel);
      console.log("rentPrice : ", updateCarModel.rentPrice);
      console.log("hourPrice : ", updateCarModel.hourPrice);
      console.log("chargeType : ", updateCarModel.chargeType);
      console.log("seatCount : ", updateCarModel.seatCount);
      if (
         !!!updateImgFile ||
         updateCarModel.modelNo == -1 ||
         !!!updateCarModel.carModel.trim() ||
         !!!String(updateCarModel.rentPrice).trim() ||
         !!!String(updateCarModel.hourPrice).trim() ||
         !!!updateCarModel.chargeType.trim() ||
         !!!String(updateCarModel.seatCount).trim()
      ) {
         alert("모든 정보를 기입해주세요");
         return;
      }
      const formData = new FormData();
      formData.append("modelNo", updateCarModel.modelNo);
      formData.append("carModel", updateCarModel.carModel);
      formData.append("rentPrice", updateCarModel.rentPrice);
      formData.append("hourPrice", updateCarModel.hourPrice);
      formData.append("chargeType", updateCarModel.chargeType);
      formData.append("seatCount", updateCarModel.seatCount);
      formData.append("file", updateImgFile);
      axios
         .put("http://localhost/admin/model", formData, {
            headers: {
               Authorization: `Bearer ${auth.accessToken}`,
               "Content-Type": "multipart/form-data",
            },
         })
         .then((result) => {
            alert("수정 완료 되었습니다.");
            setUpdateIndex(-1);
            setIsUpdateForm(!isUpdateForm);
            setIsPageLoad(!isPageLoad);
         })
         .catch((error) => {
            console.log(error);
         });
   };
   const zoomImageHandler = (e) => {
      const imageSrc = e.target.src;
      setZoomedImage(imageSrc);
   };
   const closeModalHandlerBybg = (e) => {
      if (e.target === modalBackground.current) {
         setZoomedImage(null);
      }
   };
   const closeModalHandler = () => {
      setZoomedImage(null);
   };

   const deleteHandler = (modelNo) => {
      if (!!!confirm("정말로 삭제하시겠습니까?")) {
         return;
      }

      console.log(modelNo);

      axios
         .delete("http://localhost/admin/model", {
            headers: {
               Authorization: `Bearer ${auth.accessToken}`,
            },
            data: {
               modelNo: modelNo,
            },
         })
         .then((result) => {
            console.log(result);
            alert("삭제되었습니다.");
            setIsPageLoad(!isPageLoad);
         })
         .catch((error) => {
            
            alert(error.response.data);
         });
   };

   const pageHandler = (e) => {
      navi(`/admin/model/${e.target.textContent}`);
   };

   if (carModelList == null) {
      return null;
   }

   return (
      <>
         <main id="model-page">
            <form className="model-input" onSubmit={setCarModelHandler}>
               <div className="input-box model-name">
                  <input
                     type="text"
                     placeholder="차량 모델 입력"
                     value={carModelInfo.carModel}
                     onChange={(e) =>
                        setCarModelInfo((prev) => ({
                           ...prev,
                           carModel: e.target.value,
                        }))
                     }
                  />
               </div>
               <div className="input-box rent-price">
                  <input
                     type="text"
                     placeholder="렌트비용 입력"
                     value={carModelInfo.rentPrice}
                     onChange={(e) =>
                        setCarModelInfo((prev) => ({
                           ...prev,
                           rentPrice: e.target.value,
                        }))
                     }
                  />
               </div>
               <div className="input-box hour-price">
                  <input
                     type="text"
                     placeholder="시간당 비용 입력"
                     value={carModelInfo.hourPrice}
                     onChange={(e) =>
                        setCarModelInfo((prev) => ({
                           ...prev,
                           hourPrice: e.target.value,
                        }))
                     }
                  />
               </div>
               <div className="input-box charge-type">
                  <input
                     type="text"
                     placeholder="충전타입 입력"
                     value={carModelInfo.chargeType}
                     onChange={(e) =>
                        setCarModelInfo((prev) => ({
                           ...prev,
                           chargeType: e.target.value,
                        }))
                     }
                  />
               </div>
               <div className="input-box seat-count">
                  <input
                     type="text"
                     placeholder="승차인원 입력"
                     value={carModelInfo.seatCount}
                     onChange={(e) =>
                        setCarModelInfo((prev) => ({
                           ...prev,
                           seatCount: e.target.value,
                        }))
                     }
                  />
               </div>
               <div className="input-box model-img">
                  <input
                     type="file"
                     accept="image/*"
                     onChange={saveImgFile}
                     ref={fileInputRef}
                  />
               </div>
               <div className="submit-btn">
                  <button type="submit">추가하기</button>
               </div>
            </form>
            <div className={`model-preview ${preview ? "active" : ""}`}>
               <img src={preview} alt="" />
            </div>

            <div className="pagination">
               {pageNumbers.map((num) => (
                  <div
                     className={`page-num ${page == num ? "active" : ""}`}
                     onClick={pageHandler}
                     key={num}
                  >
                     {num}
                  </div>
               ))}
            </div>

            <div className="model-list">
               {pageInfo.endPage == 0 && <div className="not-found">차량 모델이 존재하지 않습니다.<br/>차량 모델을 추가해주세요.</div>}
               {carModelList.map((carModel, index) => (
                  <div
                     className={`model ${
                        isUpdateForm && updateIndex == index ? "active" : ""
                     }`}
                     key={carModel.modelNo}
                  >
                     <div className="model-num">
                        <p>{index + 1 + (page - 1) * 10}</p>
                     </div>
                     <div className="model-name">
                        <p className="update-p">{carModel.carModel}</p>
                        <input
                           className="update-input"
                           type="text"
                           value={updateCarModel.carModel}
                           onChange={(e) =>
                              setUpdateCarModel((prev) => ({
                                 ...prev,
                                 carModel: e.target.value,
                              }))
                           }
                        />
                     </div>
                     <div className="rent-price">
                        <p className="update-p">{carModel.rentPrice}</p>
                        <input
                           className="update-input"
                           type="text"
                           value={updateCarModel.rentPrice}
                           onChange={(e) =>
                              setUpdateCarModel((prev) => ({
                                 ...prev,
                                 rentPrice: e.target.value,
                              }))
                           }
                        />
                     </div>
                     <div className="hour-price">
                        <p className="update-p">{carModel.hourPrice}</p>
                        <input
                           className="update-input"
                           type="text"
                           value={updateCarModel.hourPrice}
                           onChange={(e) =>
                              setUpdateCarModel((prev) => ({
                                 ...prev,
                                 hourPrice: e.target.value,
                              }))
                           }
                        />
                     </div>
                     <div className="charge-type">
                        <p className="update-p">{carModel.chargeType}</p>
                        <input
                           className="update-input"
                           type="text"
                           value={updateCarModel.chargeType}
                           onChange={(e) =>
                              setUpdateCarModel((prev) => ({
                                 ...prev,
                                 chargeType: e.target.value,
                              }))
                           }
                        />
                     </div>
                     <div className="seat-count">
                        <p className="update-p">{carModel.seatCount}</p>
                        <input
                           className="update-input"
                           type="text"
                           value={updateCarModel.seatCount}
                           onChange={(e) =>
                              setUpdateCarModel((prev) => ({
                                 ...prev,
                                 seatCount: e.target.value,
                              }))
                           }
                        />
                     </div>
                     <div className="model-img">
                        {isUpdateForm && updateIndex == index ? (
                           <>
                              <img
                                 src={
                                    updatePreview
                                       ? updatePreview
                                       : carModel.imgURL
                                 }
                                 alt=""
                                 onClick={zoomImageHandler}
                              />
                              <input
                                 type="file"
                                 accept="image/*"
                                 onChange={updateImgHanlder}
                                 id="update-file"
                              />
                              <label htmlFor="update-file">
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24px"
                                    viewBox="0 -960 960 960"
                                    width="24px"
                                    fill="#e3e3e3"
                                 >
                                    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z" />
                                 </svg>
                              </label>
                           </>
                        ) : (
                           <img
                              src={carModel.imgURL}
                              alt=""
                              onClick={zoomImageHandler}
                           />
                        )}
                     </div>
                     <div className="btn-box">
                        <button
                           className="update-btn"
                           onClick={() => updateFormHandler(carModel, index)}
                        >
                           {isUpdateForm && updateIndex == index
                              ? "취소"
                              : "수정"}
                        </button>
                        {isUpdateForm && updateIndex == index ? (
                           <button
                              className="real-update-btn"
                              onClick={() => updateRequest()}
                           >
                              수정
                           </button>
                        ) : (
                           <button
                              className="delete-btn"
                              onClick={() => deleteHandler(carModel.modelNo)}
                           >
                              삭제
                           </button>
                        )}
                     </div>
                  </div>
               ))}
            </div>
         </main>
         {zoomedImage && (
            <div
               id="img-modal"
               ref={modalBackground}
               onClick={closeModalHandlerBybg}
            >
               <div className="modal-container">
                  <img src={zoomedImage} alt="" />
                  <div className="exit-btn" onClick={closeModalHandler}>
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#E3E3E3"
                     >
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                     </svg>
                  </div>
               </div>
            </div>
         )}
      </>
   );
};
export default ModelPage;
