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

  let history = useHistory();
  let myData = {};

  // A SUPPRIMER
  if (history.location.productData === undefined) {
    myData = {
      picture: {
        secure_url:
          "https://res.cloudinary.com/dqp905mfv/image/upload/v1596534854/xuqvpv3qeqjwsvwob14d.jpg",
      },
      title: "this is a title",
      price: 14,
    };
  } else {
    myData = history.location.productData;
  }

  return (
    <div className="container">
      <div>
        <div className="whiteFloatingContainer">
          <div className="buyProductDiv">
            <h2 className="loginTitle">Acheter</h2>
            <div className="buyProductInfos">
              <img
                className="imgPayment"
                src={myData.picture.secure_url}
                alt=""
              />
              <div className="buyProductTitlePrice">
                <h3>{myData.title}</h3>
                <p className="itemPrice">
                  {numeral(myData.price).format("0,0 $")}
                </p>
              </div>
              <div className="payment"></div>
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
