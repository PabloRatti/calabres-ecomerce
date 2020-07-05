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
                 //  modalOpen = true;
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

                                                     carrito
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
 
    padding: 1rem;
    max-height: 100%;
    left:0;
    top:0;
    right:0;
    bottom: 0;
    z-index : 1;
    background: rgba(0,0,0,0.3);
     width: 100%;
    align-items:center;
    justify-content:center;
.img-fluid{
    max-height: 15rem;
}
    .title{
        color : var(--mainBlue);
    }
   
    
     .container{    
        
       width: 100%;
       max-height: 35rem;
           
    }
    #modal{
        background: var(--mainWhite);
        margin-top: 2.5rem;
        width: 80%;      
    }
@media (max-width: 48em) {
     #modal{
    margin-top: 4rem;
     }
}
   
}
`;