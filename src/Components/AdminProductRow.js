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

    updateSubmit = () => {
        const { handleActions,id } = this.props;
        console.log('Recien update')     
        return handleActions('update',id,this.state.newPrice) 
    }

    render() {

        const { handleActions } = this.props;
        const { id, img, company, price, title, width, profile, rodado } = this.props.item;
          return (
            <AdminProductRowContainer className="container">
                <div className="row my-2 text-capitalize text-center">

                    <div id="img-container" className="col-10 mx-auto col-lg-2">

                        <img src={img} style={{ width: '5rem', height: "5rem" }}
                            className="img-fluid" alt="product" />
                    </div>
                    <div className="col-10 mx-auto col-lg-2">

                        {company}
                    </div>

                    <div id="product-title" className="col-10 mx-auto col-lg-2">
                        <span className="d-lg-none">producto : </span>
                        {title}
                    </div>

                    <div className="col-10 mx-auto col-lg-2">
                        <span className="d-lg-none">Medidas : </span>
                        {width}/{profile}/{rodado}
                    </div>
                    <div className="col-10 mx-auto col-lg-2">
                        <form className="cart-icon" onClick={() => {
                            
                              return handleActions('delete', id, img);
                        }}>
                            <i className="fas fa-trash"></i>
                        </form>
                    </div>
                    {/**End */}

                    <div id="form-container" className="col-10 mx-auto col-lg-2">
                        {/** <form onSubmit={() => {
                            return handleOperation('update', id, this.state.newPrice);
                        }} className="form-price" action={this.updateHandler} method="PUT" encType="application/json">
                            <input className="input-price" type="number" id="price" name="price" placeholder={price} value={this.state.newPrice} onChange={this.priceHandler} />
                            <button id="btn-price" class="btn btn-primary" type="submit">Actualizar</button>
                        </form>   */}

                        <form className="form-price" onSubmit={this.updateSubmit}  encType="application/json">
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
.form-container{
    border:2px solid green;
}
.input-price{
    width: 4rem;

}
#btn-price{
    
    border-radius: 0rem 1rem 1rem 0rem;
}
#btn-price:hover{
   background-color: var(--mainBlue);
}
.form-price{

   
    height: 2rem;
    display: flex; 
    flex-direction: row;
    justify-content:center;
    
    padding: 0;
}
`;






