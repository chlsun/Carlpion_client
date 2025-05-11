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
               <p className="menu-name">차량 모델 관리</p>
            </Link>
            <Link
               to="car/1"
               className={`menu ${isPage === "car" ? "active" : ""}`}
            >
               <p className="menu-name">렌트 차량 관리</p>
            </Link>
         </aside>
      </>
   );
};
export default AdminSide;
