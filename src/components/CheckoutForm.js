import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ apiUrl, myData, token }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [completed, setCompleted] = useState(false);
  let amount = Math.floor(myData.price * 100);

  const handleSubmit = async (event) => {
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
      setTimeout(() => {
        this.props.history.push("/");
      }, 2000);
    }
  };
  return (
    <>
      {!completed ? (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <div className="validationButton">
            <button type="submit">Valider la commande</button>
          </div>
        </form>
      ) : (
        <div className="okBuy">
          <p>Commande validée</p>
        </div>
      )}
    </>
  );
};
export default CheckoutForm;
