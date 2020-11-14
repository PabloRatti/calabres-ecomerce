import React, { Component } from "react";
import { ProductConsumer } from "../Context";
import { Link } from "react-router-dom";
import { ButtonContainer } from "./Button";
import styled from "styled-components";
import { animateScroll as scroll } from "react-scroll";
import FichaTecnicaDetails from "./FichaTecnicaDetails";
import Loader from 'react-loader-spinner';


export default class Details extends Component {
  constructor() {
    super();
    this.state = {
      product: null,
      isLoading: true,
    };
  }
  componentDidMount = () => {
    scroll.scrollToTop();
    console.log('Detail page mounting......');
    this.getProduct();
    console.log("Product getted ");
  };

  getProduct = () => {
    const url = this.props.location.pathname;
    const productID = url.slice(9);
    console.log("Product ID : " + productID);
    let req = {
      method: "GET",
      headers: {
        mode: "cors",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    fetch("https://elcalabres.com.ar/notes/" + productID, req)
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .then((resp) => {
        if (resp.length > 0 ){
           this.setState({ product: resp[0], isLoading: false});
            console.log(this.state.product);  
        } else {
            this.props.history.push("/llantas");
        }
       
      });
  };

  transferenciaHandler = () => {
    console.log("Transferencia handler activated");
    console.log("Submited Mobile");
    let wspLink = "https://api.whatsapp.com/send?phone=542233129785";
    window.location = wspLink;
  };
  render() {
    return (
      <DetailsWraper>
        {!this.state.isLoading ? (
          <ProductConsumer>
            {(value) => {
              const price = this.state.product.price;
              let cuotas = price / 12;
              let priceStriked = price + (price * 20) / 100;
              let totalTransferencia = price - (price * 20) / 100;
              return (
                <div className="container py-5">
                  {/**Title start */}
                  <div className="row">
                    <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                      {/* <h1>{title}</h1>*/}
                    </div>
                  </div>
                  {/**Title end */}
                  {/**Product Info */}
                  <div className="row">
                    {/**Product img */}
                    <div
                      id="img-container"
                      className="col-10 mx-10 col-md-6 my-3"
                    >
                      <img
                        id="detail-img"
                        src={this.state.product.img}
                        className="img-fluid"
                        alt="product"
                      />
                    </div>
                    {/**Product txt */}
                    <div
                      id="description"
                      className="col-10 mx-auto col-md-6 my-3 text-capitalize"
                    >
                      <h1 id="title">
                        {this.state.product.company}&nbsp;
                        {this.state.product.title}
                      </h1>
                      {this.state.product.type !== "llantas" ? (
                        <h2>
                          &nbsp;{this.state.product.width}/
                          {this.state.product.profile}/
                          {this.state.product.rodado}
                        </h2>
                      ) : null}

                      <h2>
                        <strike id="striked">${priceStriked}</strike>
                        &nbsp;&nbsp;$
                        {price}
                      </h2>
                      <h4 className="price-container">
                        {" "}
                        12 cuotas sin interes de ${cuotas.toFixed(2)}
                      </h4>
                      <h4
                        onClick={this.transferenciaHandler}
                        id="transferencia"
                        style={{ color: "red" }}
                        className="price-container"
                      >
                        Transferencia bancaria -20% $
                        {totalTransferencia.toFixed(2)} Click aqui!
                      </h4>
                      <FichaTecnicaDetails
                        className="ficha-tecnica"
                        detailProduct={this.state.product}
                      />
                      {/**Buttons */}
                      <div>
                        <Link to="/llantas">
                          <ButtonContainer>tienda</ButtonContainer>
                        </Link>
                        <ButtonContainer
                          cart
                          disabled={this.state.product.inCart ? true : false}
                          onClick={() => {
                            value.addToCart(this.state.product.id);
                            value.openModal(this.state.product.id);
                          }}
                        >
                          {this.state.product.inCart
                            ? "En carrito"
                            : "Agregar al carrito"}
                        </ButtonContainer>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }}
          </ProductConsumer>
        ) : (
          <div className="spinner">
            <div id="loader">
              <Loader
                type="Puff"
                color="#00BFFF"
                height={200}
                width={200}
                timeout={0}
              />
            </div>
          </div>
        )}
      </DetailsWraper>
    );
  }
}

const DetailsWraper = styled.div`
  text-align: center;
  min-height: 30rem;
  #transferencia:hover {
    cursor: pointer;
    color: green !important;
  }
  .price-container {
    color: red;
    font-size: 1rem;
  }
  .ficha-tecnica {
    margin: 0 auto;
  }
  #striked {
    color: gray;
  }
  #detail-img {
    max-height: 25rem;
    margin-left: 2rem !important;
  }
  #list-wraper {
    margin-top: 2rem;
  }
  .ul {
    list-style: none;
  }
  #img-container {
    max-height: 80%;
  }
  #title {
    font-size: 2rem !important;
    color: var(--mainBlue);

    line-height: 28px;
    font-weight: 800;
  }
  #numbers {
    font-weight: 600;
    font-family: "Futura Bold";
    line-height: 28px;
  }

  .spinner{
    border: 2px solid white;
    height: 35rem;
    }
    
    #loader{
    width: 13%;
    margin: 0 auto;
    margin-top: 13rem;
    }
    

  @media (max-width: 48em) {
    #detail-img {
      max-height: 100%;
    }
    .spinner{
        border: 2px solid white;
        }
        
        
        #loader{
        
        width: 50%;
        text-aling:center;
        }
  }
`;
