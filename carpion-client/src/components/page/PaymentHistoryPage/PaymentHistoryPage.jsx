const PaymentHistoryPage = () => {
   return (
      <>
         <main id="rental-history">
            <div className="main-container">
               <img src="/img/check.png" alt="" />
               <h3>결제가 완료되었습니다!</h3>
               <div className="info-box">
                  <p className="left">주문 번호</p>
                  <p className="right">1234</p>
               </div>
               <div className="info-box">
                  <p className="left">차량모델명</p>
                  <p className="right">테슬라</p>
               </div>
               <div className="info-box">
                  <p className="left">대여일</p>
                  <p className="right">대여일</p>
               </div>
               <div className="info-box">
                  <p className="left">반납일</p>
                  <p className="right">반납일</p>
               </div>
               <div className="info-box">
                  <p className="left">총 대여시간</p>
                  <p className="right">21시간</p>
               </div>
               <div className="info-box">
                  <p className="left">결제 금액</p>
                  <p className="right">1000원</p>
               </div>

               <button className="goto-main"></button>
               <button className="goto-history"></button>
            </div>
         </main>
      </>
   );
};
export default PaymentHistoryPage;
