import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/page/Context/AuthContext";
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
import FindId from "./components/page/user/FIndId/FIndId";
import FindPw from "./components/page/user/FindPw/FindPw";
import FindPwCompleted from "./components/page/user/FindPw/FindPwCompleted";
import SignUpCompleted from "./components/page/user/SignUp/SignUpCompleted";
import Reply from "./components/page/reply/Reply";
import Login from "./components/page/user/Login/Login";
import SignUp from "./components/page/user/SignUp/SignUp";
import InquiryCheck from "./components/page/inquiryCheck/inquiryCheck";
import ReviewCheck from "./components/page/reviewCheck/ReviewCheck";
import RentalReservation from "./components/page/rentalReservation/RentalReservation";
import NoticeBoard from "./components/page/Board/NoticePage/NoticeBoard/NoticeBoard";
import NoticeDetail from "./components/page/Board/NoticePage/NoticeDetail/NoticeDetail";
import CommuniteBoard from "./components/page/Board/CommunitePage/CommuniteBoard/CommuniteBoard";
import CommuniteDetail from "./components/page/Board/CommunitePage/CommuniteDetail/CommuniteDetail";
import ReportBoard from "./components/page/Board/ReportPage/ReportBoard/ReportBoard";
import ReportDetail from "./components/page/Board/ReportPage/ReportDetail/ReportDetail";
import WritePage from "./components/page/WritePage/WritePage";
import ReportWrite from "./components/page/Board/ReportPage/ReportWrite/ReportWrite";
import LoginRedirect from "./components/page/user/Login/LoginRedirect";
import SignUpSocial from "./components/page/user/SignUp/SignUpSocial";
import { AuthSocialProvider } from "./components/page/Context/AuthSocialContext";

function App() {
    return (
        <>
            <AuthProvider>
                <AuthSocialProvider>
                    <Header />
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/start" element={<Login />} />
                        <Route path="/login-redirect" element={<LoginRedirect />} />
                        <Route path="/sign-up" element={<SignUp />} />
                        <Route path="/sign-up-done" element={<SignUpCompleted />} />
                        <Route path="/sign-up-social" element={<SignUpSocial />} />
                        <Route path="/find-id" element={<FindId />} />
                        <Route path="/find-pw" element={<FindPw />} />
                        <Route path="/find-pw-done" element={<FindPwCompleted />} />
                        <Route path="/admin" element={<AdminPage />}>
                            <Route index element={<Navigate to="model/1" replace />} />
                            <Route path="model/:page" element={<ModelPage />} />
                            <Route path="car/:page" element={<CarPage />} />
                        </Route>
                        <Route path="/rent" element={<CarRentPage />} />
                        <Route path="/rent/:id" element={<RentalReservation />} />
                        <Route path="/mypage" element={<Body />} />
                        <Route path="/modify" element={<MainMyPage />} />
                        <Route path="/point" element={<Point />} />
                        <Route path="/reply" element={<Reply />} />
                        <Route path="/nb" element={<NoticeBoard />} />
                        <Route path="/nd/:noticeNo" element={<NoticeDetail />} />
                        <Route path="/cb" element={<CommuniteBoard />} />
                        <Route path="/cd/:reviewNo" element={<CommuniteDetail />} />
                        <Route path="/rb" element={<ReportBoard />} />
                        <Route path="/rd/:reportNo" element={<ReportDetail />} />
                        <Route path="/rw" element={<ReportWrite />} />
                        <Route path="/inquiryCheck" element={<InquiryCheck />} />
                        <Route path="/reviewCheck" element={<ReviewCheck />} />
                    </Routes>
                    <Footer />
                </AuthSocialProvider>
            </AuthProvider>
        </>
    );
}

export default App;
