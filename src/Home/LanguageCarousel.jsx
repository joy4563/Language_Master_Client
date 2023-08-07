import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './LanguageCarousel.css'

import slider1 from "../assets/slider1.jpg";
import slider2 from "../assets/slider2.jpg";
import slider3 from "../assets/slider3.jpg";


const LanguageCarousel = () => {
    const slides = [
        {
            id: 1,
            image:slider1,
            title: "Unlock a World of Languages",
            description:
                "Expand your horizons and connect with people from different cultures through language learning.",
        },
        {
            id: 2,
            image:slider2,
            title: "Personalized Learning Experience",
            description:
                "Tailor your language learning journey with interactive lessons and adaptive exercises.",
        },
        {
            id: 3,
            image:slider3,
            title: "Master Any Language",
            description:
                "Achieve fluency in your desired language through our comprehensive curriculum and expert instructors.",
        },
    ];

  const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: false,
      arrows: true,
  };

    return (
        <Slider {...settings}>
            {slides.map((slide) => (
                <div key={slide.id} className="slide">
                    <div className="slide-image-container ">
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="slide-image"
                        />
                        <div className="slide-overlay ">
                            <h2 className="slide-title">{slide.title}</h2>
                            <p className="slide-description">
                                {slide.description}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    );
};

export default LanguageCarousel;
