import React from "react";
import logo from "../../img/logoNavBar.png";
import "../../styles/navbar.css";

export const TopBar = () => {
  return (
    <nav
      className="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow"
      data-bs-theme="dark"
    >
      <div className="tb-image-text">
        <span className="tb-image">
          <img src={logo} />
        </span>

        <div className="text logo-text">
          <span className="tb-name">LinkedTeam</span>
        </div>
      </div>

      <ul className="navbar-nav flex-row d-md-none">
        <li className="nav-item text-nowrap">
          <button
            className="nav-link px-3 text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSearch"
            aria-controls="navbarSearch"
            aria-expanded="false"
            aria-label="Toggle search"
          >
            <svg className="bi">{/* <use xlink:href="#search"></use> */}</svg>
          </button>
        </li>
        <li className="nav-item text-nowrap">
          <button
            className="nav-link px-3 text-white"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <svg className="bi">{/* <use xlink:href="#list"></use> */}</svg>
          </button>
        </li>
      </ul>

      <div id="navbarSearch" className="navbar-search w-100 collapse">
        <input
          className="form-control w-100 rounded-0 border-0"
          type="text"
          placeholder="Search"
          aria-label="Search"
        />
      </div>
    </nav>
  );
};
