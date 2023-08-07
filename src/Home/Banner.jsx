import banner from '../assets/banner.jpg';
import { Rotate, Fade } from "react-awesome-reveal";

const Banner = () => {
    return (
        <div className="bg-sky-300 max-w-7xl mx-auto p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div>
                    <Rotate>
                        <p className="text-xl font-semibold text-justify">
                            Celebrate the art of language with our immersive
                            teaching website. Unlock a world of communication as
                            you embark on a journey of linguistic discovery. Our
                            interactive lessons, expert guidance, and vibrant
                            community empower you to confidently learn and
                            master new languages. Join us today and let your
                            words transcend borders.
                        </p>
                    </Rotate>
                </div>
                <div>
                    <Fade cascade damping={0.1}>
                        <img src={banner} alt="" className="w-[1000px] rounded-md" />
                    </Fade>
                </div>
            </div>
        </div>
    );
};

export default Banner;