import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import MainPage from "./components/page/mainpage/MainPage";
import AdminPage from "./components/page/adminpage/AdminPage";
import WritePage from "./components/page/WritePage/WritePage";
import ModelPage from "./components/page/adminpage/ModelPage/ModelPage";
import CarPage from "./components/page/adminpage/CarPage/CarPage";
import PostBoard from "./components/page/CommunitePage/PostBoard";
import NoticePage from "./components/page/NoticePage/NoticePage";
import Header from "./components/include/Header/Header";
import Footer from "./components/include/Footer/Footer";
import CarRentPage from "./components/page/carrentpage/CarRentPage";
import MainMyPage from "./components/page/MyPage/MainMyPage";
import Body from "./components/page/Body/Body";
import Point from "./components/page/Point/Point";
import FindId from "./components/page/user/FIndId/FIndId";
import FindPw from "./components/page/user/FindPw/FindPw";
import FindPwCompleted from "./components/page/user/FindPw/FindPwCompleted";
import DetailPage from "./components/page/CommunitePage/DetailPage/DetailPage";
import NDetailPage from "./components/page/NoticePage/DetailPage/DetailPage";
import QAPage from "./components/page/QAPage/QAPage";

import Reply from "./components/page/reply/reply";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<Navigate to="model" replace />} />

          <Route path="model" element={<ModelPage />} />
          <Route path="car" element={<CarPage />} />
        </Route>

        <Route path="/notice" element={<NoticePage />} />
        <Route path="/notice/:id" element={<NDetailPage />} />

        <Route path="/detail" element={<DetailPage />} />
        <Route path="/rent" element={<CarRentPage />} />
        <Route path="/c" element={<PostBoard />} />
        <Route path="/Write" element={<WritePage />} />
        <Route path="/qa" element={<QAPage />} />
        <Route path="/mypage" element={<Body />} />
        <Route path="/modify" element={<MainMyPage />} />
        <Route path="/point" element={<Point />} />
        <Route path="/reply" element={<Reply />} />
      </Routes>
    </>
  );
}

export default App;
