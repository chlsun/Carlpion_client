import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
   const navi = useNavigate();
   return (
      <>
         <header id="main-header">
            <div className="main-logo" onClick={() => navi("/")}>
               <img src="/img/main-logo.png" alt="MainLogo" />
            </div>
            <nav className="menus">
               <p className="menu" onClick={() => navi("/admin")}>
                  운영자
               </p>
               <p className="menu">메뉴</p>
               <p className="menu">메뉴</p>
               <p className="menu">메뉴</p>
            </nav>

            <div className="loginAndUser">
               <button type="button">회원가입/로그인</button>
            </div>
         </header>
      </>
   );
};

export default Header;
