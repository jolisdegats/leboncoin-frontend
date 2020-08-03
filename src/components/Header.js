import React, { useState } from "react";
import logo from "../img/logoLeBonCoin.png";
import { Link, useHistory } from "react-router-dom";
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
  setFilter,
  setPage,
}) => {
  let [keywords, setKeywords] = useState("");
  let [sort, setSort] = useState("");
  let [priceMax, setPriceMax] = useState("");
  let [priceMin, setPriceMin] = useState("");

  let history = useHistory();

  const resetFiltersAndPage = () => {
    setKeywords("");
    setSort("");
    setPriceMin("");
    setPriceMax("");
    setFilter("");
    setPage(1);
  };

  return (
    <div>
      <header>
        <div className="container">
          <div className="headerContent">
            <div>
              <Link
                to="/"
                onClick={() =>
                  setSearchVisible("enabled") & resetFiltersAndPage()
                }
              >
                <img className="logo" src={logo} alt="" />
              </Link>
              {user === null ? (
                <div
                  className="publishOfferButton"
                  onClick={() =>
                    setLoginVisible("enabled") & resetFiltersAndPage()
                  }
                >
                  <img src={publishOffer} alt="" />
                  <span> Deposer une annonce</span>
                </div>
              ) : (
                <Link
                  to="/publish"
                  onClick={() =>
                    setSearchVisible("disabled") & resetFiltersAndPage()
                  }
                >
                  <div className="publishOfferButton">
                    <img src={publishOffer} alt="" />
                    <span> Deposer une annonce</span>
                  </div>
                </Link>
              )}
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
                  resetFiltersAndPage() & (loginVisible === "disabled")
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
                onClick={() =>
                  resetFiltersAndPage() &
                  setUser(null) &
                  Cookies.remove("token") &
                  history.push("/")
                }
              >
                <img src={loginIcon} alt="" />
                <span>Se déconnecter</span>
              </button>
            )}
          </div>
        </div>
      </header>
      <SearchDiv
        searchVisible={searchVisible}
        setFilter={setFilter}
        keywords={keywords}
        setKeywords={setKeywords}
        sort={sort}
        setSort={setSort}
        priceMax={priceMax}
        setPriceMax={setPriceMax}
        priceMin={priceMin}
        setPriceMin={setPriceMin}
        setPage={setPage}
      ></SearchDiv>
    </div>
  );
};

export default Header;
