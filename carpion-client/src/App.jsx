import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import MainPage from "./components/page/mainpage/MainPage";
import AdminPage from "./components/page/adminpage/AdminPage";
import Header from "./components/include/Header/Header";
import ModelPage from "./components/page/adminpage/ModelPage/ModelPage";
import CarPage from "./components/page/adminpage/CarPage/CarPage";
import PostBoard from "./components/page/CommunitePage/PostBoard";
import NoticePage from "./components/page/NotionPage/NoticePage";
import CarRentPage from "./components/page/carrentpage/CarRentPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/c" element={<PostBoard />} />

        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<Navigate to="model" replace />} />

          <Route path="model" element={<ModelPage />} />
          <Route path="car" element={<CarPage />} />
          <Route path="notice" element={<NoticePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
