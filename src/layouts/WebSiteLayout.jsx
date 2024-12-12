import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";


const WebSiteLayout = () => {
  return (
    <>
        <div className="relative min-h-screen">
          <Header isStorePage={false} />
            <Outlet />
            <ScrollRestoration />
          <Footer />
        </div>
    </>
  )
}

export default WebSiteLayout