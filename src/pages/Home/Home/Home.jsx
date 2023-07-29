import React, { useContext } from "react";
import NavBar from "../../shared/NavBar/NavBar";
import { AuthContext } from "../../../providers/AuthProviders";
import img1 from "../../../assets/img1.jpg";
import TopSlider from "../TopSlider/TopSlider";
import LanguageCarousel from "../../../components/LanguageCarousel";

const Home = () => {
    const { user, logOut } = useContext(AuthContext);
    // console.log(user);

    return (
        <div>
            <LanguageCarousel></LanguageCarousel>{" "}
         
            <div>This is home</div>
        </div>
    );
};

export default Home;
