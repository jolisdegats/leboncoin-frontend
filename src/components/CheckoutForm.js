import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useHistory } from "react-router-dom";
import axios from "axios";

const CheckoutForm = ({ apiUrl, myData, token, completed, setCompleted }) => {
  let history = useHistory();
  const stripe = useStripe();
  const elements = useElements();

  let amount = Math.floor(myData.price * 100);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement);
      console.log(cardElement);
      if (!stripeResponse) {
        console.log("erreur");
      } else {
        const stripeToken = stripeResponse.token.id;

        console.log(myData);
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
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      {!completed ? (
        <form className="paymentForm" onSubmit={handleSubmit}>
          <input type="text" placeholder="Nom du destinataire"></input>
          <input type="text" placeholder="Adresse de livraison"></input>
          <input type="text" placeholder="Code postal"></input>
          <input type="text" placeholder="Ville"></input>
          <CardElement />
          <div className="validationButton">
            <button className="blueButton" type="submit">
              Valider la commande
            </button>
          </div>
        </form>
      ) : (
        ""
      )}
    </>
  );
};
export default CheckoutForm;
