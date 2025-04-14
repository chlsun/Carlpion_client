import { useNavigate } from "react-router-dom";

const MainPage = () => {
    const navi = useNavigate();

    return (
        <>
            <h3 onClick={() => navi("/admin")} style={{ cursor: "pointer" }}>
                운영자페이지 이동
            </h3>
        </>
    );
};

export default MainPage;
