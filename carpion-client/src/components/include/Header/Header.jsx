import { useEffect, useState } from "react";
import Carlpion_Logo from "/src/assets/carlpion_logo.png";
import Carlpion_Logo_TextOnly from "/src/assets/carlpion_logo_textonly.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
   const [isScrolled, setIsScrolled] = useState(false);

   const navi = useNavigate();

   const handleScroll = () => {
      if (window.scrollY > 0) {
         setIsScrolled(true);
      } else {
         setIsScrolled(false);
      }
   };

   useEffect(() => {
      window.addEventListener("scroll", handleScroll);

      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, []);

   return (
      <header
         className={`w-full flex justify-center border-b-2 border-maincolor bg-white shadow-sm fixed top-0 left-0 right-0 transition-all duration-200 ${
            isScrolled ? "h-12" : "h-24"
         }`}
      >
         <div className="w-7xl h-full flex justify-center">
            <section className="w-2/6 h-full" onClick={() => navi("/")}>
               <div className="h-full flex justify-center items-center cursor-pointer">
                  <img
                     className={`cursor-pointer ${
                        isScrolled ? "w-1/2" : "w-full"
                     }`}
                     src={`${
                        isScrolled ? Carlpion_Logo_TextOnly : Carlpion_Logo
                     }`}
                     alt="Carlpion_Logo"
                  />
               </div>
            </section>
            <section className="w-3/6 h-full flex justify-end items-center">
               <ul className="w-144 h-full flex justify-evenly items-center">
                  <li className="h-full flex items-center">
                     <label
                        htmlFor=""
                        className={`h-full flex items-center font-maintheme text-maincolor cursor-pointer ${
                           isScrolled ? "text-xl" : "text-2xl"
                        }`}
                     >
                        메뉴1
                     </label>
                     <div>
                        <ul>
                           <li></li>
                        </ul>
                     </div>
                  </li>
                  <li className="h-full flex items-center">
                     <label
                        htmlFor=""
                        className={`h-full flex items-center font-maintheme text-maincolor cursor-pointer ${
                           isScrolled ? "text-xl" : "text-2xl"
                        }`}
                     >
                        메뉴2
                     </label>
                     <div>
                        <ul>
                           <li></li>
                        </ul>
                     </div>
                  </li>
                  <li className="h-full flex items-center">
                     <label
                        htmlFor=""
                        className={`h-full flex items-center font-maintheme text-maincolor cursor-pointer ${
                           isScrolled ? "text-xl" : "text-2xl"
                        }`}
                     >
                        메뉴3
                     </label>
                     <div>
                        <ul>
                           <li></li>
                        </ul>
                     </div>
                  </li>
                  <li
                     className="h-full flex items-center"
                     onClick={() => navi("/admin")}
                  >
                     <label
                        htmlFor=""
                        className={`h-full flex items-center font-maintheme text-maincolor cursor-pointer ${
                           isScrolled ? "text-xl" : "text-2xl"
                        }`}
                     >
                        운영자
                     </label>
                     <div>
                        <ul>
                           <li></li>
                        </ul>
                     </div>
                  </li>
               </ul>
            </section>
            <section className="w-1/6 h-full flex justify-end items-center">
               <div
                  className={`flex items-center font-maintheme text-maincolor border-2 rounded-lg cursor-pointer ${
                     isScrolled ? "px-1 text-lg" : "p-1 text-xl"
                  }`}
               >
                  시작하기
               </div>
            </section>
         </div>
      </header>
   );
};

export default Header;
