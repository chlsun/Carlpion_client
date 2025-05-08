import "./Banner.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Arrow = () => {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         height="50px"
         viewBox="0 -960 960 960"
         width="50px"
         fill="#000000"
      >
         <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
      </svg>
   );
};

const Banner = () => {
   const navi = useNavigate();

   const [carModelList, setCarModelList] = useState(null);
   const [currentModel, setCurrentModel] = useState(null);
   const [currentIndex, setCurrentIndex] = useState(0);
   const swiperRef = useRef(null);

   useEffect(() => {
      axios
         .get("http://localhost/carModel")
         .then((result) => {
            setCarModelList(result.data);
            console.log(result);
         })
         .catch((error) => {
            console.log(error);
         });
   }, []);

   const handlePrev = () => {
      if (swiperRef.current && swiperRef.current.swiper) {
         swiperRef.current.swiper.slidePrev();
      }
   };

   const handleNext = () => {
      if (swiperRef.current && swiperRef.current.swiper) {
         swiperRef.current.swiper.slideNext();
      }
   };

   useEffect(() => {
      if (carModelList != null) {
         console.log(carModelList[currentIndex]);
         setCurrentModel(carModelList[currentIndex]);
      }
   }, [carModelList, currentIndex]);

   if (carModelList == null || currentModel == null) return null;

   return (
      <>
         <div id="banner">
            <Swiper
               ref={swiperRef}
               modules={[Navigation]}
               slidesPerView={1}
               loop={true}
               navigation
               pagination={{ clickable: true }}
               scrollbar={{ draggable: true }}
               onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
               className="banner-swiper"
            >
               {carModelList.map((carModel, index) => (
                  <SwiperSlide key={index}>
                     <img src={carModel.imgURL} alt="" />
                  </SwiperSlide>
               ))}
            </Swiper>
            <button
               type="button"
               onClick={handlePrev}
               className="navi-btn custom-prev-button"
            >
               <Arrow />
            </button>
            <button
               type="button"
               onClick={handleNext}
               className="navi-btn custom-next-button"
            >
               <Arrow />
            </button>
            <div className="model-info">
               <div className="container">
                  <h2 className="carModel">{currentModel.carModel}</h2>
                  <button
                     className="goto-reservation"
                     onClick={() => navi("/rent")}
                  >
                     예약하기
                  </button>
               </div>
            </div>
         </div>
      </>
   );
};
export default Banner;
