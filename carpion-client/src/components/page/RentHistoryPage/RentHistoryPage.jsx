import { useNavigate } from 'react-router-dom';
import './RentHistoryPage.css'

const Arrow = () =>{
    return <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="#ffffff"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
}

const RentHistoryPage = () =>{

    const navi = useNavigate();

    const gotoBack = () =>{
        navi(-1);
    }

    return(
        <>
            <div id="rent-history">
                <div className="back-btn" onClick={gotoBack}>
                    <Arrow/>
                </div>
                <div className="container">
                    <h1 className="title">이용 내역</h1>
                    <div className="rent-component active">
                        <div className="car-info">
                            <p className="model-name">테슬라 |</p>
                            <p className="car-num">12가1234</p>
                        </div>

                        <div className="box">
                            <p className="title">주문 번호</p>
                            <p className="impUID">12341421521</p>
                        </div>
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
                        <div className="absolute">
                            <button className="cancel-btn">예약 취소</button>
                            <div className={`status`}><p>대여중</p><Arrow/><Arrow/><Arrow/></div>
                        </div>
                        
                    </div>
                    <div className="rent-component">
                        <div className="car-info">
                            <p className="model-name">테슬라 |</p>
                            <p className="car-num">12가1234</p>
                        </div>

                        <div className="box">
                            <p className="title">주문 번호</p>
                            <p className="impUID">12341421521</p>
                        </div>
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
                        <div className="absolute">
                            <div className={`status`}><p>반납 완료</p><Arrow/><Arrow/><Arrow/></div>
                        </div>
                    </div>

                    <div className="rent-component">
                        <div className="car-info">
                            <p className="model-name">테슬라 |</p>
                            <p className="car-num">12가1234</p>
                        </div>

                        <div className="box">
                            <p className="title">주문 번호</p>
                            <p className="impUID">12341421521</p>
                        </div>
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
                        <div className="absolute">
                            <div className={`status`}><p>반납 완료</p><Arrow/><Arrow/><Arrow/></div>
                        </div>
                    </div>

                    <button className="more-btn">더보기</button>
                </div>
            </div>
        </>
    )
}

export default RentHistoryPage;