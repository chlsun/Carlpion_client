import "./ParkingModal.css";

const ParkingModal = ({ setModalOpen, modalBackground }) => {
   const bgModalHandler = (e) => {
      if (e.target === modalBackground.current) {
         setModalOpen(false);
      }
   };

   const modalHandler = () => {
      setModalOpen(false);
   };

   const searchHandler = (e) => {
      e.preventDefault();
      alert("임시 search");
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
                  />
                  <button type="submit" className="search-btn">
                     검색
                  </button>
               </form>

               <div className="search-list">
                  <div className="parking-info">
                     <div className="num">
                        <p>1</p>
                     </div>
                     <div className="name">
                        <p>주차장 이름</p>
                     </div>
                     <div className="addr">
                        <p>주차장 주소</p>
                     </div>
                     <div className="id">
                        <p>주차장 ID</p>
                     </div>
                     <button className="choose-btn">선택</button>
                  </div>
                  <div className="parking-info">
                     <div className="num">
                        <p>1</p>
                     </div>
                     <div className="name">
                        <p>주차장 이름</p>
                     </div>
                     <div className="addr">
                        <p>주차장 주소</p>
                     </div>
                     <div className="id">
                        <p>주차장 ID</p>
                     </div>
                     <button className="choose-btn">선택</button>
                  </div>
                  <div className="parking-info">
                     <div className="num">
                        <p>1</p>
                     </div>
                     <div className="name">
                        <p>주차장 이름</p>
                     </div>
                     <div className="addr">
                        <p>주차장 주소</p>
                     </div>
                     <div className="id">
                        <p>주차장 ID</p>
                     </div>
                     <button className="choose-btn">선택</button>
                  </div>
                  <div className="parking-info">
                     <div className="num">
                        <p>1</p>
                     </div>
                     <div className="name">
                        <p>주차장 이름</p>
                     </div>
                     <div className="addr">
                        <p>주차장 주소</p>
                     </div>
                     <div className="id">
                        <p>주차장 ID</p>
                     </div>
                     <button className="choose-btn">선택</button>
                  </div>
                  <div className="parking-info">
                     <div className="num">
                        <p>1</p>
                     </div>
                     <div className="name">
                        <p>주차장 이름</p>
                     </div>
                     <div className="addr">
                        <p>주차장 주소</p>
                     </div>
                     <div className="id">
                        <p>주차장 ID</p>
                     </div>
                     <button className="choose-btn">선택</button>
                  </div>
                  <div className="parking-info">
                     <div className="num">
                        <p>1</p>
                     </div>
                     <div className="name">
                        <p>주차장 이름</p>
                     </div>
                     <div className="addr">
                        <p>주차장 주소</p>
                     </div>
                     <div className="id">
                        <p>주차장 ID</p>
                     </div>
                     <button className="choose-btn">선택</button>
                  </div>
                  <div className="parking-info">
                     <div className="num">
                        <p>1</p>
                     </div>
                     <div className="name">
                        <p>주차장 이름</p>
                     </div>
                     <div className="addr">
                        <p>주차장 주소</p>
                     </div>
                     <div className="id">
                        <p>주차장 ID</p>
                     </div>
                     <button className="choose-btn">선택</button>
                  </div>
                  <div className="parking-info">
                     <div className="num">
                        <p>1</p>
                     </div>
                     <div className="name">
                        <p>주차장 이름</p>
                     </div>
                     <div className="addr">
                        <p>주차장 주소</p>
                     </div>
                     <div className="id">
                        <p>주차장 ID</p>
                     </div>
                     <button className="choose-btn">선택</button>
                  </div>
                  <div className="parking-info">
                     <div className="num">
                        <p>1</p>
                     </div>
                     <div className="name">
                        <p>주차장 이름</p>
                     </div>
                     <div className="addr">
                        <p>주차장 주소</p>
                     </div>
                     <div className="id">
                        <p>주차장 ID</p>
                     </div>
                     <button className="choose-btn">선택</button>
                  </div>
                  <div className="parking-info">
                     <div className="num">
                        <p>1</p>
                     </div>
                     <div className="name">
                        <p>주차장 이름</p>
                     </div>
                     <div className="addr">
                        <p>주차장 주소</p>
                     </div>
                     <div className="id">
                        <p>주차장 ID</p>
                     </div>
                     <button className="choose-btn">선택</button>
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
            </div>
         </div>
      </>
   );
};

export default ParkingModal;
