import React, { Component } from 'react';
import styled from 'styled-components';

export default class AdminProductRow extends Component {


    render() {
        const {img,brand,price,title,total} = this.props;
        return (
            <AdminProductRowContainer className="container">
                <div className="row my-2 text-capitalize text-center">
                    <div id="img-container" className="col-10 mx-auto col-lg-2">
                        <img src={img} style={{ width: '5rem', height: "5rem" }}
                            className="img-fluid" alt="product" />
                    </div>
                    <div id="product-title" className="col-10 mx-auto col-lg-2">
                        <span className="d-lg-none">producto : </span>
                        {title}
                    </div>
                    
                    <div className="col-10 mx-auto col-lg-2">
                        <span  className="d-lg-none">precio : </span>
                        <div id="brand-span">{brand}</div>
                    </div>
                    
                    {/**End */}
                    <div id="trashIcon" className="col-10 mx-auto col-lg-2">
                        <div className="cart-icon" >
                            <i className="fas fa-trash"></i>
                        </div>
                    </div>
                    <div id="input-price" className="col-10 mx-auto col-lg-2">
                        <input type="text" placeholder="Actualizar precio"/>                       
                    </div>
                    <div id="submit-button" className="col-10 mx-auto col-lg-2">
                        <button type="submit">Guardar</button>
                    </div>
                    
                </div>
            </AdminProductRowContainer>
        );
    }
}

const AdminProductRowContainer = styled.nav`


`;