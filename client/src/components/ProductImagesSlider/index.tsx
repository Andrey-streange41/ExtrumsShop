import React, { useState } from "react";
import { Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "./product-images-slider.scss";

export const ProductImagesSlider = ({images}: IPropTypes) => {
  const [target,setTarget] = useState();
  
  
  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{swiper:target}}
        modules={[Navigation, Thumbs]}
        grabCursor={true}
        className={"product-images-slider"}
      >
        {images.map((i, index) => (
          <SwiperSlide key={index}>
            <img  src={'http://localhost:5000/' + i} alt="product images" />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        loop={true}
        spaceBetween={10}
        onSwiper={setTarget}
        modules={[Navigation, Thumbs]}
        slidesPerView={images.length}
        className={"product-images-slider-thumbs"}
      >
        {images.map((i, index) => (
          <SwiperSlide key={index}>
          <section className="product-images-slider-thumbs-wrapper">
              <img style={{cursor:'grab'}} src={'http://localhost:5000/' +i} alt="product images" />
          </section>
           
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

interface IPropTypes {
  images: string[];
}
