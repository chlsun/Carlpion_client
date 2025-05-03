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
   const [carModelInfo, setCarModelInfo] = useState({
      carModel: "",
      rentPrice: "",
      hourPrice: "",
      chargeType: "",
      seatCount: "",
   });
   const [isUpdateForm, setIsUpdateForm] = useState(true);
   const [zoomedImage, setZoomedImage] = useState(null);
   const modalBackground = useRef();
   useEffect(() => {
      if (auth.accessToken != null) {
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

               for(let i = result.data.pageInfo.startPage; i <= result.data.pageInfo.endPage; i++){
                  pageArray.push(i);
               }
               setPageNumbers(pageArray)
            })
            .catch((error) => {
               console.log(error);
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
   const updateFormHandler = () => {
      setIsUpdateForm(!isUpdateForm);
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

   const deleteHandler = (carModel) =>{
      if(!!!confirm("정말로 삭제하시겠습니까?")){
         return;
      }

      axios.delete('http://localhost/admin/model', {
         headers: {
           Authorization: `Bearer ${auth.accessToken}`,
         },
         data: {
           carModel: carModel
         }
       }).then((result)=>{
         console.log(result);
         setIsPageLoad(!isPageLoad);
       }).catch((error)=>{
         console.log(error);
       })
   }

   const pageHandler = (e) =>{
      console.log(e.target.textContent);
      navi(`/admin/model/${e.target.textContent}`);
   }

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
                  <input type="file" accept="image/*" onChange={saveImgFile} ref={fileInputRef} />
               </div>
               <div className="submit-btn">
                  <button type="submit">추가하기</button>
               </div>
            </form>
            <div className={`model-preview ${preview ? "active" : ""}`}>
               <img src={preview} alt="" />
            </div>
            <div className="model-list">
               {carModelList.map((carModel, index) => (
                  <div className="model" key={index}>
                     <div className="model-num">
                        <p>{index + 1 + (page - 1) * 10}</p>
                     </div>
                     <div className="model-name">
                        <p>{carModel.carModel}</p>
                     </div>
                     <div className="rent-price">
                        <p>{carModel.rentPrice}</p>
                     </div>
                     <div className="hour-price">
                        <p>{carModel.hourPrice}</p>
                     </div>
                     <div className="charge-type">
                        <p>{carModel.chargeType}</p>
                     </div>
                     <div className="seat-count">
                        <p>{carModel.seatCount}</p>
                     </div>
                     <div className="model-img">
                        <img
                           src={carModel.imgURL}
                           alt=""
                           onClick={zoomImageHandler}
                        />
                     </div>
                     <div className="btn-box">
                        <button
                           className="update-btn"
                           onClick={updateFormHandler}
                        >
                           수정
                        </button>
                        <button className="delete-btn" onClick={()=>deleteHandler(carModel.carModel)}>삭제</button>
                     </div>
                  </div>
               ))}
            </div>
            <div className="pagination">
               {pageNumbers.map((num)=>(
                  <div className={`page-num ${page == num ? "active" : ""}`} onClick={pageHandler}  key={num}>{num}</div>
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