import { useNavigate } from "react-router-dom";

const MainPage = () => {
   return (
      <>
         <div className="w-full min-h-screen h-auto bg-gray-100 flex flex-col items-center select-none">
            <div className="w-7xl mt-40">
               <div className="w-full p-8 mb-24 grid grid-cols-3 gap-8 bg-white rounded-4xl shadow-2xl shadow-maincolor">
                  <div className="col-span-2 h-64 rounded-2xl shadow-md shadow-maincolor flex justify-center items-center font-maintheme">
                     구성 요소 1
                  </div>
                  <div className="h-64 rounded-2xl shadow-md shadow-maincolor flex justify-center items-center font-maintheme">
                     구성 요소 2
                  </div>
                  <div className="row-span-2 rounded-2xl shadow-md shadow-maincolor flex justify-center items-center font-maintheme">
                     구성 요소 3
                  </div>
                  <div className="h-64 rounded-2xl shadow-md shadow-maincolor flex justify-center items-center font-maintheme">
                     구성 요소 4
                  </div>
                  <div className="rounded-2xl shadow-md shadow-maincolor flex justify-center items-center font-maintheme">
                     구성 요소 5
                  </div>
                  <div className="h-64 rounded-2xl shadow-md shadow-maincolor flex justify-center items-center font-maintheme">
                     구성 요소 6
                  </div>
                  <div className="h-64 rounded-2xl shadow-md shadow-maincolor flex justify-center items-center font-maintheme">
                     구성 요소 7
                  </div>
                  <div className="col-span-3 h-64 rounded-2xl shadow-md shadow-maincolor flex justify-center items-center font-maintheme">
                     구성 요소 8
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default MainPage;
