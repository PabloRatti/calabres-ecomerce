import React, { Component } from 'react';
import styled from 'styled-components';

export default class AdminProductRow extends Component {


    render() {
        const { handleOperation } = this.props;
        const { id, img, brand, price, title, type } = this.props;
        return (
            <AdminProductRowContainer className="container">
                <div className="row my-2 text-capitalize text-center">
                    <div id="img-container" className="col-10 mx-auto col-lg-2">
                        <img src={img} style={{ width: '5rem', height: "5rem" }}
                            className="img-fluid" alt="product" />
                    </div>
                    <div className="col-10 mx-auto col-lg-2">
                
                        {type}
                    </div>
                    <div id="product-title" className="col-10 mx-auto col-lg-2">
                        <span className="d-lg-none">producto : </span>
                        {title}
                    </div>

                    <div className="col-10 mx-auto col-lg-2">
                        <span className="d-lg-none">precio : </span>
                        <div id="brand-span">{brand}</div>
                    </div>

                    {/**End */}
                    <div id="trashIcon" className="col-10 mx-auto col-lg-2">
                        <div className="cart-icon" onClick={() => {
                            return handleOperation('delete', id, img);
                        }}>
                            <i className="fas fa-trash"></i>
                        </div>
                    </div>
                    <div id="input-price" className="col-10 mx-auto col-lg-2">
                      
                        
                        <button id="btn-price" class="btn btn-primary" type="submit" onClick={() => {
                                return handleOperation('update', id);
                        }}>  <input id="input-price" type="text" placeholder={price} />Actualizar valor</button>
                        
                    </div>
                  

                </div>
            </AdminProductRowContainer>
        );
    }
}

const AdminProductRowContainer = styled.nav`

.input-price{
    width:1rem !important;
}
`;