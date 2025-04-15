import { useCallback, useEffect, useState } from "react";
import Carlpion_Logo from "/src/assets/carlpion_logo.png";
import Carlpion_Logo_TextOnly from "/src/assets/carlpion_logo_textonly.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
   const [isScrolled, setIsScrolled] = useState(false);
   const [openMenu, setOpenMenu] = useState(0);

   const handleScroll = useCallback(() => {
      window.requestAnimationFrame(() => {
         setIsScrolled(window.scrollY > 0);
      });
   }, []);

   useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, [handleScroll]);

   return (
      <header
         className={`w-full flex justify-center border-b-2 border-maincolor bg-white shadow-sm fixed top-0 left-0 right-0 transition-all duration-200 ${
            isScrolled ? "h-12" : "h-24"
         }`}
      >
         <div className="w-7xl h-full flex justify-center">
            <section className="w-2/6 h-full">
               <div className="h-full flex justify-center items-center cursor-pointer">
                  <img
                     className={`cursor-pointer ${
                        isScrolled ? "w-1/2" : "w-full"
                     }`}
                     src={isScrolled ? Carlpion_Logo_TextOnly : Carlpion_Logo}
                     alt="Carlpion_Logo"
                  />
               </div>
            </section>
            <section className="w-3/6 h-full flex justify-end items-center">
               <ul className="w-144 h-full flex justify-evenly items-center">
                  <li
                     onMouseEnter={() => setOpenMenu(1)}
                     onMouseLeave={() => setOpenMenu(0)}
                     className="h-full flex items-center"
                  >
                     <label
                        htmlFor=""
                        className={`h-full flex items-center font-maintheme text-maincolor cursor-pointer ${
                           isScrolled ? "text-xl" : "text-2xl"
                        }`}
                     >
                        메뉴1
                     </label>
                     {openMenu === 1 && (
                        <div
                           className={`w-full py-2 flex justify-center bg-white border-b-2 border-maincolor shadow-sm absolute top-full left-0`}
                        >
                           <ul className="w-6xl flex justify-center flex-wrap">
                              <li className="w-full p-2 font-maintheme text-lg text-maincolor hover:bg-gray-100">
                                 서브메뉴1 메인
                              </li>
                              <li className="w-full p-2 font-maintheme text-md text-gray-500 hover:bg-gray-100">
                                 서브메뉴1 서브1
                              </li>
                              <li className="w-full p-2 font-maintheme text-md text-gray-500 hover:bg-gray-100">
                                 서브메뉴1 서브2
                              </li>
                              <li className="w-full p-2 font-maintheme text-md text-gray-500 hover:bg-gray-100">
                                 서브메뉴1 서브3
                              </li>
                           </ul>
                        </div>
                     )}
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
