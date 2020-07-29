import React from "react";
import logo from "../img/logoLeBonCoin.png";
import { Link } from "react-router-dom";
import loginIcon from "../img/loginIcon.svg";
import publishOffer from "../img/publishOffer.svg";
import searchOffer from "../img/searchOffer.svg";

const Header = ({ visible, setVisible }) => {
  return (
    <header>
      <div className="container">
        <div className="headerContent">
          <div>
            <Link to="/" onClick={() => setVisible("enabled")}>
              <img className="logo" src={logo} alt="" />
            </Link>
            <button className="publishOfferButton">
              <img src={publishOffer} alt="" />
              <span> Deposer une annonce</span>
            </button>
            <button
              className="searchOfferButton"
              onClick={() =>
                visible === "disabled"
                  ? setVisible("enabled")
                  : setVisible("disabled")
              }
            >
              <img src={searchOffer} alt="" />
              <span>Rechercher</span>
            </button>
          </div>
          <button className="loginButton">
            <img src={loginIcon} alt="" />
            <span>Se connecter</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
