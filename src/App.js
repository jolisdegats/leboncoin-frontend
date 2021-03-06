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
import Publish from "./containers/Publish";
import Payment from "./containers/Payment";
import Cookies from "js-cookie";

function App() {
  const token = Cookies.get("token");
  const [user, setUser] = useState(token || null);

  // Active/désactive la modal de connexion
  const [loginVisible, setLoginVisible] = useState("disabled");

  // Active/désactive la barre de recherche. Par défaut, active sur la homepage uniquement
  const [searchVisible, setSearchVisible] = useState("disabled");

  // Filtres de recherche
  const [filter, setFilter] = useState("");

  // Pour reset la pagination
  const [page, setPage] = useState(1);

  // Adresse du backend
  // const apiUrl = "https://leboncoin-api.herokuapp.com";
  // Mon Backend
  const apiUrl = "https://leboncoin-api-js.herokuapp.com";
  // Mon Backend local
  // const apiUrl = "http://localhost:3001";

  return (
    <div className="App">
      <Router>
        <div className="mainContent">
          <Login
            loginVisible={loginVisible}
            setLoginVisible={setLoginVisible}
            apiUrl={apiUrl}
            setUser={setUser}
          ></Login>
          <Header
            searchVisible={searchVisible}
            setSearchVisible={setSearchVisible}
            loginVisible={loginVisible}
            setLoginVisible={setLoginVisible}
            user={user}
            setUser={setUser}
            setFilter={setFilter}
            setPage={setPage}
          ></Header>

          <Switch>
            <Route path="/signup">
              <Signup
                apiUrl={apiUrl}
                setSearchVisible={setSearchVisible}
                setUser={setUser}
              ></Signup>
            </Route>
            <Route path="/publish">
              <Publish apiUrl={apiUrl}></Publish>
            </Route>
            <Route path="/offer/:id">
              <Offer
                apiUrl={apiUrl}
                setLoginVisible={setLoginVisible}
                user={user}
              ></Offer>
            </Route>
            <Route path="/pay">
              <Payment apiUrl={apiUrl}></Payment>
            </Route>
            <Route exact path="/">
              <Offers
                setSearchVisible={setSearchVisible}
                apiUrl={apiUrl}
                filter={filter}
                page={page}
                setPage={setPage}
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
