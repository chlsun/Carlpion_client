import { useNavigate } from "react-router-dom";

const MainPage = () => {
   const navi = useNavigate();

   return (
      <>
         <h3
            className="test-navi"
            onClick={() => navi("/rent")}
            style={{ cursor: "pointer", margin: "400px" }}
         >
            자동차 렌트 페이지 이동
         </h3>
      </>
   );
};

export default MainPage;
