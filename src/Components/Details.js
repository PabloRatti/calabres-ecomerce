import React, { Component } from 'react';
import { ProductConsumer } from '../Context';
import { Link } from 'react-router-dom';
import { ButtonContainer } from './Button';
import styled from 'styled-components';
import { animateScroll as scroll } from 'react-scroll';
import FichaTecnicaDetails from './FichaTecnicaDetails';
export default class Details extends Component {

    componentDidMount = () => {
        scroll.scrollToTop();
    }

    render() {
        return (
            <DetailsWraper>
                <ProductConsumer>
                    {value => {
                        const { id, type, company, img, title, inCart, price, width, profile, info, rodado } = value.detailProduct;
                        let cuotas = price / 12;
                        let priceStriked = price + ((price * 20) / 100);
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
                                    <div id="img-container" className="col-10 mx-10 col-md-6 my-3">
                                        <img id="detail-img" src={img} className="img-fluid" alt="product" />
                                    </div>
                                    {/**Product txt */}
                                    <div id="description" className="col-10 mx-auto col-md-6 my-3 text-capitalize">

                                        <h1 id="title">{type} &nbsp;{company}&nbsp;{title}</h1>
                                        <h2>&nbsp;{width}/{profile}/{rodado}</h2>
                                        <h2><strike id="striked">${priceStriked}</strike>&nbsp;&nbsp;${price}</h2>
                                        <h4 className="price-container">  12 cuotas sin interes de ${cuotas.toFixed(2)}</h4>
                                        <FichaTecnicaDetails className="ficha-tecnica" detailProduct={value.detailProduct} />
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

  text-align: center;
.price-container{
    color:green;
}
  .ficha-tecnica{
      margin : 0 auto;
  }
  #striked{
      color:gray;
  }
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
#title{
    font-size: 2rem !important;   
    color: var(--mainBlue);
    
    line-height: 28px;
    font-weight: 800;
}
#numbers{
    font-weight: 600;
     font-family: 'Futura Bold';
    line-height: 28px;
}
    
   @media (max-width: 48em) {
        #detail-img{    
        max-height: 35rem;
        margin-left: 3rem !important;       
    }
     
    
    }
  
`;