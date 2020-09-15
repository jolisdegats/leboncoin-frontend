import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { creationTime } from "../functions/creationTime";
import ModalImage from "react-modal-image";
import cartIcon from "../img/cartIcon.svg";
import Loader from "../components/Loader";
import avatar from "../img/avatar.svg";
var numeral = require("numeral");

const Offer = ({ apiUrl, setLoginVisible, user }) => {
  const { id } = useParams();
  const history = useHistory();

  const [productInfos, setProductInfos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleBuyClick = () => {
    !user
      ? setLoginVisible("enabled")
      : history.push("/pay", { productData: productInfos });
  };

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
    <Loader></Loader>
  ) : (
    <div className="container">
      <div className="product">
        <div className="colLeft">
          <div className="productInfos">
            <div className="productImageThumb">
              <ModalImage
                small={productInfos.picture.secure_url}
                large={productInfos.picture.secure_url}
                alt={productInfos.title}
                hideDownload={true}
                hideZoom={true}
              />
            </div>
            {/* <img src={productInfos.picture.secure_url} alt="" /> */}
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
            <div className="vendorDetails noselect">
              <img src={avatar} alt="avatar" />
              <div>
                <h2>{productInfos.creator.account.username}</h2>
                <p className="allVendorProducts">17 annonces en ligne</p>
              </div>
            </div>
            <div className="buyButtonDiv">
              <button className="orangeButton" onClick={() => handleBuyClick()}>
                <img src={cartIcon} alt="cart-icon" />
                <span> Acheter</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
