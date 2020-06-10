import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PaymentForm from '../PaymentForm';
import { animateScroll as scroll } from 'react-scroll';
export default class CartTotals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formHidden: true
        }

    }

    creditFormVisibilityHandler = () => {
        this.setState({ formHidden: !this.state.formHidden }, this.state.formHidden ? scroll.scrollTo(418) : scroll.scrollToTop)

    }


    render() {
        const { cartSubtotal, cartTotal, clearCart , cart} = this.props.value;
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


                            <button className="btn btn-outline-success text-uppercase mb-3 px-5"
                                type="submit" onClick={() => this.creditFormVisibilityHandler()}>
                                Pagar con tarjeta
                            </button>

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
                    <div hidden={this.state.formHidden}>
                        <PaymentForm cartItems={cart} formHidden={this.state.formHidden} total={cartTotal} />
                    </div>

                </div>
            </React.Fragment>


        )
    }
}