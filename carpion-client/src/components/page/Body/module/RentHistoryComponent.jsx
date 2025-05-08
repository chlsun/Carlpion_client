import { useNavigate } from "react-router-dom";
import "./RentHistoryComponent.css";
import { useState } from "react";

const Arrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="14px"
      viewBox="0 -960 960 960"
      width="14px"
      fill="#ffffff"
    >
      <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
    </svg>
  );
};

const RentHistoryComponent = (props) => {
  const navi = useNavigate();

  const gotoHistoryPage = () => {
    navi("/rent-history");
  };
  const getRentalHours = (start, end) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const diffHours = (endTime - startTime) / (1000 * 60 * 60);
    return diffHours;
  };

  if (props.rentHistory.length == 0) {
    return (
      <div id="no-search">
        <img src="/img/notFound_car.png" alt="" />
        <p className="msg">칼피온 이용내역이 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      <div id="rent-history-list">
        <p className="more-btn" onClick={gotoHistoryPage}>
          전체보기
          <Arrow />
          <Arrow />
        </p>
        {props.rentHistory.slice(0, 3).map((rent) => (
          <div className="rent-history" key={rent.reservationId}>
            <div className="left">
              <div className="model-name">
                <h3>{rent.carModel}</h3>
                <p className="status">반납완료</p>
              </div>
              <p className="car-num">{rent.carId}</p>
            </div>

            <div className="right">
              <p className="addr">{rent.parkingAddr}</p>
              <p className="date">
                {rent.rentalDate} ~ {rent.returnDate} |{" "}
                <b>총 {getRentalHours(rent.rentalDate, rent.returnDate)}시간</b>
              </p>
              <p className="price">
                결제금액 | <b>{rent.totalPrice.toLocaleString()}</b>
              </p>
            </div>
          </div>
        ))}
        {/* 예약 내역이 3개 초과시 보이기 */}
        <button className="goto-rentHistoryPage" onClick={gotoHistoryPage}>
          더보기
        </button>
      </div>

      {/* 이용 내역 없을떄 보여주는 컴포넌트 */}
    </>
  );
};

export default RentHistoryComponent;
