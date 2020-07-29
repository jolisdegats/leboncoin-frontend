import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { creationTime } from "../functions/creationTime";
import cartIcon from "../img/cartIcon.svg";

const Offer = () => {
  const { id } = useParams();

  const [productInfos, setProductInfos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const offerUrl = "https://leboncoin-api.herokuapp.com/offer/" + id;

  const fetchData = async () => {
    const response = await axios(offerUrl);
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
                <h2>{productInfos.title}</h2>
                <p className="itemPrice">{productInfos.price}</p>
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
              <h3>{productInfos.creator.account.username}</h3>
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
