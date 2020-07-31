import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import Cookies from "js-cookie";

const Signup = ({
  apiUrl,
  setSearchVisible,
  setUser,
  setLoggedIn,
  loggedIn,
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  let history = useHistory();

  useEffect(() => {
    setSearchVisible("disabled");
    // eslint-disable-next-line
  }, []);

  const accountCreation = async (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      try {
        const response = await axios.post(`${apiUrl}/user/sign_up`, {
          username: username,
          email: email,
          password: password,
        });
        if (response.data.token) {
          setLoggedIn(response.status);
          Cookies.set("token", response.data.token, { expires: 7 });
          setUser({ token: response.data.token });
          setErrorMessage("");
          setEmail("");
          setUsername("");
          setPassword("");
          setConfirmPassword("");
          setTimeout(() => {
            history.push("/");
            setLoggedIn(0);
          }, 2000);
        }
      } catch (err) {
        if (err.response.data.error === "This username is already registered") {
          setErrorMessage("Ce nom d'utilisateur existe déjà");
          setPassword("");
          setConfirmPassword("");
        } else if (
          err.response.data.error === "This email is already registered"
        ) {
          setErrorMessage("Cet email existe déjà");
          setPassword("");
          setConfirmPassword("");
        } else {
          setErrorMessage("Erreur. Merci de réessayer ultérieurement");
          setPassword("");
          setConfirmPassword("");
        }
      }
    } else {
      setErrorMessage("Les mots de passe ne sont pas identiques");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="container">
      <div>
        {loggedIn === 200 ? (
          <div className="accountCreationDiv">
            <div className="accountCreated">
              <p>Compte créé avec succès</p>
              <p>Connexion en cours...</p>
            </div>
          </div>
        ) : (
          <div className="accountCreationDiv">
            <div>
              <h2>Pourquoi créer un compte</h2>
              <div className="whyAccount">
                <img src="" alt="" />
                <h3>Gagnez du temps</h3>
                <p>
                  Publiez vos annonces rapidement, avec vos informations
                  pré-remplies chaque fois que vous souhaitez déposer une
                  nouvelle annonce.
                </p>
              </div>
              <div className="whyAccount">
                <img src="" alt="" />
                <h3>Soyez les premiers informés</h3>
                <p>
                  Créez des alertes Immo ou Emploi et ne manquez jamais
                  l’annonce qui vous intéresse.
                </p>
              </div>
              <div className="whyAccount">
                <img src="" alt="" />
                <h3>Visibilité</h3>
                <p>
                  Suivez les statistiques de vos annonces (nombre de fois où
                  votre annonce a été vue, nombre de contacts reçus).
                </p>
              </div>
            </div>
            <div>
              <p className="loginTitle">Créer un compte</p>
              <form className="loginForm" action="" onSubmit={accountCreation}>
                <p className="errorMessage">{errorMessage}</p>
                <label htmlFor="">Nom d'utilisateur *</label>
                <input
                  type="text"
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                  required
                />
                <br />
                <label htmlFor="">Adresse email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  required
                />
                <br />
                <div className="passwords">
                  <div>
                    <label htmlFor="">Mot de passe *</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="">Confirmer le mot de passe *</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(event) => {
                        setConfirmPassword(event.target.value);
                      }}
                      required
                    />
                  </div>
                </div>
                <br />
                <div className="cgv">
                  <input type="checkbox" required />
                  <label>
                    « J’accepte les Conditions Générales de Vente et les
                    Conditions Générales d’Utilisation »
                  </label>
                </div>
                <button type="submit">Créer mon compte</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
