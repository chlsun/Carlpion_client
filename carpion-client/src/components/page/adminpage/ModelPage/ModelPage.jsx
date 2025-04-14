import "./ModelPage.css";
import "../../reset.css";
import { useState } from "react";
const ModelPage = () => {
   const [imgFile, setFile] = useState(null);
   const [preview, setPreview] = useState(null);
   const [isUpdateForm, setIsUpdateForm] = useState(true);

   const saveImgFile = (e) => {
      setPreview(null);
      const selectedFile = e.target.files[0];

      if (selectedFile) {
         setFile(selectedFile);
         setPreview(URL.createObjectURL(selectedFile));
      }
   };

   const updateFormHandler = () => {
      setIsUpdateForm(!isUpdateForm);
   };

   return (
      <>
         <main id="model-page">
            <form className="model-input">
               <div className="input-box model-name">
                  <input type="text" placeholder="차량 모델 입력" />
               </div>
               <div className="input-box rent-price">
                  <input type="text" placeholder="렌트비용 입력" />
               </div>
               <div className="input-box hour-price">
                  <input type="text" placeholder="시간당 비용 입력" />
               </div>
               <div className="input-box charge-type">
                  <input type="text" placeholder="충전타입 입력" />
               </div>
               <div className="input-box seat-count">
                  <input type="text" placeholder="승차인원 입력" />
               </div>
               <div className="input-box model-img">
                  <input type="file" accept="image/*" onChange={saveImgFile} />
               </div>
               <div className="submit-btn">
                  <button type="submit">추가하기</button>
               </div>
            </form>

            <div className={`model-preview ${preview ? "active" : ""}`}>
               <img src={preview} alt="" />
            </div>

            <div className="model-list">
               <div className="model">
                  <div className="model-num">
                     <p>1</p>
                  </div>
                  <div className="model-name">
                     <p>차량 모델명</p>
                  </div>
                  <div className="rent-price">
                     <p>렌트 비용</p>
                  </div>
                  <div className="hour-price">
                     <p>시간당 비용</p>
                  </div>
                  <div className="charge-type">
                     <p>충전타입</p>
                  </div>
                  <div className="seat-count">
                     <p>승차인원</p>
                  </div>
                  <div className="model-img">
                     <img src="/img/테슬라.webp" alt="" />
                  </div>
                  <div className="btn-box">
                     <button className="update-btn" onClick={updateFormHandler}>
                        수정
                     </button>
                     <button className="delete-btn">삭제</button>
                  </div>
               </div>
               <div className="model">
                  <div className="model-num">
                     <p>1</p>
                  </div>
                  <div className="model-name">
                     <p>차량 모델명</p>
                  </div>
                  <div className="rent-price">
                     <p>렌트 비용</p>
                  </div>
                  <div className="hour-price">
                     <p>시간당 비용</p>
                  </div>
                  <div className="charge-type">
                     <p>충전타입</p>
                  </div>
                  <div className="seat-count">
                     <p>승차인원</p>
                  </div>
                  <div className="model-img">
                     <img src="/img/테슬라.webp" alt="" />
                  </div>
                  <div className="btn-box">
                     <button className="update-btn">수정</button>
                     <button className="delete-btn">삭제</button>
                  </div>
               </div>
               <div className="model">
                  <div className="model-num">
                     <p>1</p>
                  </div>
                  <div className="model-name">
                     <p>차량 모델명</p>
                  </div>
                  <div className="rent-price">
                     <p>렌트 비용</p>
                  </div>
                  <div className="hour-price">
                     <p>시간당 비용</p>
                  </div>
                  <div className="charge-type">
                     <p>충전타입</p>
                  </div>
                  <div className="seat-count">
                     <p>승차인원</p>
                  </div>
                  <div className="model-img">
                     <img src="/img/테슬라.webp" alt="" />
                  </div>
                  <div className="btn-box">
                     <button className="update-btn">수정</button>
                     <button className="delete-btn">삭제</button>
                  </div>
               </div>
               <div className="model">
                  <div className="model-num">
                     <p>1</p>
                  </div>
                  <div className="model-name">
                     <p>차량 모델명</p>
                  </div>
                  <div className="rent-price">
                     <p>렌트 비용</p>
                  </div>
                  <div className="hour-price">
                     <p>시간당 비용</p>
                  </div>
                  <div className="charge-type">
                     <p>충전타입</p>
                  </div>
                  <div className="seat-count">
                     <p>승차인원</p>
                  </div>
                  <div className="model-img">
                     <img src="/img/테슬라.webp" alt="" />
                  </div>
                  <div className="btn-box">
                     <button className="update-btn">수정</button>
                     <button className="delete-btn">삭제</button>
                  </div>
               </div>
               <div className="model">
                  <div className="model-num">
                     <p>1</p>
                  </div>
                  <div className="model-name">
                     <p>차량 모델명</p>
                  </div>
                  <div className="rent-price">
                     <p>렌트 비용</p>
                  </div>
                  <div className="hour-price">
                     <p>시간당 비용</p>
                  </div>
                  <div className="charge-type">
                     <p>충전타입</p>
                  </div>
                  <div className="seat-count">
                     <p>승차인원</p>
                  </div>
                  <div className="model-img">
                     <img src="/img/테슬라.webp" alt="" />
                  </div>
                  <div className="btn-box">
                     <button className="update-btn">수정</button>
                     <button className="delete-btn">삭제</button>
                  </div>
               </div>
               <div className="model">
                  <div className="model-num">
                     <p>1</p>
                  </div>
                  <div className="model-name">
                     <p>차량 모델명</p>
                  </div>
                  <div className="rent-price">
                     <p>렌트 비용</p>
                  </div>
                  <div className="hour-price">
                     <p>시간당 비용</p>
                  </div>
                  <div className="charge-type">
                     <p>충전타입</p>
                  </div>
                  <div className="seat-count">
                     <p>승차인원</p>
                  </div>
                  <div className="model-img">
                     <img src="/img/테슬라.webp" alt="" />
                  </div>
                  <div className="btn-box">
                     <button className="update-btn">수정</button>
                     <button className="delete-btn">삭제</button>
                  </div>
               </div>
               <div className="model">
                  <div className="model-num">
                     <p>1</p>
                  </div>
                  <div className="model-name">
                     <p>차량 모델명</p>
                  </div>
                  <div className="rent-price">
                     <p>렌트 비용</p>
                  </div>
                  <div className="hour-price">
                     <p>시간당 비용</p>
                  </div>
                  <div className="charge-type">
                     <p>충전타입</p>
                  </div>
                  <div className="seat-count">
                     <p>승차인원</p>
                  </div>
                  <div className="model-img">
                     <img src="/img/테슬라.webp" alt="" />
                  </div>
                  <div className="btn-box">
                     <button className="update-btn">수정</button>
                     <button className="delete-btn">삭제</button>
                  </div>
               </div>
               <div className="model">
                  <div className="model-num">
                     <p>1</p>
                  </div>
                  <div className="model-name">
                     <p>차량 모델명</p>
                  </div>
                  <div className="rent-price">
                     <p>렌트 비용</p>
                  </div>
                  <div className="hour-price">
                     <p>시간당 비용</p>
                  </div>
                  <div className="charge-type">
                     <p>충전타입</p>
                  </div>
                  <div className="seat-count">
                     <p>승차인원</p>
                  </div>
                  <div className="model-img">
                     <img src="/img/테슬라.webp" alt="" />
                  </div>
                  <div className="btn-box">
                     <button className="update-btn">수정</button>
                     <button className="delete-btn">삭제</button>
                  </div>
               </div>
               <div className="model">
                  <div className="model-num">
                     <p>1</p>
                  </div>
                  <div className="model-name">
                     <p>차량 모델명</p>
                  </div>
                  <div className="rent-price">
                     <p>렌트 비용</p>
                  </div>
                  <div className="hour-price">
                     <p>시간당 비용</p>
                  </div>
                  <div className="charge-type">
                     <p>충전타입</p>
                  </div>
                  <div className="seat-count">
                     <p>승차인원</p>
                  </div>
                  <div className="model-img">
                     <img src="/img/테슬라.webp" alt="" />
                  </div>
                  <div className="btn-box">
                     <button className="update-btn">수정</button>
                     <button className="delete-btn">삭제</button>
                  </div>
               </div>
               <div className="model">
                  <div className="model-num">
                     <p>1</p>
                  </div>
                  <div className="model-name">
                     <p>차량 모델명</p>
                  </div>
                  <div className="rent-price">
                     <p>렌트 비용</p>
                  </div>
                  <div className="hour-price">
                     <p>시간당 비용</p>
                  </div>
                  <div className="charge-type">
                     <p>충전타입</p>
                  </div>
                  <div className="seat-count">
                     <p>승차인원</p>
                  </div>
                  <div className="model-img">
                     <img src="/img/테슬라.webp" alt="" />
                  </div>
                  <div className="btn-box">
                     <button className="update-btn">수정</button>
                     <button className="delete-btn">삭제</button>
                  </div>
               </div>
               <div className="model">
                  <div className="model-num">
                     <p>1</p>
                  </div>
                  <div className="model-name">
                     <p>차량 모델명</p>
                  </div>
                  <div className="rent-price">
                     <p>렌트 비용</p>
                  </div>
                  <div className="hour-price">
                     <p>시간당 비용</p>
                  </div>
                  <div className="charge-type">
                     <p>충전타입</p>
                  </div>
                  <div className="seat-count">
                     <p>승차인원</p>
                  </div>
                  <div className="model-img">
                     <img src="/img/테슬라.webp" alt="" />
                  </div>
                  <div className="btn-box">
                     <button className="update-btn">수정</button>
                     <button className="delete-btn">삭제</button>
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
      </>
   );
};

export default ModelPage;
