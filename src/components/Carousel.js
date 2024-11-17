import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { carouselData } from '../data/carouselData';

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-0 z-20 h-full w-[40px] sm:w-[60px] cursor-pointer bg-gradient-to-l from-gray-100/30 to-transparent hover:from-gray-100/50 hidden sm:flex items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={3}
        stroke="currentColor"
        className="w-4 h-4 sm:w-6 sm:h-6 text-gray-700"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
    </button>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-0 top-0 z-20 h-full w-[40px] sm:w-[60px] cursor-pointer bg-gradient-to-r from-gray-100/30 to-transparent hover:from-gray-100/50 hidden sm:flex items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={3}
        stroke="currentColor"
        className="w-4 h-4 sm:w-6 sm:h-6 text-gray-700"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
    </button>
  );
}

function Carousel() {
  const settings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    fade: true,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          arrows: false,
          dots: true
        }
      }
    ]
  };

  return (
    <div className="relative w-full">
      <div className="absolute inset-0 bg-gradient-to-b from-[#131921] to-transparent h-16 z-10" />
      <Slider {...settings}>
        {carouselData.map((item, index) => (
          <div key={index} className="relative">
            <div className="relative aspect-[3/2] sm:aspect-[2.5/1] md:aspect-[3/1] lg:aspect-[3.5/1]">
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-100" />
            </div>
          </div>
        ))}
      </Slider>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-100 to-transparent" />
    </div>
  );
}

export default Carousel;