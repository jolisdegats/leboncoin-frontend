import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { creationTime } from "../functions/creationTime";

const Offers = ({ setVisible }) => {
  let myData = [];
  let newArr = [];
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  let urlToRequest = "https://leboncoin-api.herokuapp.com/offer/with-count";
  const limit = 5;
  const skip = (page - 1) * limit;

  const fetchData = async () => {
    const response = await axios(
      urlToRequest
      //   "https://leboncoin-api.herokuapp.com/offer/with-count"
      // Mon backend
      //   "https://leboncoin-api-js.herokuapp.com/offer/with-count"
    );

    myData = response.data.offers;
    const totalLength = response.data.count;
    setTotalPages(Math.ceil(totalLength / limit));
    setData(myData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  for (let i = 0; i < totalPages; i++) {
    newArr.push(i);
  }

  return isLoading ? (
    <span>En cours de chargement</span>
  ) : (
    <div className="container">
      <div className="itemList">
        {data.slice(skip, skip + limit).map((item, id) => {
          return (
            <Link
              to={"/offer/" + item._id}
              onClick={() => setVisible("disabled")}
              key={id}
            >
              <div className="item">
                <div className="itemPicture">
                  <img src={item.picture.secure_url} alt="" />
                </div>
                <div className="itemInfos">
                  <div>
                    <h2>{item.title}</h2>
                    <p className="itemPrice">{item.price}</p>
                    <p></p>
                  </div>
                  <p>{creationTime(item.created)}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="pagination">
        {newArr.map((item, index) => {
          return (
            <div className="pageNumber" key={index}>
              <Link to="/" onClick={() => setPage(item + 1)}>
                {item + 1}
              </Link>
            </div>
          );
        })}
      </div>
      {/* {[...Array(totalPages)].map((item, index) => {
        return (
          <Link to="/" onClick={() => setPage(item.index + 1)}>
            {item.index + 1}
          </Link>
        );
      })} */}
    </div>
  );
};

export default Offers;
