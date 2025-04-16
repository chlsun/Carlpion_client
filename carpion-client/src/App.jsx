import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import MainPage from "./components/page/mainpage/MainPage";
import AdminPage from "./components/page/adminpage/AdminPage";

import ModelPage from "./components/page/adminpage/ModelPage/ModelPage";
import CarPage from "./components/page/adminpage/CarPage/CarPage";
import Header from "./components/include/Header/Header";
import Footer from "./components/include/Footer/Footer";
import SignUp from "./components/page/user/SignUp/SignUp";
import Login from "./components/page/user/Login/Login";
import CarRentPage from "./components/page/carrentpage/CarRentPage";
import MainMyPage from "./components/page/MyPage/MainMyPage";
import Body from "./components/page/Body/Body";
import Point from "./components/page/Point/Point";
<<<<<<< HEAD
import Reply from "./components/page/reply/reply";
=======
import FindId from "./components/page/user/FIndId/FIndId";
import FindPw from "./components/page/user/FindPw/FindPw";
import FindPwCompleted from "./components/page/user/FindPw/FindPwCompleted";

>>>>>>> 201adaf4e9787d7ab380581a46fc709052eab8d7
function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/admin" element={<AdminPage />}>
                    <Route index element={<Navigate to="model" replace />} />

<<<<<<< HEAD
          <Route path="model" element={<ModelPage />} />
          <Route path="car" element={<CarPage />} />
        </Route>

        <Route path="/rent" element={<CarRentPage />} />

        <Route path="/mypage" element={<Body />} />
        <Route path="/modify" element={<MainMyPage />} />
        <Route path="/point" element={<Point />} />
        <Route path="/reply" element={<Reply />} />
      </Routes>
    </>
  );
=======
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
>>>>>>> 201adaf4e9787d7ab380581a46fc709052eab8d7
}

export default App;
