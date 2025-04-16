import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import MainPage from "./components/page/mainpage/MainPage";
import AdminPage from "./components/page/adminpage/AdminPage";

import ModelPage from "./components/page/adminpage/ModelPage/ModelPage";
import CarPage from "./components/page/adminpage/CarPage/CarPage";
import Header from "./components/include/Header/Header";
import Footer from "./components/include/Footer/Footer";
import CarRentPage from "./components/page/carrentpage/CarRentPage";
import MainMyPage from "./components/page/MyPage/MainMyPage";
import Body from "./components/page/Body/Body";
import Point from "./components/page/Point/Point";

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
            <Route path="/rent" element={<CarRentPage />} />
            <Route path="/mypage" element={<Body />} />
            <Route path="/modify" element={<MainMyPage />} />
            <Route path="/point" element={<Point />} />
         </Routes>
         <Footer />
      </>
   );
}

export default App;
