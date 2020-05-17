import React, { Component } from 'react';
import { ProductConsumer } from '../Context';
import { Link } from 'react-router-dom';
import { ButtonContainer } from './Button';

export default class Details extends Component {
    render() {
        return (
            <ProductConsumer>
                {value => {
                    const { id, company, img, info, title, inCart, price } = value.detailProduct;
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
                                <div className="col-10 mx-auto col-md-6 my-3">
                                    <img src={img} className="img-fluid" alt="product" />
                                </div>
                                {/**Product txt */}
                                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                    <h2>modelo : {title}</h2>
                                    <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                                        fabricante : <span className="text-uppercase">
                                            {company}
                                        </span>
                                    </h4>
                                    <h4 className="text-blue">
                                        <strong>
                                            valor : <span>$</span>
                                            {price}
                                        </strong>
                                    </h4>
                                    <p className="text-capitalize font-weight-bold mt-3 mb-0">
                                        informacion del producto:
                                    </p>
                                    <p className="text-muted lead">
                                        {info}
                                    </p>
                                    {/**Buttons */}
                                    <div>
                                        <Link to="/">
                                            <ButtonContainer>
                                                productos
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
        );
    }
}