import React from "react";
import { useHistory } from "react-router-dom";

const SearchDiv = ({
  searchVisible,
  setFilter,
  keywords,
  setKeywords,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  sort,
  setSort,
  setPage,
}) => {
  let history = useHistory();
  const arrFilter = [];

  const filterOffers = (event) => {
    event.preventDefault();
    if (keywords !== "" || sort !== "" || priceMin !== 0 || priceMax !== 0) {
      if (keywords !== "") {
        arrFilter.push(`title=${keywords}`);
      }
      if (sort !== "") {
        arrFilter.push(`sort=${sort}`);
      }
      if (priceMin !== "") {
        arrFilter.push(`priceMin=${priceMin}`);
      }
      if (priceMax !== "") {
        arrFilter.push(`priceMax=${priceMax}`);
      }
      // if (arrFilter.length > 0) {
      //   arrFilter.splice(0, 0, "&");
      // }
      if (arrFilter.length > 0) {
        for (let i = 0; i < arrFilter.length; i++) {
          if (i % 2 === 0) {
            arrFilter.splice(i, 0, "&");
          }
        }
      }
    }
    setFilter(arrFilter.join(""));
    setPage(1);
    history.push("/");
  };

  return (
    <div className={searchVisible}>
      <div className="backWaveTop"></div>
      <div className="backWaveBottom"></div>
      <div className="searchSortDiv">
        <form action="" onSubmit={filterOffers}>
          <div className="search">
            <div className="searchInput">
              <input
                type="text"
                placeholder="Que recherchez-vous ?"
                value={keywords}
                onChange={(event) => setKeywords(event.target.value)}
              />
            </div>
            <div className="searchButton">
              <button type="submit">Rechercher</button>
            </div>
          </div>
          <div className="sort">
            <div className="priceMinMax">
              <p>Prix entre </p>
              <input
                placeholder="prix min"
                value={priceMin}
                onChange={(event) => setPriceMin(event.target.value)}
              ></input>
              <p> et </p>
              <input
                placeholder="prix max"
                value={priceMax}
                onChange={(event) => setPriceMax(event.target.value)}
              ></input>
            </div>
            <div className="sortSelect">
              <select
                name="Tri"
                id="sort"
                value={sort}
                onChange={(event) => setSort(event.target.value)}
              >
                <option value="date-desc">Tri : Plus récentes</option>
                <option value="date-asc">Tri : Plus anciennes</option>
                <option value="price-asc">Tri : Prix croissant</option>
                <option value="price-desc">Tri : Prix décroissant</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchDiv;
