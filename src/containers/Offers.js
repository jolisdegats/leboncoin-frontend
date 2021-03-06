import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { creationTime } from "../functions/creationTime";
import Loader from "../components/Loader";
var numeral = require("numeral");

// load a locale
numeral.register("locale", "fr", {
  delimiters: {
    thousands: " ",
    decimal: ",",
  },
  abbreviations: {
    thousand: "k",
    million: "m",
    billion: "b",
    trillion: "t",
  },
  ordinal: function (number) {
    return number === 1 ? "er" : "ème";
  },
  currency: {
    symbol: "€",
  },
});

// switch between locales
numeral.locale("fr");

const Offers = ({ setSearchVisible, apiUrl, filter, page, setPage }) => {
  let myData = [];
  let newArr = [];
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const limit = Number(5);
  let urlToRequest = `${apiUrl}/offer/with-count?page=${page}&limit=${limit}${filter}`;

  const fetchData = async () => {
    const response = await axios.get(urlToRequest);

    myData = response.data.offers;
    const totalLength = response.data.count;
    setTotalPages(Math.ceil(totalLength / limit));
    setData(myData);
    setIsLoading(false);
  };

  useEffect(() => {
    setSearchVisible("enabled");
    fetchData();

    // eslint-disable-next-line
  }, [filter, page]);

  for (let i = 0; i < totalPages; i++) {
    newArr.push(i);
  }

  return isLoading ? (
    <Loader></Loader>
  ) : (
    <div className="container itemListAndNav">
      {newArr.length === 0 ? (
        <p>Votre recherche n'a retourné aucun résultat</p>
      ) : (
        <div>
          <div className="itemList">
            {data.map((item, id) => {
              return (
                <Link
                  to={`/offer/${item._id}`}
                  onClick={() => setSearchVisible("disabled")}
                  key={id}
                >
                  <div className="item">
                    <div className="itemPicture">
                      <img src={item.picture.secure_url} alt="" />
                    </div>
                    <div className="itemInfos">
                      <div>
                        <h2>{item.title}</h2>
                        <p className="itemPrice">
                          {numeral(item.price).format("0,0 $")}
                        </p>
                      </div>
                      <p>{creationTime(item.created)}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <nav className="pagination">
            <div className={"arrows " + (page === 1 && "linkDisabled")}>
              <Link to="/" onClick={() => setPage(page - 1)}>
                &laquo;
              </Link>
            </div>
            {newArr.map((item, index) => {
              return (
                <div
                  className={
                    page === item + 1 ? "pageNumber numberActive" : "pageNumber"
                  }
                  key={index}
                >
                  <Link to="/" onClick={() => setPage(item + 1)}>
                    {item + 1}
                  </Link>
                </div>
              );
            })}
            <div
              className={"arrows " + (page === newArr.length && "linkDisabled")}
            >
              <Link to="/" onClick={() => setPage(page + 1)}>
                &raquo;
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Offers;
