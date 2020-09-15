import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import Loader from "../components/Loader";
var numeral = require("numeral");

const stripePromise = loadStripe(
  "pk_test_51HCLDcI08KWxVZDxAN5BuBHj3N3Pare41e0b9v3HPoloms1oySsMFbdUtPEcIBCrO9BW3Vsm2fTbEt6ICGmYbsMV007EpoXOV9"
);

const Payment = ({ apiUrl }) => {
  const [completed, setCompleted] = useState(false);
  const token = Cookies.get("token");

  let pictureUrl = "";
  let title = "";
  let price = 0;
  let id = "";

  let history = useHistory();
  let myData = {};
  try {
    if (history.location.state.productData === undefined) {
      history.goBack();
    } else {
      myData = history.location.state.productData;
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
            {!completed ? (
              <div className="paymentContent">
                <Elements stripe={stripePromise}>
                  <CheckoutForm
                    apiUrl={apiUrl}
                    myData={myData}
                    token={token}
                    completed={completed}
                    setCompleted={setCompleted}
                  />
                </Elements>
                <div className="buyProductInfos">
                  <img className="imgPayment" src={pictureUrl} alt="" />
                  <h3>{title}</h3>
                  <p className="itemPrice">{numeral(price).format("0,0 $")}</p>
                </div>
              </div>
            ) : (
              <div className="okBuy">
                <p>Commande validée</p>
                <p>Redirection en cours...</p>
                <Loader></Loader>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
