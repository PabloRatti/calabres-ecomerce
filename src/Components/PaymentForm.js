import React from 'react';
import Cards from 'react-credit-cards';
import styled from 'styled-components';
import Title from './Title';
import 'react-credit-cards/es/styles-compiled.css';
import { Link } from 'react-router-dom';
import { Dropdown, Button } from 'react-bootstrap';

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
            localidad: '',
            dir_Remitente: '',
            userEmail: '',
            continueDisabled: true,
            valorCuota: '',
            postalCode: ''
        };
    }




    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    }

    //Esto es por si una vez seleccionadas las cuotas el usuario decide sumar el numero de items, el valor de las cuotas debe actualziarse
    //acorde al valor total que se pasa por props
    componentWillReceiveProps(nextProps) {
        let valor = '';
        if (this.state.cuotas) {
            switch (this.state.cuotas) {
                case '3':
                    valor = nextProps.total / 3;
                    break;
                case '6':
                    valor = (nextProps.total * 18) / 100;
                    break;
                case '12':
                    valor = nextProps.total / 12;
                    break;
            }

            this.setState({ valorCuota: valor })
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();

        console.log('Credit Card Request: ')
        console.log('Name : ' + this.state.name);
        console.log('Number : ' + this.state.number);
        console.log('Expiry : ' + this.state.expiry);
        console.log('Code : ' + this.state.cvc);
        console.log('Total : ' + this.state.total);

        this.setState({ continueDisabled: false })


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
                                <input
                                    className="form-input"
                                    type="tel"
                                    name="userEmail"
                                    class="form-control"
                                    placeholder="Email"
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
                                    name="localidad"
                                    class="form-control"
                                    placeholder="Provincia / Ciudad"
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                    required
                                />
                            </div>
                            <div class="col">
                                <input
                                    className="form-input"
                                    type="tel"
                                    name="dir_Remitente"
                                    class="form-control"
                                    placeholder="Direccion de sucursal OCA en la que retira"
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
                                    name="postalCode"
                                    class="form-control"
                                    placeholder="Codigo Postal"
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                    required
                                />
                            </div>
                            <div class="col">
                                <input
                                    className="form-input"
                                    type="tel"
                                    name="identity_number"
                                    class="form-control"
                                    placeholder="Numero de documento"
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                    required
                                />
                            </div>
                        </div>


                        <div class="row">
                            <div class="col">
                                Total : ${this.props.total}
                                <br />
                                Pagos : {this.state.cuotas}
                                <br />
                                Valor de la cuota : ${this.state.valorCuota ? this.state.valorCuota.toFixed(2) : null}
                                <br />

                            </div>
                            <div class="col">
                                <Dropdown className="dropdown-container">
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Cuotas
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => this.setState({ cuotas: '3', valorCuota: this.props.total / 3 })}>3 (Sin interes)</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.setState({ cuotas: '6', valorCuota: (this.props.total * 18) / 100 })}>6 (+18%)</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.setState({ cuotas: '12', valorCuota: this.props.total / 12 })}>12 (sin interes)</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                            </div>
                            <div class="col">
                                <div >
                                    <Button className="aceptar-btn" type="submit" variant="success">Aceptar</Button>

                                    <Link to={{
                                        pathname: '/paymentConfirmation',
                                        state: {
                                            cvc: this.state.cvc,
                                            expiry: this.state.expiry,
                                            name: this.state.name,
                                            number: this.state.number,
                                            phone: this.state.phone,
                                            cuotas: this.state.cuotas,
                                            total: this.props.total,
                                            products: this.props.cartItems,
                                            localidad: this.state.localidad,
                                            dir_Remitente: this.state.dir_Remitente,
                                            userEmail: this.state.userEmail,
                                            postalCode: this.state.postalCode,
                                            identity_number: this.state.identity_number
                                        }
                                    }} >
                                        <Button disabled={this.state.continueDisabled} variant="success">Continuar</Button>
                                    </Link>

                                </div>


                            </div>
                        </div>
                        <br />


                    </form>

                </div >
            </PaymentFormContainer >
        );
    }
}

const PaymentFormContainer = styled.div`

text-align:center;
margin: 0 auto;

.aceptar-btn{
    margin-right: 2rem;
}
.dropdown-container{
    margin: 0 auto;
    width: 40% !important;
}

p{
    float: left;
}
label{
    margin-left: 1rem;
}

#cuota{
    margin-left: 3rem !important;
}
.card-form{
     padding: 2rem;
  
    margin-top: 2rem;
    height: 100%;

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