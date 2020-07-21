import React from 'react';
import Cards from 'react-credit-cards';
import styled from 'styled-components';
import Title from './Title';
import 'react-credit-cards/es/styles-compiled.css';
import { Link } from 'react-router-dom';
import { Dropdown, Button } from 'react-bootstrap';
import { animateScroll as scroll } from 'react-scroll';
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
            postalCode: '',
            isBank: false,
            totalConIntereses: this.props.location.state.total,
            cart: this.props.location.state.cart,
            paymentMethod: ''
            
        };
    }


    componentDidMount() {
        scroll.scrollToTop();
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
        let interes = '';
        let totalConIntereses = '';

        if (this.state.isBank) {

            switch (this.state.cuotas) {
                case '3':
                    valor = nextProps.total / 3;
                    break;
                case '6':
                    interes = (nextProps.total * 18) / 100;
                    totalConIntereses = parseFloat(nextProps.total) + parseFloat(interes);
                    valor = totalConIntereses / 6;
                    break;
                case '12':
                    valor = nextProps.total / 12;
                    break;
                default:
                    valor = '';
            }

        } else {
            switch (this.state.cuotas) {
                case '3':
                    interes = (nextProps.total * 25) / 100;
                    totalConIntereses = parseFloat(nextProps.total) + parseFloat(interes);
                    valor = totalConIntereses / 3;
                    break;
                case '6':
                    interes = (nextProps.total * 45) / 100;
                    totalConIntereses = parseFloat(nextProps.total) + parseFloat(interes);
                    valor = totalConIntereses / 6;
                    break;
                default:
                    valor = '';
            }
        }
        this.setState({ valorCuota: valor, totalConIntereses: totalConIntereses })

    }


    handleSubmit = (e) => {
        e.preventDefault();

        console.log('Credit Card Request: ')
        console.log('Name : ' + this.state.name);
        console.log('Number : ' + this.state.number);
        console.log('Expiry : ' + this.state.expiry);
        console.log('Code : ' + this.state.cvc);
        console.log('Total : ' + this.state.total);

        if (this.state.cuotas !== '') {
            this.setState({ continueDisabled: false });
        } else alert('Ingrese entidad de pago y cuotas');



    }

    render() {
        const totalSinIntereses = this.props.location.state.total;
        return (
            <PaymentFormContainer id="section1" title="section1" ref="test">
                <div id="PaymentForm">
                    <div id="titulo">
                        <Title name="Pago con " title="tarjeta" />

                    </div>

                    <form className="card-form" onSubmit={this.handleSubmit}>

                        <Cards acceptedCards={this.state.aceptedCards}
                            cvc={this.state.cvc}
                            expiry={this.state.expiry}
                            focused={this.state.focus}
                            name={this.state.name}
                            number={this.state.number}
                        />
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


                        <div id="btn-row" class="row">
                            <div id="btn-col" class="col">
                                <Dropdown className="dropdown-container">
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Entidades
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => this.setState({ isBank: false, valorCuota: '', cuotas: '', totalConIntereses: totalSinIntereses, paymentMethod: '24' })}>Naranja (Plan Z)</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.setState({ isBank: false, valorCuota: '', cuotas: '', totalConIntereses: totalSinIntereses, paymentMethod: '24' })}>Naranja Visa</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.setState({ isBank: false, valorCuota: '', cuotas: '', totalConIntereses: totalSinIntereses, paymentMethod: '103' })}>Fava</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.setState({ isBank: false, valorCuota: '', cuotas: '', totalConIntereses: totalSinIntereses, paymentMethod: '103' })}>Fava Cabal</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.setState({ isBank: false, valorCuota: '', cuotas: '', totalConIntereses: totalSinIntereses, paymentMethod: '0' })}>Clipper Cabal</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.setState({ isBank: false, valorCuota: '', cuotas: '', totalConIntereses: totalSinIntereses, paymentMethod: '43' })}>Cencosud Mastercard</Dropdown.Item>

                                        <Dropdown.Item onClick={() => this.setState({ isBank: true, valorCuota: '', cuotas: '', totalConIntereses: totalSinIntereses, paymentMethod: '1' })}>Tarjeta de banco Visa</Dropdown.Item>

                                    </Dropdown.Menu>
                                </Dropdown>

                            </div>
                            <div id="btn-col" class="col">

                                <Dropdown className="dropdown-container">
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Cuotas
                                    </Dropdown.Toggle>
                                    {this.state.isBank ?
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => this.setState({ cuotas: '3', totalConIntereses: totalSinIntereses, valorCuota: totalSinIntereses / 3 })}>3 Sin interes</Dropdown.Item>
                                            <Dropdown.Item onClick={() => {
                                                let intereses = (totalSinIntereses * 18) / 100;
                                                let totalConIntereses = parseFloat(totalSinIntereses) + parseFloat(intereses);
                                                console.log('Total con intereses : ' + totalConIntereses);
                                                this.setState({ cuotas: '6', totalConIntereses: totalConIntereses, valorCuota: totalConIntereses / 6 });
                                            }}>6 Cuotas fijas</Dropdown.Item>
                                            <Dropdown.Item onClick={() => this.setState({ cuotas: '12', totalConIntereses: totalSinIntereses, valorCuota: totalSinIntereses / 12 })}>12 Sin interes</Dropdown.Item>
                                        </Dropdown.Menu>
                                        :
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => {
                                                let intereses = (totalSinIntereses * 25) / 100;
                                                let totalConIntereses = parseFloat(totalSinIntereses) + parseFloat(intereses);
                                                this.setState({ cuotas: '3', totalConIntereses: totalConIntereses, valorCuota: totalConIntereses / 3 })
                                            }}>3 (Cuotas fijas)</Dropdown.Item>
                                            <Dropdown.Item onClick={() => {
                                                let intereses = (totalSinIntereses * 45) / 100;
                                                let totalConIntereses = parseFloat(totalSinIntereses) + parseFloat(intereses);
                                                this.setState({ cuotas: '6', totalConIntereses: totalConIntereses, valorCuota: totalConIntereses / 6 })
                                            }}>6 (Cuotas fijas)</Dropdown.Item>
                                        </Dropdown.Menu>}
                                </Dropdown>

                            </div>


                            <div id="btn-col" class="col">
                                <Button type="submit" variant="success">Validar datos</Button>
                            </div>


                        </div>
                        <br />
                        <div className="row">
                            <div id="totales-col" class="col">
                                Medio de pago : {this.state.isBank ? 'Credito bancario' : 'Otros'}
                                <br />
                                Total : ${this.state.totalConIntereses}
                                <br />
                                Pagos : {this.state.cuotas}
                                <br />
                                Metodo de pago : {this.state.paymentMethod}
                                <br />
                                Valor de la cuota : ${this.state.valorCuota !== '' ? this.state.valorCuota.toFixed(2) : null}
                                <br />
                                <div id="btn-continue">
                                    <Link to={{
                                        pathname: '/paymentConfirmation',
                                        state: {
                                            cvc: this.state.cvc,
                                            expiry: this.state.expiry,
                                            name: this.state.name,
                                            number: this.state.number,
                                            phone: this.state.phone,
                                            cuotas: this.state.cuotas,
                                            total: this.state.totalConIntereses,
                                            products: this.state.cart,
                                            localidad: this.state.localidad,
                                            dir_Remitente: this.state.dir_Remitente,
                                            userEmail: this.state.userEmail,
                                            postalCode: this.state.postalCode,
                                            identity_number: this.state.identity_number,
                                            paymentMethodId: this.state.paymentMethod
                                        }
                                    }} >
                                        <Button disabled={this.state.continueDisabled} variant="success">Continuar</Button>
                                    </Link>
                                </div>
                            </div>




                        </div>

                    </form>

                </div >
            </PaymentFormContainer >
        );
    }
}

const PaymentFormContainer = styled.div`

text-align:center;
margin: 0 auto;
#PaymentForm{
    border: 2px solid white;
    height:100%;
}
.aceptar-btn{
    margin-right: 2rem;
}

#titulo{
    margin-top:6rem !important;
    height:5rem;
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
}
.col{
    margin-top: 1rem;
}
#btn-continue{
    margin-top: 1rem;    
}

 @media (max-width: 48em) {
    #btn-col{     
         padding: 0.5rem;
         width: 30%;
    }
#btn-row{
    text-align:center;  
    }
.aceptar-btn{
     margin-right: 0rem;
    }
#totales-col{
    width:30%;
    }
}
` ;


