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
import FindId from "./components/page/user/FIndId/FIndId";
import FindPw from "./components/page/user/FindPw/FindPw";
import FindPwCompleted from "./components/page/user/FindPw/FindPwCompleted";

function App() {
    return (
        <>
            <Header />
            <FindPwCompleted />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/admin" element={<AdminPage />}>
                    <Route index element={<Navigate to="model" replace />} />

                    <Route path="model" element={<ModelPage />} />
                    <Route path="car" element={<CarPage />} />
                </Route>
                <Route path="/rent" element={<CarRentPage />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
