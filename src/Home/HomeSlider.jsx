import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import img1 from '../assets/english.jpg';
import img2 from '../assets/arabic.jpg';
import img3 from '../assets/hindi.jpg';
import img4 from '../assets/bangla.jpg';
import img5 from '../assets/japanese.jpg';
import img6 from '../assets/german.jpg';

const HomeSlider = () => {
    return (
        <div className="mt-[80px] max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center w-2/5 md:w-1/4 mx-auto mb-8 border-b-2 border-gray-500 rounded-b-lg pb-2">
                Facilities
            </h2>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper mb-24"
            >
                <SwiperSlide>
                    <img
                        src={img1}
                        alt=""
                        className="h-[200px] w-[400px] rounded-lg border border-black shadow-xl "
                    />
                    <h2 className="md:text-4xl uppercase text-center  font-bold">
                        English
                    </h2>
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src={img2}
                        alt=""
                        className="h-[200px] w-[400px] rounded-lg border border-black shadow-xl"
                    />
                    <h2 className="md:text-4xl uppercase text-center  font-bold ">
                        ARABIC
                    </h2>
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src={img3}
                        alt=""
                        className="h-[200px] w-[400px] rounded-lg border border-black shadow-xl"
                    />
                    <h2 className="md:text-4xl uppercase text-center  font-bold ">
                        hindi
                    </h2>
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src={img4}
                        alt=""
                        className="h-[200px] w-[400px] rounded-lg border border-black shadow-xl"
                    />
                    <h2 className="md:text-4xl uppercase text-center  font-bold ">
                        bangla
                    </h2>
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src={img5}
                        alt=""
                        className="h-[200px] w-[400px] rounded-lg border border-black shadow-xl"
                    />
                    <h2 className="md:text-4xl uppercase text-center  font-bold ">
                        japanese
                    </h2>
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src={img6}
                        alt=""
                        className="h-[200px] w-[400px] rounded-lg border border-black shadow-xl"
                    />
                    <h2 className="md:text-4xl uppercase text-center  font-bold ">
                        german
                    </h2>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default HomeSlider;