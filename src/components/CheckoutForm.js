import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ apiUrl, myData, token }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [completed, setCompleted] = useState(false);
  myData.amount = Math.floor(myData.price * 100);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cardElement = elements.getElement(CardElement);

    const stripeResponse = await stripe.createToken(cardElement, {
      name: token,
    });
    const stripeToken = stripeResponse.token.id;
    const response = await axios.post(`${apiUrl}/pay`, {
      stripeToken,
      amount: myData.amount,
      currency: "eur",
      description: myData.title,
    });
    console.log(response.data);
    // Si la réponse du serveur est favorable, la transaction a eu lieu
    if (response.data.status === "succeeded") {
      setCompleted(true);
    }
  };
  return (
    <>
      {!completed ? (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <div className="validationButton">
            <button type="submit">Valider</button>
          </div>
        </form>
      ) : (
        <span>Paiement effectué ! </span>
      )}
    </>
  );
};
export default CheckoutForm;
