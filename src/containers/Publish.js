import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
// import Dropzone from "react-dropzone";

const Publish = ({ loggedIn, setLoggedIn, apiUrl }) => {
  const [offerTitle, setOfferTitle] = useState("");
  const [offerDesc, setOfferDesc] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [offerPic, setOfferPic] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  let history = useHistory();

  const token = Cookies.get("token");

  const publishOffer = async (event) => {
    event.preventDefault();
    try {
      console.log(offerPic);
      const formData = new FormData();
      formData.append("title", offerTitle);
      formData.append("description", offerDesc);
      formData.append("price", offerPrice);
      formData.append("picture", offerPic);
      const response = await axios.post(`${apiUrl}/offer/publish`, formData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      });
      setLoggedIn(response.status);
      setErrorMessage("");
      setOfferTitle("");
      setOfferDesc("");
      setOfferPrice("");
      setOfferPic({});
      setTimeout(() => {
        history.push("/");
        setLoggedIn(0);
      }, 2000);
    } catch (err) {
      if (err.response.data === "Title is too long (50 characters max)") {
        setErrorMessage("Titre trop long (50 caractères max)");
      } else if (
        err.response.data === "Description is too long (500 characters max)"
      ) {
        setErrorMessage("Description trop longue (500 caractères max)");
      } else if (err.response.data === "Price is too high (100000 max)") {
        setErrorMessage("Prix trop élevé (100 000 € max)");
      } else {
        setErrorMessage("Erreur. Merci de réessayer ultérieurement");
      }
    }
  };

  return (
    <div className="container">
      <div>
        {loggedIn === 200 ? (
          <div className="whiteFloatingContainer">
            <div className="formSubmitted">
              <h2 className="loginTitle">Déposer une annonce</h2>
              <p>Publication en cours...</p>
            </div>
          </div>
        ) : (
          <div className="whiteFloatingContainer">
            <div className="offerPublishDiv">
              <h2 className="loginTitle">Déposer une annonce</h2>
              <form className="loginForm" action="" onSubmit={publishOffer}>
                <p className="errorMessage">{errorMessage}</p>
                <label htmlFor="">Titre de l'annonce *</label>
                <input
                  type="text"
                  value={offerTitle}
                  onChange={(event) => {
                    setOfferTitle(event.target.value);
                  }}
                  required
                />
                <br />
                <label htmlFor="">Description de l'annonce *</label>
                <textarea
                  className="textareaInput"
                  type="text"
                  value={offerDesc}
                  onChange={(event) => {
                    setOfferDesc(event.target.value);
                  }}
                  required
                />
                <br />
                <label htmlFor="">Prix *</label>
                <div className="priceInputDiv">
                  <input
                    className="priceInput"
                    type="text"
                    value={offerPrice}
                    onChange={(event) => {
                      setOfferPrice(event.target.value);
                    }}
                    required
                  />
                  <p> €</p>
                </div>
                <br />
                <label htmlFor="">Photo *</label>
                <input
                  type="file"
                  onChange={(event) => {
                    // console.log(event.target.files[0]);
                    setOfferPic(event.target.files[0]);
                  }}
                />
                {/* Dropzone tests */}
                {/* <Dropzone
                  onDrop={(acceptedFiles) => setOfferPic(acceptedFiles[0])}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p className="dropzoneStyle">
                          Drag 'n' drop some files here, or click to select
                          files
                        </p>
                        <div className="dropzone-previews"></div>
                      </div>
                    </section>
                  )}
                </Dropzone> */}
                {/* {console.log(offerPic)}
                <img src={offerPic.path} alt="" /> */}
                <button type="submit">Valider</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Publish;
