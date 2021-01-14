import React from "react"
import Logo from "./Logo.js"
import { NAVBAR } from "../config/config"
import AniLink from "gatsby-plugin-transition-link/AniLink"

const Navbar = () => {
  return (
    <nav
                className="navbar fixed-top navbar-expand-lg navbar-light kg-background"
                role="navigation"
                aria-label="main navigation"
                >
            <div className="container-fluid kg_navbar kg-inner-container">
                <div className="kg-navbar-container">
                    <div className="kg-logo-container">
                        <Logo linked={true}/>
                        <div className="kg-toggle-btn-container">
                            <button
                            className="navbar-toggler kg-toggle-btn"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarContent"
                            aria-controls="navbarContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                            >
                            <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>
                    </div>
                    <div className="collapse navbar-collapse kg-navbar" id="navbarContent">
                        <ul className="navbar-nav mr-auto mb-2 mb-lg-0 w-100 justify-content-around">
                          {NAVBAR.map((item) => {
                            return (
                                <li className={'nav-item'} key={item.key}>
                                    <AniLink fade duration={0.4} to={'/' + item.routing + '/'} className={item.className}>
                                        {item.title}
                                    </AniLink>
                                </li>
                              );
                          })}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
  )
}

export default Navbar
