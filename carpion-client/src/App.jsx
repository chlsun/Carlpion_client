import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/page/Context/AuthContext";
import MainPage from "./components/page/mainpage/MainPage";
import AdminPage from "./components/page/adminpage/AdminPage";
import ModelPage from "./components/page/adminpage/ModelPage/ModelPage";
import CarPage from "./components/page/adminpage/CarPage/CarPage";
import Header from "./components/include/Header/Header";
import Footer from "./components/include/Footer/Footer";
import CarRentPage from "./components/page/CarRentPage/CarRentPage";
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
import NoticeWrite from "./components/page/Board/NoticePage/NoticeWrite/NoticeWrite";
import NoticeEdit from "./components/page/Board/NoticePage/NoticeWrite/NoticeEdit";
import CommunityBoard from "./components/page/Board/CommunityPage/CommunityBoard/CommunityBoard";
import CommunityDetail from "./components/page/Board/CommunityPage/CommunityDetail/CommunityDetail";
import CommunityWrite from "./components/page/Board/CommunityPage/CommunityWrite/CommunityWrite";
import CommunityEdit from "./components/page/Board/CommunityPage/CommunityWrite/CommunityEdit";
import ReportBoard from "./components/page/Board/ReportPage/ReportBoard/ReportBoard";
import ReportDetail from "./components/page/Board/ReportPage/ReportDetail/ReportDetail";
import ReportWrite from "./components/page/Board/ReportPage/ReportWrite/ReportWrite";
import LoginRedirect from "./components/page/user/Login/LoginRedirect";
import SignUpSocial from "./components/page/user/SignUp/SignUpSocial";
import { AuthSocialProvider } from "./components/page/Context/AuthSocialContext";
import ErrorPage from "./components/page/ErrorPage/ErrorPage";
import ReportEdit from "./components/page/Board/ReportPage/ReportWrite/ReportEdit";
import PaymentHistoryPage from "./components/page/PaymentHistoryPage/PaymentHistoryPage";
import ReservationComponent from "./components/page/Body/module/ReservationComponent";
import RentHistoryPage from "./components/page/RentHistoryPage/RentHistoryPage";
import MainPage2 from "./components/page/mainpage/MainPage2";

function App() {
   return (
      <div id="mypage" style={{ backgroundColor: "#fdfdfd" }}>
         <AuthProvider>
            <AuthSocialProvider>
               <Header />
               <Routes>
                  <Route path="/" element={<MainPage2 />} />
                  <Route path="/error" element={<ErrorPage />} />
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
                  <Route
                     path="/payment-history"
                     element={<PaymentHistoryPage />}
                  />
                  <Route path="/rent-history" element={<RentHistoryPage />} />
                  <Route path="/mypage" element={<Body />} />
                  <Route path="/modify" element={<MainMyPage />} />
                  <Route path="/point" element={<Point />} />
                  <Route path="/reply" element={<Reply />} />
                  <Route path="/cb" element={<CommunityBoard />} />
                  <Route path="/cd/:reviewNo" element={<CommunityDetail />} />
                  <Route path="/cw" element={<CommunityWrite />} />
                  <Route path="/ce/:reviewNo" element={<CommunityEdit />} />
                  <Route path="/nb" element={<NoticeBoard />} />
                  <Route path="/nd/:noticeNo" element={<NoticeDetail />} />
                  <Route path="/nw" element={<NoticeWrite />} />
                  <Route path="/ne/:noticeNo" element={<NoticeEdit />} />
                  <Route path="/rb" element={<ReportBoard />} />
                  <Route path="/rd/:reportNo" element={<ReportDetail />} />
                  <Route path="/rw" element={<ReportWrite />} />
                  <Route path="/re/:reportNo" element={<ReportEdit />} />
                  <Route path="/inquiryCheck" element={<InquiryCheck />} />
                  <Route path="/reviewCheck" element={<ReviewCheck />} />
               </Routes>
               <Footer />
            </AuthSocialProvider>
         </AuthProvider>
      </div>
   );
}

export default App;
