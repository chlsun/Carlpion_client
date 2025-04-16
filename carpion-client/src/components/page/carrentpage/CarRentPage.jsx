import Select from "react-select";
import "./CarRentPage.css";
import CarRentMap from "../../include/map/carRentMap/CarRentMap";
import { useNavigate } from "react-router-dom";

const CarRentPage = () => {
   const navi = useNavigate();

   const yymmdd = [
      { value: "250409", label: "2025/04/09" },
      { value: "250410", label: "2025/04/10" },
      { value: "250411", label: "2025/04/11" },
      { value: "250412", label: "2025/04/12" },
      { value: "250413", label: "2025/04/13" },
      { value: "250414", label: "2025/04/14" },
      { value: "250415", label: "2025/04/15" },
      { value: "250416", label: "2025/04/16" },
      { value: "250417", label: "2025/04/17" },
      { value: "250418", label: "2025/04/18" },
      { value: "250419", label: "2025/04/19" },
      { value: "250420", label: "2025/04/20" },
   ];

   const rentalhour = Array.from({ length: 24 }, (_, i) => {
      const hour = i.toString().padStart(2, "0");
      return { value: hour, label: `${hour}:00` };
   });

   return (
      <>
         <main id="car-rent-page">
            <section className="banner">
               <div className="map">
                  <CarRentMap />
               </div>

               <div className="select-container">
                  <div className="rental-date">
                     <h3 className="title">대여</h3>
                     <div className="select-box">
                        <Select
                           options={yymmdd}
                           placeholder="대여일"
                           className="rental-yymmdd"
                        />
                        <Select
                           options={rentalhour}
                           placeholder="대여시간"
                           className="rental-hour"
                        />
                     </div>
                  </div>
                  <div className="return-date">
                     <h3 className="title">반납</h3>
                     <div className="select-box">
                        <Select
                           options={yymmdd}
                           placeholder="반납일"
                           className="rental-yymmdd"
                        />
                        <Select
                           options={rentalhour}
                           placeholder="반납시간"
                           className="rental-hour"
                        />
                     </div>
                  </div>
                  <div className="addr">
                     <h3 className="title">지역</h3>
                     <div className="select-box">
                        <Select
                           options={yymmdd}
                           placeholder="지역 선택"
                           className="rental-yymmdd"
                        />
                     </div>
                  </div>
               </div>
            </section>

            <section className="car-list">
               <div className="rent-car">
                  <div className="car-info">
                     <div className="car-img"></div>
                     <div className="info">
                        <p className="car-model">차량 모델 명 / 5인승</p>
                        <p className="rent-price">1500원</p>
                        <p className="hour-price">120원/h</p>
                        <p className="total-price">예상 가격 : 11200원</p>
                     </div>
                  </div>
                  <p className="parking-name">운정역 공영주차장</p>
                  <p className="parking-addr">경기도 파주시 목동동 뭐시기</p>
                  <button className="rent-btn" onClick={() => navi("/rent/1")}>
                     예약하기
                  </button>
               </div>
               <div className="rent-car">
                  <div className="car-info">
                     <div className="car-img"></div>
                     <div className="info">
                        <p className="car-model">차량 모델 명 / 5인승</p>
                        <p className="rent-price">1500원</p>
                        <p className="hour-price">120원/h</p>
                        <p className="total-price">예상 가격 : 11200원</p>
                     </div>
                  </div>
                  <p className="parking-name">운정역 공영주차장</p>
                  <p className="parking-addr">경기도 파주시 목동동 뭐시기</p>
                  <button className="rent-btn" onClick={() => navi("/rent/1")}>
                     예약하기
                  </button>
               </div>
               <div className="rent-car active">
                  <div className="car-info">
                     <div className="car-img"></div>
                     <div className="info">
                        <p className="car-model">차량 모델 명 / 5인승</p>
                        <p className="rent-price">1500원</p>
                        <p className="hour-price">120원/h</p>
                        <p className="total-price">예상 가격 : 11200원</p>
                     </div>
                  </div>
                  <p className="parking-name">운정역 공영주차장</p>
                  <p className="parking-addr">경기도 파주시 목동동 뭐시기</p>
                  <button className="rent-btn" onClick={() => navi("/rent/1")}>
                     예약하기
                  </button>
                  <div className="no-rent">
                     <div className="txt">예약불가</div>
                  </div>
               </div>
               <div className="rent-car">
                  <div className="car-info">
                     <div className="car-img"></div>
                     <div className="info">
                        <p className="car-model">차량 모델 명 / 5인승</p>
                        <p className="rent-price">1500원</p>
                        <p className="hour-price">120원/h</p>
                        <p className="total-price">예상 가격 : 11200원</p>
                     </div>
                  </div>
                  <p className="parking-name">운정역 공영주차장</p>
                  <p className="parking-addr">경기도 파주시 목동동 뭐시기</p>
                  <button className="rent-btn" onClick={() => navi("/rent/1")}>
                     예약하기
                  </button>
               </div>
               <div className="rent-car">
                  <div className="car-info">
                     <div className="car-img"></div>
                     <div className="info">
                        <p className="car-model">차량 모델 명 / 5인승</p>
                        <p className="rent-price">1500원</p>
                        <p className="hour-price">120원/h</p>
                        <p className="total-price">예상 가격 : 11200원</p>
                     </div>
                  </div>
                  <p className="parking-name">운정역 공영주차장</p>
                  <p className="parking-addr">경기도 파주시 목동동 뭐시기</p>
                  <button className="rent-btn" onClick={() => navi("/rent/1")}>
                     예약하기
                  </button>
               </div>
               <div className="rent-car">
                  <div className="car-info">
                     <div className="car-img"></div>
                     <div className="info">
                        <p className="car-model">차량 모델 명 / 5인승</p>
                        <p className="rent-price">1500원</p>
                        <p className="hour-price">120원/h</p>
                        <p className="total-price">예상 가격 : 11200원</p>
                     </div>
                  </div>
                  <p className="parking-name">운정역 공영주차장</p>
                  <p className="parking-addr">경기도 파주시 목동동 뭐시기</p>
                  <button className="rent-btn" onClick={() => navi("/rent/1")}>
                     예약하기
                  </button>
               </div>
               <div className="rent-car">
                  <div className="car-info">
                     <div className="car-img"></div>
                     <div className="info">
                        <p className="car-model">차량 모델 명 / 5인승</p>
                        <p className="rent-price">1500원</p>
                        <p className="hour-price">120원/h</p>
                        <p className="total-price">예상 가격 : 11200원</p>
                     </div>
                  </div>
                  <p className="parking-name">운정역 공영주차장</p>
                  <p className="parking-addr">경기도 파주시 목동동 뭐시기</p>
                  <button className="rent-btn" onClick={() => navi("/rent/1")}>
                     예약하기
                  </button>
               </div>
            </section>
         </main>
      </>
   );
};

export default CarRentPage;
