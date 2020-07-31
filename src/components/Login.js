import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = ({
  loginVisible,
  setLoginVisible,
  apiUrl,
  setUser,
  loggedIn,
  setLoggedIn,
}) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  let history = useHistory();

  const loginUser = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/user/login`, {
        email: email,
        password: password,
      });
      if (response.data.token) {
        // CREATION DU COOKIE + USER
        Cookies.set("token", response.data.token, { expires: 7 });
        setUser({ token: response.data.token });

        setLoggedIn(response.status);
        // RESET DES CHAMPS
        setErrorMessage("");
        setEmail("");
        setPassword("");
        setTimeout(() => {
          setLoginVisible("disabled");
          history.push("/");
          setLoggedIn(0);
        }, 2000);
      }
    } catch (error) {
      if (error.response.status === 404) {
        setErrorMessage("Aucun compte enregistré avec cet email");
      } else if (error.response.status === 401) {
        setErrorMessage("Mauvais mot de passe");
      } else {
        setErrorMessage("Erreur. Merci de réessayer ultérieurement");
      }
    }
  };

  return (
    <div className={"loginModal " + loginVisible}>
      <button
        className="closeButton"
        onClick={() => setLoginVisible("disabled")}
      >
        X
      </button>

      <div className="loginFormDiv borderBot">
        <p className="loginTitle">Connexion</p>
        {loggedIn === 200 ? (
          <div className="loginFormDiv">
            <p>Identification réussie</p>
            <p>Connexion en cours...</p>
          </div>
        ) : (
          <form className="loginForm" action="" onSubmit={loginUser}>
            <p className="errorMessage">{errorMessage}</p>
            <label htmlFor="">Adresse email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              required
            />
            <br />
            <label htmlFor="">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              required
            />
            <br />
            <button type="submit">Se connecter</button>
          </form>
        )}
      </div>
      {loggedIn !== 200 && (
        <div className="loginFormDiv">
          <label>Vous n'avez pas de compte ?</label>
          <button
            className="loginNoAccount"
            onClick={() => {
              setLoginVisible("disabled");
              history.push("/signup");
            }}
          >
            Créer un compte
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
