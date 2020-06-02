import React, { Component } from 'react';
import { ProductConsumer } from '../Context';
import { Link } from 'react-router-dom';
import { ButtonContainer } from './Button';
import styled from 'styled-components';
import { animateScroll as scroll } from 'react-scroll';
export default class Details extends Component {

    componentDidMount = () =>{
        scroll.scrollToTop();
    }

    render() {
        return (
            <DetailsWraper>
                <ProductConsumer>
                    {value => {
                        const { id, company, img, title, inCart, price, width } = value.detailProduct;
                        return (
                            <div className="container py-5">
                                {/**Title start */}
                                <div className="row">
                                    <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                                        <h1>{title}</h1>
                                    </div>
                                </div>
                                {/**Title end */}
                                {/**Product Info */}
                                <div className="row">
                                    {/**Product img */}
                                    <div id="img-container" className="col-10 mx-10 col-md-6 my-3">
                                        <img id="detail-img" src={img} className="img-fluid" alt="product" />
                                    </div>
                                    {/**Product txt */}
                                    <div id="description" className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                       
                                       
                                     
                                        <p id="list-wraper" className="text-muted lead">
                                            <ul className="ul">
                                                <li>Marca : {company}</li>
                                                <li>Modelo : {title}</li>
                                                <li>Ancho : {width}</li>
                                                <li>Perfil : </li>
                                                <li>Valor : ${price}</li>

                                            </ul>
                                        </p>
                                        {/**Buttons */}
                                        <div>
                                            <Link to="/llantas">
                                                <ButtonContainer>
                                                    tienda
                                            </ButtonContainer >
                                            </Link>
                                            <ButtonContainer cart disabled={inCart ? true : false} onClick={() => {
                                                value.addToCart(id);
                                                value.openModal(id);
                                            }}>
                                                {inCart ? "En carrito" : "Agregar al carrito"}
                                            </ButtonContainer>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        );
                    }}
                </ProductConsumer>
            </DetailsWraper>
        );
    }
}



const DetailsWraper = styled.div`

  margin: 2px solid red !important;
  text-align: center;
   #detail-img{    
        max-height: 25rem;
        margin-left: 2rem !important;
        
   }
   #list-wraper{
       margin-top: 2rem;
      
   }
   .ul{
       list-style: none;
   }
   #img-container{

       max-height: 25rem;
       
   }

   #description{
       

   }
   @media (max-width: 48em) {
        #detail-img{    
        max-height: 35rem;
        margin-left: 3rem !important;
        #description{
            text-align: center !important;
            border: 5px solid violet;
        }
    }
    
    }
  
`;