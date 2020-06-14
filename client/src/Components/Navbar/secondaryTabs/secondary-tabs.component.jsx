import React from "react";
import "./secondary-tabs.style.scss";
import more from "../../../assets/bottom arrow.png";
import { ReactComponent as Messenger } from "../../../svg/messenger.svg";
import { Link } from "react-router-dom";

const SecondaryTabs = ({ name }) => {
  return (
    <div className="Secondary-Tabs">
      <Link to="/profile">
        <div className="user-profile">
          <span className="user-name">Welcome, {name}</span>
        </div>
      </Link>
      <ul type="none">
        <li
          className="messenger"
          onClick={() => {
            if (window.location.pathname === "/home") {
              var list = document.querySelector(".contactss");
              let options = document.querySelector(".optionss");
              if (list.classList.contains("appear")) {
                list.classList.remove("appear");
              } else {
                options.classList.remove("revealOptions");
                list.classList.add("appear");
              }
            } else {
              window.location = "/home";
              var list = document.querySelector(".contactss");
              let options = document.querySelector(".optionss");
              if (list.classList.contains("appear")) {
                list.classList.remove("appear");
              } else {
                options.classList.remove("revealOptions");
                list.classList.add("appear");
              }
            }
          }}
        >
          <Messenger />
          {/* <div className="create-menu"></div> */}
        </li>
        <li
          className="more-options"
          onClick={() => {
            if (window.location.pathname == "/home") {
              let options = document.querySelector(".optionss");
              var list = document.querySelector(".contactss");
              if (options.classList.contains("revealOptions")) {
                options.classList.remove("revealOptions");
              } else {
                list.classList.remove("appear");
                options.classList.add("revealOptions");
              }
            } else {
              window.location = "/home";
            }
          }}
        >
          <img src={more} height="16px" alt="" />
        </li>
      </ul>
    </div>
  );
};

export default SecondaryTabs;
