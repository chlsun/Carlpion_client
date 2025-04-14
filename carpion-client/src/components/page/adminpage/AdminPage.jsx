import { Outlet } from "react-router-dom";
import AdminSide from "../mainpage/module/AdminSide/AdminSIde";
import "./AdminPage.css";
import "../../../reset.css";

const AdminPage = () => {
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
