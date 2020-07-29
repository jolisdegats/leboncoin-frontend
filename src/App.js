import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import SearchDiv from "./components/SearchDiv";
import Offers from "./containers/Offers";
import Offer from "./containers/Offer";
import Footer from "./components/Footer";
import NoMatch from "./containers/NoMatch";

function App() {
  const [visible, setVisible] = useState("enabled");

  return (
    <div className="App">
      <Router>
        <Header visible={visible} setVisible={setVisible}></Header>
        <SearchDiv visible={visible}></SearchDiv>
        <Switch>
          <Route path="/offer/:id">
            <Offer></Offer>
          </Route>
          <Route exact path="/">
            <Offers setVisible={setVisible}></Offers>
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
      <Footer></Footer>
    </div>
  );
}

export default App;
