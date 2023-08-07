import HomeSlider from './HomeSlider';
import Instructor from '../SharedPages/Instructor/Instructor';
import Banner from './Banner';
import HomeClasses from './HomeClasses';
import useTitle from '../Hooks/useTitle';
import TopSlider from './TopSlider';

const Home = () => {
    useTitle('Home');
    return (
        <div className='container mx-auto'>
            <TopSlider></TopSlider>
            <Banner></Banner>
            <HomeSlider></HomeSlider>
            <HomeClasses></HomeClasses>
            <Instructor></Instructor>
        </div>
    );
};

export default Home;