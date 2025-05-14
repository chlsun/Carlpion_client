import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentHistoryPage.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

const PaymentHistoryPage = () => {
  const navi = useNavigate();
  const { auth } = useContext(AuthContext);
  const location = useLocation();
  const impUID = location.state.impUID;

  const [paymentHistory, setPaymentHistory] = useState(null);

  function hourCalculator(rentalDate, returnDate) {
    const date1 = new Date(rentalDate.replace(" ", "T"));
    const date2 = new Date(returnDate.replace(" ", "T"));

    const diffMs = date2 - date1;

    const diffHours = diffMs / (1000 * 60 * 60);

    return diffHours;
  }

  useEffect(() => {
    if (auth.accessToken) {
      axios
        .get(`http://localhost/rents/payment/${impUID}`, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        })
        .then((result) => {
          const diffHours = hourCalculator(
            result.data.rentalDate,
            result.data.returnDate
          );
          setPaymentHistory({ ...result.data, diffHours });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [location, auth.accessToken]);

  function formattedDate(date) {
    const fomattedDate = date.replaceAll("-", "/");

    return fomattedDate.slice(0, -3);
  }

  if (paymentHistory == null) return null;

  return (
    <>
      <main id="rental-history">
        <div className="main-container">
          <img src="/img/checkmark.png" alt="" />
          <h3>결제가 완료되었습니다!</h3>
          <div className="info-box">
            <p className="left">주문 번호</p>
            <p className="right">{paymentHistory.impUID}</p>
          </div>
          <div className="info-box">
            <p className="left">차량모델명</p>
            <p className="right">{paymentHistory.carModel}</p>
          </div>
          <div className="info-box">
            <p className="left">차량번호</p>
            <p className="right">{paymentHistory.carId}</p>
          </div>
          <div className="info-box">
            <p className="left">대여일</p>
            <p className="right">{formattedDate(paymentHistory.rentalDate)}</p>
          </div>
          <div className="info-box">
            <p className="left">반납일</p>
            <p className="right">{formattedDate(paymentHistory.returnDate)}</p>
          </div>
          <div className="info-box">
            <p className="left">총 대여시간</p>
            <p className="right">{paymentHistory.diffHours}시간</p>
          </div>
          <div className="info-box">
            <p className="left">결제 금액</p>
            <p className="right">{paymentHistory.totalPrice}원</p>
          </div>

          <button className="goto-main" onClick={() => navi("/")}>
            메인페이지로 이동
          </button>
          <button
            className="goto-history"
            onClick={() => navi("/rent-history")}
          >
            차량 렌트 내역 보기
          </button>
        </div>
      </main>
    </>
  );
};
export default PaymentHistoryPage;
