import React, {useEffect} from "react"
import shrink_navigation from "../utils/shrink_navigation"
import "../scss/main.scss"
import Navbar from "./Navbar.js"
import Footer from "./Footer.js"
import MyCookieBanner from "./MyCookieBanner"
import SEO from "./SEO.js"

const Layout = ({ children, metaData, location }) => {

  useEffect(() => {
    console.log("GATSBY JS WORKING");
    let header = document.querySelector(`body header`);
		window.addEventListener('scroll', shrink_navigation.bind(null, header));
  });

  return (
    <>
      <SEO metaData={metaData} location={location}/>
      <header>
        <MyCookieBanner />
        <Navbar />
      </header>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="main-container col-lg-8 col-md-10 col-sm-11 col-12">
            <main>{children}</main>
          </div>
        </div>
        <div className="row justify-content-center kg-background">
          <div className="footer-outer-container col-lg-8 col-md-10 col-sm-11 col-12">
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
