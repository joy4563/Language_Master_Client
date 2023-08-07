import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LanguageCarousel from './LanguageCarousel';



const TopSlider = () => {
    return (
        <div className='mb-8'>

        <LanguageCarousel></LanguageCarousel>
        </div>
    );
};

export default TopSlider;