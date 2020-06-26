import React, { Component } from 'react';
import styled from 'styled-components';
import { ProductConsumer } from '../Context';
import { ButtonContainer } from './Button';
import { Link } from 'react-router-dom';

export default class Modal extends Component {
    render() {
        return (
            <ProductConsumer>
                {(value) => {
                    const { modalOpen, closeModal } = value;
                    const { img, title, price,company } = value.modalProduct;
                    if (!modalOpen) {
                        return null;
                    } else {
                        return (
                            <ModalContainer>
                                <div className="container">
                                    <div className="row">
                                        <div id="modal" className="col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize p-5">
                                            <h5 className="title">Producto agregado al carrito</h5>
                                            <img src={img} className="img-fluid" alt="product"></img>
                                            <h5>{company}&nbsp;{title}</h5>
                                            <h5 className="text-muted">valor : ${price}</h5>
                                            <Link to="/llantas">
                                                <ButtonContainer onClick={() => closeModal()}>
                                                    Tienda
                                        </ButtonContainer>
                                            </Link>
                                            <Link to="/cart">
                                                <ButtonContainer cart onClick={() => closeModal()}>

                                                    al carrito
                                        </ButtonContainer>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </ModalContainer>
                        );
                    }


                }}

            </ProductConsumer>
        );

    }
}

const ModalContainer = styled.div`


    position: fixed;
 
    padding: 10rem;
    height: 100%;
    left:0;
    right:0;
    bottom: 0;
    z-index : 1;
    background: rgba(0,0,0,0.3);
    display:flex;
    align-items:center;
    justify-content:center;
    .title{
        color : var(--mainBlue);
    }
    .container{       
       margin: 0 auto;      
    }

    #modal{
        background: var(--mainWhite)           
    }

   
}
`;