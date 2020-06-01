import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Components/NavBar';
import Details from './Components/Details';
import ProductList from './Components/ProductList';
import Cart from './Components/Cart';
import Default from './Components/Default';
import HomePage from './Components/HomePage';
import { Switch,Route } from 'react-router-dom';
import Modal from './Components/Modal';
import Footer from './Components/Footer';
import LoginForm from './Components/LoginForm.js';
import AdminHomePage from './Components/AdminHomePage';
import WhatsappIcon from './Components/WhatsAppIcon';
function App() {
  return (
    <React.Fragment>
      <NavBar/>
      <WhatsappIcon/>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/llantas" component={ProductList} />
        <Route path="/details" component={Details} />
        <Route path="/cart" component={Cart} />     
        <Route path="/login" component={LoginForm} />  
        <Route path="/adminHome" component={AdminHomePage} />    
        <Route component={Default} />
       
      </Switch>       
     <Modal />
      <Footer />
    </React.Fragment>
  );
}

export default App;
