import React, { Component } from 'react';
import styled from 'styled-components';

export default class AdminProductRow extends Component {
    constructor() {
        super();
        this.state = {
            newPrice: '',
            id: null
        }
    }


    priceHandler = (e) => {
        e.preventDefault();
        this.setState({ newPrice: e.target.value });
    }


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

                        {title}
                    </div>
                    <div id="product-title" className="col-10 mx-auto col-lg-2">
                        <span className="d-lg-none">producto : </span>
                        {type} {brand}
                    </div>

                    <div className="col-10 mx-auto col-lg-2">
                        <span className="d-lg-none">precio : </span>
                        ${price}
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

                        <form onSubmit={() => {
                            return handleOperation('update', id, this.state.newPrice);
                        }} className="form-price" action={this.updateHandler} method="PUT" encType="application/json">
                            <input className="input-price" type="number" id="price" name="price" placeholder={price} value={this.state.newPrice} onChange={this.priceHandler} />
                            <button id="btn-price" class="btn btn-primary" type="submit">Actualizar</button>
                        </form>

                      
                    </div>


                </div>
            </AdminProductRowContainer>
        );
    }
}

const AdminProductRowContainer = styled.nav`


#btn-price{
    position: relative;
    border-radius: 0rem 1rem 1rem 0rem;
}
#btn-price:hover{
   background-color: var(--mainBlue);
}
.form-price{

    width: 10rem !important;
    height: 2rem;
    display: flex; 
    flex-direction: row;
    justify-content:center;
    right: 2rem !important;
    padding: 0;
}
`;