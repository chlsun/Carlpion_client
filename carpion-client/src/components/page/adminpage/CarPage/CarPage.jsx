import "./CarPage.css";
import "../../reset.css";
import Select from "react-select";

const CarPage = () => {
   const options = [
      { value: "chocolate", label: "차종1" },
      { value: "strawberry", label: "차종2" },
      { value: "vanilla", label: "차종3" },
   ];

   return (
      <>
         <main id="car-page">
            <form className="model-input">
               <div className="input-box model-name">
                  <Select options={options} />
                  <input type="text" placeholder="차량 모델 입력" />
               </div>
               <div className="input-box rent-price">
                  <input type="text" placeholder="렌트비용 입력" />
               </div>
               <div className="input-box hour-price">
                  <input type="text" placeholder="시간당 비용 입력" />
               </div>
               <div className="input-box charge-type">
                  <input type="text" placeholder="충전타입 입력" />
               </div>
               <div className="input-box seat-count">
                  <input type="text" placeholder="승차인원 입력" />
               </div>
               <div className="input-box model-img">
                  <input type="file" accept="image/*" />
               </div>
               <div className="submit-btn">
                  <button type="submit">추가하기</button>
               </div>
            </form>
         </main>
      </>
   );
};

export default CarPage;
