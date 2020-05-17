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

function App() {
  return (
    <React.Fragment>
      <NavBar/>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/llantas" component={ProductList} />
        <Route path="/details" component={Details} />
        <Route path="/cart" component={Cart} />       
        <Route component={Default} />
       
      </Switch>       
     <Modal />
    </React.Fragment>
  );
}

export default App;
