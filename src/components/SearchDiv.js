import React from "react";

const SearchDiv = ({ visible }) => {
  return (
    <div className={visible}>
      <div className="backWaveTop"></div>
      <div className="backWaveBottom"></div>
      <div className="searchSortDiv">
        <div className="search">
          <div className="searchInput">
            <input type="text" placeholder="Que recherchez-vous ?" />
          </div>
          <div className="searchButton">
            <button>Rechercher</button>
          </div>
        </div>
        <div className="sort">
          <div className="priceMinMax">
            <p>Prix entre </p>
            <input placeholder="prix min"></input>
            <p> et </p>
            <input placeholder="prix max"></input>
          </div>
          <div className="sortSelect">
            <select name="Tri" id="sort">
              <option value="date-desc">Tri : Plus récentes</option>
              <option value="date-asc">Tri : Plus anciennes</option>
              <option value="price-asc">Tri : Prix croissant</option>
              <option value="price-desc">Tri : Prix décroissant</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDiv;
