import { Link, useLocation } from "react-router-dom";
import "./AdminSide.css";
import { useEffect } from "react";

const AdminSide = () => {
   const location = useLocation();

   const isPage = location.pathname.split("/")[2] || "";

   return (
      <>
         <aside id="admin-side">
            <Link
               to="model/1"
               className={`menu ${isPage === "model" ? "active" : ""}`}
            >
               <p className="menu-name">차량 모델 추가</p>
            </Link>
            <Link
               to="car/1"
               className={`menu ${isPage === "car" ? "active" : ""}`}
            >
               <p className="menu-name">렌트 차량 추가</p>
            </Link>

            <Link
               to="notice"
               className={`menu ${isPage === "notice" ? "active" : ""}`}
            >
               <p className="menu-name">공지사항</p>
            </Link>
         </aside>
      </>
   );
};
export default AdminSide;
