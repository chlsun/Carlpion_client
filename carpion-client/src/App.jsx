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
            </Routes>
            <Footer />
        </>
    );
}

export default App;
