import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { creationTime } from "../functions/creationTime";
import cartIcon from "../img/cartIcon.svg";
var numeral = require("numeral");

const Offer = ({ apiUrl }) => {
  const { id } = useParams();

  const [productInfos, setProductInfos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(`${apiUrl}/offer/${id}`);
    setProductInfos(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return isLoading ? (
    <span>En cours de chargement</span>
  ) : (
    <div className="container">
      <div className="product">
        <div className="colLeft">
          <div className="productInfos">
            <img src={productInfos.picture.secure_url} alt="" />
            <div className="productDetails">
              <div>
                <h3>{productInfos.title}</h3>
                <p className="itemPrice">
                  {numeral(productInfos.price).format("0,0 $")}
                </p>
                <p className="creationItem">
                  {creationTime(productInfos.created)}
                </p>
              </div>
            </div>
          </div>
          <div className="productDesc">
            <p className="productDescTitle">Description</p>
            <p>{productInfos.description}</p>
          </div>
        </div>
        <div className="colRight">
          <div className="vendor">
            <div className="vendorDetails">
              <h2>{productInfos.creator.account.username}</h2>
              <p className="allVendorProducts">17 annonces en ligne</p>
            </div>
            <div className="buyButtonDiv">
              <button className="buyButton">
                <img src={cartIcon} alt="" />
                <span>Acheter</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
