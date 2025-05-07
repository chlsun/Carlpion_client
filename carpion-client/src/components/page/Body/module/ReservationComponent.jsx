import { useNavigate } from 'react-router-dom';
import './ReservationComponent.css';
import { useEffect, useState } from 'react';

const Arrow = () =>{
    return <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="#ffffff"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
}

const ReservationComponent = ({reservationList}) =>{

    const navi = useNavigate();

    const gotoHistoryPage = () =>{
        navi("/rent-history");
    }

    if(reservationList == null){
        return(
            <div id="no-search">
                <img src="/img/notFound_car.png" alt="" />
                <p className="msg">칼피온 예약 내역이 없습니다.</p>
            </div> 
        )
    }

    function changeDate(date){
        return date.slice(0, -3);
    }


    function getDiffHour(rentalDate, returnDate){
        const rentalDateType = new Date(rentalDate.replace(" ", "T"));
        const returnDateType = new Date(returnDate.replace(" ", "T"));

        const diffMSec = returnDateType.getTime() - rentalDateType.getTime();
        const diffHour = diffMSec / (60 * 60 * 1000);

        return diffHour;
    }
            
    function getStatus(rentalDate){
        const rentalDateType = new Date(rentalDate.replace(" ", "T"));
        const currentDate = new Date();

        return (rentalDateType < currentDate ? true : false)
    }    
    
    

    return(
        <>
            
            <div id="reservation-container">
                {reservationList.reservation.map((reservation)=>(
                    <div className="reservation-info" key={reservation.carId}>
                    <h3 className="model-name">{reservation.carModel}</h3>
                    <h4 className="car-num">{reservation.carId}</h4>
                    <div className="box">
                        <p className="title">대여/반납 장소</p>
                        <p className="addr">{reservation.parkingAddr}</p>
                    </div>
                    <div className="box">
                        <p className="title">대여/반납일</p>
                        <p className="date">{changeDate(reservation.rentalDate)} ~ {changeDate(reservation.returnDate)} | <b>총 {getDiffHour(reservation.rentalDate, reservation.returnDate)}시간</b></p>
                    </div>
                    <div className="box">
                        <p className="title">결제 금액</p>
                        <p className="price"><b>{reservation.totalPrice}원</b></p>
                    </div>

                    <div className={`status`}><p>{getStatus(reservation.rentalDate) ? "대여중" : "예약"}</p><Arrow/><Arrow/><Arrow/></div>
                    <button className="cancel-btn">예약 취소</button>
                </div>
                ))}
                
                    
                {reservationList.reservationCount > 3 && <button className="goto-rentHistoryPage" onClick={gotoHistoryPage}>더보기</button>}
            </div>

           
        </>
    )
}


export default ReservationComponent;