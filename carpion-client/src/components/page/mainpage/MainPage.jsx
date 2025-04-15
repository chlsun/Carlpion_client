import { useNavigate } from "react-router-dom";
import "../reset.css";

const MainPage = () => {
    const navi = useNavigate();

    return (
        <>
            <h3 className="test-navi" onClick={() => navi("/rent")} style={{ cursor: "pointer" }}>
                자동차 렌트 페이지 이동
            </h3>
        </>
    );
};

export default MainPage;
