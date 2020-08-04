import React from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
var numeral = require("numeral");

const stripePromise = loadStripe(
  "pk_test_51HCLDcI08KWxVZDxAN5BuBHj3N3Pare41e0b9v3HPoloms1oySsMFbdUtPEcIBCrO9BW3Vsm2fTbEt6ICGmYbsMV007EpoXOV9"
);

const Payment = ({ setLoginVisible, apiUrl }) => {
  const token = Cookies.get("token");
  !token && setLoginVisible("enabled");
  let pictureUrl = "";
  let title = "";
  let price = 0;

  let history = useHistory();
  let myData = {};
  try {
    if (history.location.productData === undefined) {
      history.goBack();
    } else {
      myData = history.location.productData;
      pictureUrl = myData.picture.secure_url;
      title = myData.title;
      price = myData.price;
    }
  } catch (err) {
    console.log(err.message);
  }

  return (
    <div className="container">
      <div>
        <div className="whiteFloatingContainer">
          <div className="buyProductDiv">
            <h2 className="loginTitle">Acheter</h2>
            <div className="buyProductInfos">
              <img className="imgPayment" src={pictureUrl} alt="" />
              <div className="buyProductTitlePrice">
                <h3>{title}</h3>
                <p className="itemPrice">{numeral(price).format("0,0 $")}</p>
              </div>
            </div>
            <Elements stripe={stripePromise}>
              <CheckoutForm apiUrl={apiUrl} myData={myData} token={token} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
