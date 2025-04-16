import { Outlet } from "react-router-dom";
import "./AdminPage.css";
import AdminSide from "./module/adminside/AdminSide";

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
