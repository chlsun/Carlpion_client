import { useNavigate } from 'react-router-dom';
import './RentHistoryPage.css'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';

const Arrow = () =>{
    return <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="#ffffff"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
}

const RentHistoryPage = () =>{

    const {auth} = useContext(AuthContext);
    const navi = useNavigate();

    const [reservationList, setReservationList] = useState([]);
    const [reservationHistory, setReservationHistory] = useState(null);
    const [limit, setLimit] = useState(0);

    const gotoBack = () =>{
        navi(-1);
    }

    if(!sessionStorage.getItem("accessToken")){
        alert("로그인 후 다시 시도해주세요");
        navi("/start")
    }

    useEffect(()=>{
        if(auth.accessToken){
            axios.get("http://localhost/rents/reservations",
                {
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                }
            ).then((result)=>{
                setReservationList(result.data);
            }).catch((error)=>{
                console.log(error);
            })
        }
    },[auth.accessToken])

    useEffect(()=>{
        if(auth.accessToken){
            axios.get(`http://localhost/rents/history/${4 + limit}`,
                {
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                }
            ).then((result)=>{
                console.log(result.data);
                setReservationHistory(result.data);
            }).catch((error)=>{
                console.log(error);
            })
        }
    },[auth.accessToken, limit])

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

    // if(reservationHistory == null) return null;

    return(
        <>
            
                <div id="rent-history">
                    {reservationHistory && reservationList.length != 0 ? (
                    <>
                        <div className="back-btn" onClick={gotoBack}>
                            <Arrow/>
                        </div>
                        <div className="container">
                            <h1 className="title">이용 내역</h1>
                            <div className="rent-component_ing">
                                {reservationList.map((reservation)=>(
                                    <div className="rent-component" key={reservation.impUID}>
                                    <div className="car-info">
                                        <p className="model-name">{reservation.carModel} |</p>
                                        <p className="car-num">{reservation.carId}</p>
                                    </div>

                                    <div className="box">
                                        <p className="title">주문 번호</p>
                                        <p className="impUID">{reservation.impUID}</p>
                                    </div>
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
                                    <div className="absolute">
                                    {!getStatus(reservation.rentalDate) && <button className="cancel-btn">예약 취소</button>}
                                        <div className={`status`}><p>{getStatus(reservation.rentalDate) ? "대여중" : "예약"}</p><Arrow/><Arrow/><Arrow/></div>
                                    </div>
                                </div>
                                ))}
                            </div>

                            {reservationList.length != 0 && <div className='wall'></div>}
                            
                            {reservationHistory.historyList.map((history)=>(
                                <div className="rent-component" key={history.impUID}>
                                <div className="car-info">
                                    <p className="model-name">{history.carModel} |</p>
                                    <p className="car-num">{history.carId}</p>
                                </div>

                                <div className="box">
                                    <p className="title">주문 번호</p>
                                    <p className="impUID">{history.impUID}</p>
                                </div>
                                <div className="box">
                                    <p className="title">대여/반납 장소</p>
                                    <p className="addr">{history.parkingAddr}</p>
                                </div>
                                <div className="box">
                                    <p className="title">대여/반납일</p>
                                    <p className="date">{changeDate(history.rentalDate)} ~ {changeDate(history.returnDate)} | <b>총 {getDiffHour(history.rentalDate, history.returnDate)}시간</b></p>
                                </div>
                                <div className="box">
                                    <p className="title">결제 금액</p>
                                    <p className="price"><b>{history.totalPrice}원</b></p>
                                </div>
                                <div className="absolute">
                                    <div className={`status`}><p>반납 완료</p><Arrow/><Arrow/><Arrow/></div>
                                </div>
                            </div>
                            ))}

                            {reservationHistory.historyList.length < reservationHistory.historyCount && <button className="more-btn" onClick={()=>{setLimit(limit + 4)}}>더보기</button>}
                        </div>
                    </>
                    ) : (
                        <div className='rentHistory-not-found'>
                            <img src="/img/notFound_car.png" alt="" />
                            <p className="msg">칼피온 예약 내역이 없습니다.</p>
                        </div>
                    )}
                </div>
            
            
        </>
    )
}

export default RentHistoryPage;