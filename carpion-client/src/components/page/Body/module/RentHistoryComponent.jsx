import { useNavigate } from 'react-router-dom';
import './RentHistoryComponent.css';


const RentHistoryComponent = () =>{

    const navi = useNavigate();

    const gotoHistoryPage = () =>{
        navi("/rent-history");
    }

    return(
        <>
            <div id="rent-history-list">
                {/* 렌트 내역 보여지는 부분
                    반복문 돌리면 됨 
                    ex) rentHistory.map((rent) => ()) */}
                <div className="rent-history">
                    <div className="left">
                        <div className="model-name">
                            <h3>테슬라</h3>
                            <p className="status">반납완료</p>
                        </div>
                        <p className="car-num">12가1234</p>
                    </div>

                    <div className="right">
                        <p className="addr">경기도 파주시 목동동 뭐시기</p>
                        <p className="date">25/05/05 15:00 ~ 25/05/05 19:00 | <b>총 4시간</b></p>
                        <p className="price">결제금액 | <b>10020원</b></p>
                    </div>
                </div>
                <div className="rent-history">
                    <div className="left">
                        <div className="model-name">
                            <h3>테슬라</h3>
                            <p className="status">반납완료</p>
                        </div>
                        <p className="car-num">12가1234</p>
                    </div>

                    <div className="right">
                        <p className="addr">경기도 파주시 목동동 뭐시기</p>
                        <p className="date">25/05/05 15:00 ~ 25/05/05 19:00 | <b>총 4시간</b></p>
                        <p className="price">결제금액 | <b>10020원</b></p>
                    </div>
                </div>
                
                {/* 예약 내역이 3개 초과시 보이기 */}
                <button className="goto-rentHistoryPage" onClick={gotoHistoryPage}>더보기</button>
            </div>


            {/* 이용 내역 없을떄 보여주는 컴포넌트 */}
            {/* <div id="no-search">
                <img src="/img/notFound_car.png" alt="" />
                <p className="msg">칼피온 이용내역이 없습니다.</p>
            </div> */}
        </>
    )
}

export default RentHistoryComponent;