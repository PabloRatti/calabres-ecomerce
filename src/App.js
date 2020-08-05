import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Details from './Components/Details';
import ProductList from './Components/ProductList';
import Cart from './Components/Cart';
import Default from './Components/Default';
import HomePage from './Components/HomePage';
import { Switch, Route } from 'react-router-dom';
import Modal from './Components/Modal';
import Footer from './Components/Footer';
import LoginForm from './Components/LoginForm.js';
import AdminHomePage from './Components/AdminHomePage';
import WhatsappIcon from './Components/WhatsAppIcon';
import PaymentConfirmation from './Components/PaymentConfirmation';
import ProductsSoldList from './Components/ProductsSoldList';
import Congrats from './Components/Congrats';
import PaymentForm from './Components/PaymentForm';
import FullNavBar from './Components/FullNavBar';

function App() {
  return (
    <React.Fragment>
      <FullNavBar />
      <WhatsappIcon />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/productsSoldList" component={ProductsSoldList} />
        <Route path="/llantas" component={ProductList} />
        <Route path="/details" component={Details} />
        <Route path="/cart" component={Cart} />
        <Route path="/login" component={LoginForm} />
        <Route path="/adminHome" component={AdminHomePage} />
        <Route path="/paymentConfirmation" component={PaymentConfirmation} />
        <Route path="/paymentForm" component={PaymentForm} />
        <Route path="/congrats" component={Congrats} />
        <Route component={Default} />

      </Switch>
      <Modal />

      <Footer />

    </React.Fragment>
  );
}

export default App;
