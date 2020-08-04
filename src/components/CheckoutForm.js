import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useHistory } from "react-router-dom";
import axios from "axios";

const CheckoutForm = ({ apiUrl, myData, token }) => {
  let history = useHistory();
  const stripe = useStripe();
  const elements = useElements();
  const [completed, setCompleted] = useState(false);
  let amount = Math.floor(myData.price * 100);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement);
      const stripeToken = stripeResponse.token.id;
      const response = await axios.post(
        `${apiUrl}/pay`,
        {
          stripeToken,
          amount: amount,
          currency: "eur",
          title: myData.title,
          offerId: myData._id,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.data.status === "succeeded") {
        setCompleted(true);
        return setTimeout(() => {
          history.push("/");
        }, 2000);
      }
    } catch (err) {
      console.log(err.message);
      history.goBack();
    }
  };

  return (
    <>
      {!completed ? (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <div className="validationButton">
            <button className="blueButton" type="submit">
              Valider la commande
            </button>
          </div>
        </form>
      ) : (
        <div className="okBuy">
          <p>Commande validée</p>
          <p>Redirection en cours...</p>
        </div>
      )}
    </>
  );
};
export default CheckoutForm;
