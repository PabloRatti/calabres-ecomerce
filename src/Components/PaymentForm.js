import React from 'react';
import Cards from 'react-credit-cards';
import styled from 'styled-components';
import Title from './Title';
import 'react-credit-cards/es/styles-compiled.css';

export default class PaymentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cvc: '',
            expiry: '',
            focus: '',
            name: '',
            number: '',
            aceptedCards: ['mastercard', 'visa'],
            total: this.props.total
        };
    }

    componentDidMount() {
        console.log('Inside paymentForm mounted: ' + this.props.formHidden)
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
                        <div className="input-container">
                            <input
                                className="form-input"
                                type="tel"
                                name="name"
                                placeholder="Nombre y apellido"
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                            />
                            <input
                                className="form-input"
                                type="tel"
                                name="number"
                                placeholder="Numero de tarjeta"
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                            />
                            <input
                                className="form-input"
                                type="tel"
                                name="expiry"
                                placeholder="Fecha de vencimiento"
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                            />
                            <input
                                className="form-input"
                                type="tel"
                                name="cvc"
                                placeholder="Codigo de seguridad"
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                            />
                            <br />
                            <button id="submit-btn" className="btn-primary">Aceptar</button>

                        </div>

                    </form>
                </div>
            </PaymentFormContainer>
        );
    }
}

const PaymentFormContainer = styled.div` 
padding: 1rem;

.card-form{
  
    margin: 0 auto;
    margin-top: 3rem;
    margin-bottom: 2rem;
    text-align:center;
}

#submit-btn{
    margin-top: 2rem;
}
.input-container{
    padding: 2rem;
    border: 3px solid var(--mainBlue);
    border-radius: 2rem;
    width:70%;
    margin: 0 auto;
    text-align:center !important;
}

.form-input{

}


@media screen and (max-width: 300px) {
.form-input{
    margin-right: rem !important;

}

}
` ;