import "./CarPage.css";
import Select from "react-select";
import { useRef, useState } from "react";
import ParkingModal from "./parkingModal/ParkingModal";

const CarPage = () => {
   const options = [
      { value: "chocolate", label: "차종1" },
      { value: "strawberry", label: "차종2" },
      { value: "vanilla", label: "차종3" },
   ];

   const [modalOpen, setModalOpen] = useState(false);
   const modalBackground = useRef();

   const modalHandler = (e) => {
      e.preventDefault();
      setModalOpen(!modalOpen);
   };

   return (
      <>
         <main id="car-page">
            <form className="car-input">
               <div className="input-box model-name">
                  <Select options={options} placeholder="차량모델 선택" />
               </div>
               <div className="input-box car-num">
                  <input type="text" placeholder="차량 번호" />
               </div>
               <div className="input-box parking-name">
                  <p>주차장 이름</p>
               </div>
               <div className="input-box parking-addr">
                  <p>주차장 주소</p>
               </div>
               <div className="input-box parking-id">
                  <p>주차장 관리ID</p>
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
               <div className="car">
                  <div className="car-no">
                     <p>1</p>
                  </div>
                  <div className="model-name">
                     <p>차량 모델명</p>
                  </div>
                  <div className="car-num">
                     <p>차량 번호</p>
                  </div>
                  <div className="parking-name">
                     <p>주차장 이름</p>
                  </div>
                  <div className="parking-addr">
                     <p>주차장 주소</p>
                  </div>
                  <div className="parking-id">
                     <p>주차장 ID</p>
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
            />
         )}
      </>
   );
};

export default CarPage;
