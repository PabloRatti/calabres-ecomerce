import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CartTotals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formHidden: true
        }

    }

 



    render() {
        const { cartSubtotal, cartTotal, clearCart, cart } = this.props.value;
        return (

            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                            <Link to="/">
                                <button className="btn btn-outline-danger text-uppercase mb-3 px-5"
                                    type="button" onClick={() => clearCart()}>
                                    vaciar carrito
                            </button>
                            </Link>

                            <Link to={{
                                pathname: '/paymentForm',
                                state: {
                                    total: cartTotal,
                                    cart: cart
                                }
                            }}
                            >
                                <button className="btn btn-outline-success text-uppercase mb-3 px-5"
                                    type="submit">
                                    Pagar con tarjeta
                            </button>
                            </Link>
                            <h5>
                                <span>
                                    subtotal :
                            </span>
                                <strong>$ {cartSubtotal}</strong>
                            </h5>

                            <h5>
                                <span>
                                    total :
                            </span>
                                <strong>$ {cartTotal}</strong>
                            </h5>
                        </div>
                    </div>
                    {/*}
                    <div hidden={this.state.formHidden}>
                        <PaymentForm cartItems={cart} formHidden={this.state.formHidden} total={cartTotal} />
        </div>*/}

                </div>
            </React.Fragment>


        )
    }
}