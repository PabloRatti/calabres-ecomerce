import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ProductConsumer } from '../Context';
import PropTypes from 'prop-types';
export default class Product extends Component {
    render() {
        const { id, title, img, price, inCart, company,profile,width,rodado,type } = this.props.product;
        const cuotas = price/12;
        return (
            <ProductWrapper className="col-10 col-xs-5 col-sm-3 mx-auto col-md-5 col-lg-3 my-3">
                <div className="card">
                    <ProductConsumer>
                        {value => (
                            <div className="img-container p-5" onClick={() => {
                                value.handleDetail(id)
                            }
                            }>
                                <Link to={"/details/"+id}>
                                    <img src={img} alt="product" id="cardImg" className="card-img-top" />
                                </Link>
                                <button className="cart-btn" disabled={inCart ? true : false} onClick={() => {
                                    value.addToCart(id);
                                    value.openModal(id);
                                }}>

                                    {inCart ?
                                        (<p className="text-capitalize mb-0" disabled>
                                            {""}
                                         En carrito</p>)
                                        : (<i className="fas fa-cart-plus" />)}

                                </button>

                            </div>)}

                    </ProductConsumer>
                    {/*Card footer*/}
                    <div className="card-footer d-flex justify-content.between">
                        <p id="company" className="title align-self-center ">
                            {company.toUpperCase()} {title}
                        </p>
                        { type === 'llantas' ? <p className="text-blue font-italic">R{rodado}</p>
                           : <p className="text-blue font-italic">{width}/{profile}/{rodado}</p>} 
                        <div className="price text-blue font-italic">
                            <p className="title align-self-center">${price}</p>
                          
                        </div>                 
                    </div>

                    <div className="cuotas text-blue font-italic">
                                    <p className="title align-self-center ">12 cuotas sin interés de ${cuotas.toFixed()}</p>

                    </div> 
                </div>
            </ProductWrapper>
        );
    }
}

Product.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number,
        img: PropTypes.string,
        title: PropTypes.string,
        price: PropTypes.number,
        inCart: PropTypes.bool
    }).isRequired
};

const ProductWrapper = styled.div`

color: var(--mainBlue);
#cardImg{
  
    min-height: 80%;
     max-height: 85%;
    
}
.price{
    margin-left: 3rem;
   color: red; 
   
   height: 25%;
}

.cuotas{
   
   text-align:center;
}
.card{
   
    border-color: transparent;
    transition:all 1s linear;
    height: 100%
   
}
#company{  
    width: 100%;
}
.card-footer{
   

    background:transparent;
    border-top: transparent;
    border-bottom: 2px solid black;
    transition:all 1s linear;
     
}
&:hover{
    .card{
        border: 0.04rem solid rgba(0,0,0,0.2);
        box-shadow: 2px 2px 5px 0px rgb(0,0,0,0.2);
    }
    .card-footer{
        background: rgba(247,247);        
    }
}

.img-container{
     
    height:80%;
    position:relative;
    overflow:hidden;
}

.card-img-top{
    transition: all 1s linear;
}

.img-container:hover .card-img-top{
    transform: scale(1.2);
}

.cart-btn{
    position: absolute;
    bottom: 0;
    right:0;
    padding: 0.2rem 0.4rem;
    background: var(--lightBlue);
    border: none;
    color: var(--mainWhite);
    font-size: 1.4rem;
    border-radius: 0.5rem 0 0 0;
    transform: translate(100%,100%);
    transition: all 1s linear;
}

.img-container:hover .cart-btn{
    transform: translate(0,0);
}

.cart-btn:hover{
    color:var(--mainBlue);
    cursor: pointer;
}


`;