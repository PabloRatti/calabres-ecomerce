import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Details from "./Components/Details";
import ProductList from "./Components/ProductList";
import Cart from "./Components/Cart";

import HomePage from "./Components/HomePage";
import { Switch, Route } from "react-router-dom";
import Modal from "./Components/Modal";
import Footer from "./Components/Footer";
import LoginForm from "./Components/LoginForm.js";
import AdminHomePage from "./Components/AdminHomePage";
import WhatsappIcon from "./Components/WhatsAppIcon";
import PaymentConfirmation from "./Components/PaymentConfirmation";
import ProductsSoldList from "./Components/ProductsSoldList";
import Congrats from "./Components/Congrats";
import PaymentForm from "./Components/PaymentForm";
import FullNavBar from "./Components/FullNavBar";

function App() {
  return (
    <React.Fragment>
      <FullNavBar />
      <WhatsappIcon />

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/productsSoldList" component={ProductsSoldList} />
        <Route exact path="/llantas" component={ProductList} />

          <Route exact path="/details/:id/" component={Details} />
   
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/adminHome" component={AdminHomePage} />
        <Route exact path="/paymentConfirmation" component={PaymentConfirmation} />
        <Route exact path="/paymentForm" component={PaymentForm} />
        <Route exact path="/congrats" component={Congrats} />
      </Switch>

      <Modal />

      <Footer />
    </React.Fragment>
  );
}

export default App;
