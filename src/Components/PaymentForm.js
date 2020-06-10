import React from 'react';
import Cards from 'react-credit-cards';
import styled from 'styled-components';
import Title from './Title';
import 'react-credit-cards/es/styles-compiled.css';
import { Link } from 'react-router-dom';
export default class PaymentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cvc: '',
            expiry: '',
            focus: '',
            name: '',
            number: '',
            phone: '',
            cuotas: '',
            aceptedCards: ['mastercard', 'visa', 'cabal'],
            total: this.props.total,
            products: this.props.cartItems
        };
    }

    componentDidMount() {

    }
    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        console.log('Credit Card Request: ')
        console.log('Name : ' + this.state.name);
        console.log('Number : ' + this.state.number);
        console.log('Expiry : ' + this.state.expiry);
        console.log('Code : ' + this.state.cvc);
        console.log('Total : ' + this.state.total);


    }

    render() {
        return (
            <PaymentFormContainer id="section1" title="section1" ref="test">

                <Title name="Pago con " title="Credito bancario" />
                <div id="PaymentForm">
                    <Cards acceptedCards={this.state.aceptedCards}
                        cvc={this.state.cvc}
                        expiry={this.state.expiry}
                        focused={this.state.focus}
                        name={this.state.name}
                        number={this.state.number}
                    />
                    <form className="card-form" onSubmit={this.handleSubmit}>
                        <div class="row">
                            <div class="col">
                                <input
                                    className="form-input"
                                    class="form-control"
                                    type="tel"
                                    name="name"
                                    placeholder="Nombre y apellido"
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                    required
                                />
                            </div>

                            <div class="col">
                                <input
                                    className="form-input"
                                    class="form-control"
                                    type="tel"
                                    name="number"
                                    placeholder="Numero de tarjeta"
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                    required
                                />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <input
                                    className="form-input"
                                    class="form-control"
                                    type="tel"
                                    name="expiry"
                                    placeholder="Fecha de vencimiento"
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                    required
                                />
                            </div>
                            <div class="col">
                                <input
                                    className="form-input"
                                    class="form-control"
                                    type="tel"
                                    name="cvc"
                                    placeholder="Codigo de seguridad"
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                    required
                                />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <input
                                    className="form-input"
                                    type="tel"
                                    name="phone"
                                    class="form-control"
                                    placeholder="Celular"
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                    required
                                />
                            </div>
                            <div class="col">
                                <div class="form-control">
                                    <p> Cuotas :
                                    <input type="checkbox" id="cuota" name="cuotas" value="3" onChange={this.handleInputChange}
                                            onFocus={this.handleInputFocus} />
                                        <label for="cuota"> 3</label>
                                        <input type="checkbox" id="cuota" name="cuotas" value="6" onChange={this.handleInputChange}
                                            onFocus={this.handleInputFocus} />
                                        <label for="cuota"> 6</label>
                                        <input type="checkbox" id="cuota" name="cuotas" value="12" onChange={this.handleInputChange}
                                            onFocus={this.handleInputFocus} />
                                        <label for="cuota"> 12</label>
                                        <input type="checkbox" id="cuota" name="cuotas" value="18" onChange={this.handleInputChange}
                                            onFocus={this.handleInputFocus} />
                                        <label for="cuota"> 18</label></p>

                                </div>
                            </div>


                        </div>
                        <div class="row">
                            <div class="col">
                                Total : ${this.state.total}
                            </div>
                        </div>
                        <br />

                        <Link to={{
                            pathname: '/paymentConfirmation',
                            state: {
                                cvc: this.state.cvc,
                                expiry: this.state.expiry,
                                name: this.state.name,
                                number: this.state.number,
                                phone: this.state.phone,
                                cuotas: this.state.cuotas,
                                total: this.state.total,
                                products: this.state.products
                            }
                        }} >
                            <button type="submit" id="submit-btn" class="btn-primary">Aceptar</button>
                        </Link>
                    </form>

                </div >
            </PaymentFormContainer >
        );
    }
}

const PaymentFormContainer = styled.div`
p{
    float: left;
}
label{
    margin-left: 1rem;
}
text-align:center;
margin: 0 auto;
#cuota{
    margin-left: 3rem !important;
}
.card-form{
     padding: 2rem;
  
    margin-top: 2rem;
    height: 20rem;

}
.col{

margin-top: 1rem;

}
` ;


/*


@media screen and (max-width: 300px) {
.form - input{
                        margin - right: rem !important;

}

}*/