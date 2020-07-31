import React from "react";
import logo from "../img/logoLeBonCoin.png";
import { Link } from "react-router-dom";
import loginIcon from "../img/loginIcon.svg";
import publishOffer from "../img/publishOffer.svg";
import searchOffer from "../img/searchOffer.svg";
import Cookies from "js-cookie";

import SearchDiv from "./SearchDiv";

const Header = ({
  searchVisible,
  setSearchVisible,
  loginVisible,
  setLoginVisible,
  user,
  setUser,
}) => {
  return (
    <div>
      <header>
        <div className="container">
          <div className="headerContent">
            <div>
              <Link to="/" onClick={() => setSearchVisible("enabled")}>
                <img className="logo" src={logo} alt="" />
              </Link>
              <button className="publishOfferButton">
                <img src={publishOffer} alt="" />
                <span> Deposer une annonce</span>
              </button>
              <button
                className="searchOfferButton"
                onClick={() =>
                  searchVisible === "disabled"
                    ? setSearchVisible("enabled")
                    : setSearchVisible("disabled")
                }
              >
                <img src={searchOffer} alt="" />
                <span>Rechercher</span>
              </button>
            </div>
            {!user ? (
              <button
                id="loginButton"
                className="loginButton"
                onClick={() =>
                  loginVisible === "disabled"
                    ? setLoginVisible("enabled")
                    : setLoginVisible("disabled")
                }
              >
                <img src={loginIcon} alt="" />
                <span>Se connecter</span>
              </button>
            ) : (
              <button
                id="loginButton"
                className="loginButton"
                onClick={() => setUser(null) & Cookies.remove("token")}
              >
                <img src={loginIcon} alt="" />
                <span>Se déconnecter</span>
              </button>
            )}
          </div>
        </div>
      </header>
      <SearchDiv searchVisible={searchVisible}></SearchDiv>
    </div>
  );
};

export default Header;
