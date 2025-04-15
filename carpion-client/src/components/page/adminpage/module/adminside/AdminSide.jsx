import { Link, useLocation } from "react-router-dom";
import "./AdminSide.css";
import { useEffect } from "react";
import "../../../reset.css";

const AdminSide = () => {
   const location = useLocation();

   const isPage = location.pathname.split("/")[2] || "";

   return (
      <>
         <aside id="admin-side">
            <Link
               to="model"
               className={`menu ${isPage === "model" ? "active" : ""}`}
            >
               <p className="menu-name">차량 모델 추가</p>
            </Link>
            <Link
               to="car"
               className={`menu ${isPage === "car" ? "active" : ""}`}
            >
               <p className="menu-name">렌트 차량 추가</p>
            </Link>
            <div className="menu">
               <p className="menu-name">공지사항</p>
            </div>
         </aside>
      </>
   );
};
export default AdminSide;
