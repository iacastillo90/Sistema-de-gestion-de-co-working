import Footer from "../components/layout/Footer.jsx";
import Header from "../components/layout/Header.jsx";
import { Outlet } from "react-router-dom";

function MainLayout () {
    return(

        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default MainLayout;