import './ReservationComponent.css';

const Arrow = () =>{
    return <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="#ffffff"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
}

const ReservationComponent = () =>{
    return(
        <>
            <div id="reservation-container">
                <h3 className="model-name">테슬라</h3>
                <h4 className="car-num">12가3456</h4>
                <div className="box">
                    <p className="title">대여/반납 장소</p>
                    <p className="addr">경기도 파주시 목동동 뭐시기</p>
                </div>
                <div className="box">
                    <p className="title">대여/반납일</p>
                    <p className="date">25/05/05 15:00 ~ 25/05/05 19:00 | <b>총 4시간</b></p>
                </div>
                <div className="box">
                    <p className="title">결제 금액</p>
                    <p className="price"><b>10020원</b></p>
                </div>

                <div className={`status`}><p>예약</p><Arrow/><Arrow/><Arrow/></div>
                <button className="cancel-btn">예약 취소</button>
            </div>

            {/* <div id="no-search">
                <img src="/img/notFound_car.png" alt="" />
                <p className="msg">칼피온 예약 내역이 없습니다.</p>
            </div> */}
        </>
    )
}


export default ReservationComponent;