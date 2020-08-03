import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Offers from "./containers/Offers";
import Offer from "./containers/Offer";
import Footer from "./components/Footer";
import NoMatch from "./containers/NoMatch";
import Login from "./components/Login";
import Signup from "./containers/Signup";
import Cookies from "js-cookie";
import Publish from "./containers/Publish";

function App() {
  const token = Cookies.get("token");
  const [user, setUser] = useState(token || null);

  // Active/désactive la modal de connexion
  const [loginVisible, setLoginVisible] = useState("disabled");

  // Active/désactive la barre de recherche. Par défaut, active sur la homepage uniquement
  const [searchVisible, setSearchVisible] = useState("disabled");

  // Permet de récupérer les codes de response (200, 40x) et de masquer/afficher des éléments
  const [loggedIn, setLoggedIn] = useState(0);

  // Adresse du backend
  // const apiUrl = "https://leboncoin-api.herokuapp.com";
  // Mon Backend
  const apiUrl = "https://leboncoin-api-js.herokuapp.com";

  return (
    <div className="App">
      <Router>
        <div className="mainContent">
          <Login
            loginVisible={loginVisible}
            setLoginVisible={setLoginVisible}
            apiUrl={apiUrl}
            setUser={setUser}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
          ></Login>
          <Header
            searchVisible={searchVisible}
            setSearchVisible={setSearchVisible}
            loginVisible={loginVisible}
            setLoginVisible={setLoginVisible}
            user={user}
            setUser={setUser}
          ></Header>

          <Switch>
            <Route path="/signup">
              <Signup
                apiUrl={apiUrl}
                setSearchVisible={setSearchVisible}
                setUser={setUser}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              ></Signup>
            </Route>
            <Route path="/publish">
              <Publish
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                apiUrl={apiUrl}
              ></Publish>
            </Route>
            <Route path="/offer/:id">
              <Offer apiUrl={apiUrl}></Offer>
            </Route>
            <Route exact path="/">
              <Offers
                setSearchVisible={setSearchVisible}
                apiUrl={apiUrl}
              ></Offers>
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </Router>
      <Footer></Footer>
    </div>
  );
}

export default App;
