import { Outlet, useNavigate, useParams } from "react-router-dom";
import "./AdminPage.css";
import AdminSide from "./module/adminside/AdminSide";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";

const AdminPage = () => {
   const { auth } = useContext(AuthContext);
   const navi = useNavigate();

   useEffect(() => {
      const username = sessionStorage.getItem("username");

      if (!username && !auth.accessToken) {
         alert("로그인 후 이용 가능합니다.");
         navi("/start");
      }
   }, [auth]);

   return (
      <>
         <main id="admin-page">
            <AdminSide />
            <div className="main-container">
               <Outlet />
            </div>
         </main>
      </>
   );
};

export default AdminPage;
