import AboutUs from "./components/AboutUs";
import Banner from "./components/Banner";
import FormRegister from "./components/FormRegister";
import Hero from "./components/Hero";
import Space from "./components/Space";

function Home () {
    return(
        <>
            <Hero />
            <Space />
            <Banner />
            <AboutUs />
            <FormRegister />
        </>
    );
}

export default Home;