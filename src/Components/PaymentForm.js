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
            postalCode: '',
            isBank: false,
            valorConRecargo: '2500'
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
                    valor='';
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
        this.setState({ valorCuota: valor })

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


                        <div id="btn-row" class="row">
                            <div id="btn-col" class="col">
                                <Dropdown className="dropdown-container">
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Entidades
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => this.setState({ isBank: false, valorCuota: '', cuotas: '', totalConIntereses: '' })}>Naranja (Plan Z)</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.setState({ isBank: false, valorCuota: '', cuotas: '', totalConIntereses: '' })}>Naranja Visa</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.setState({ isBank: false, valorCuota: '', cuotas: '', totalConIntereses: '' })}>Fava</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.setState({ isBank: false, valorCuota: '', cuotas: '', totalConIntereses: '' })}>Fava Cabal</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.setState({ isBank: false, valorCuota: '', cuotas: '', totalConIntereses: '' })}>Clipper Cabal</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.setState({ isBank: false, valorCuota: '', cuotas: '', totalConIntereses: '' })}>Cencosud Mastercard</Dropdown.Item>

                                        <Dropdown.Item onClick={() => this.setState({ isBank: true, valorCuota: '', cuotas: '', totalConIntereses: '' })}>Banco Frances</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.setState({ isBank: true, valorCuota: '', cuotas: '', totalConIntereses: '' })}>Banco Provincia</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.setState({ isBank: true, valorCuota: '', cuotas: '', totalConIntereses: '' })}>Otros bancos</Dropdown.Item>
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
                                            <Dropdown.Item onClick={() => this.setState({ cuotas: '3', valorConRecargo: this.props.total, valorCuota: this.props.total / 3 })}>3 Sin interes</Dropdown.Item>
                                            <Dropdown.Item onClick={() => {
                                                let intereses = (this.props.total * 18) / 100;
                                                let totalConIntereses = parseFloat(this.props.total) + parseFloat(intereses);
                                                console.log('Total con intereses : ' + totalConIntereses);
                                                this.setState({ cuotas: '6', valorConRecargo: totalConIntereses, valorCuota: totalConIntereses / 6 });
                                            }}>6 Cuotas fijas</Dropdown.Item>
                                            <Dropdown.Item onClick={() => this.setState({ cuotas: '12', valorConRecargo: this.props.total, valorCuota: this.props.total / 12 })}>12 Sin interes</Dropdown.Item>
                                        </Dropdown.Menu>
                                        :
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => {
                                                let intereses = (this.props.total * 25) / 100;
                                                let totalConIntereses = parseFloat(this.props.total) + parseFloat(intereses);
                                                this.setState({ cuotas: '3', valorConRecargo: totalConIntereses, valorCuota: totalConIntereses / 3 })
                                            }}>3 (Cuotas fijas)</Dropdown.Item>
                                            <Dropdown.Item onClick={() => {
                                                let intereses = (this.props.total * 45) / 100;
                                                let totalConIntereses = parseFloat(this.props.total) + parseFloat(intereses);
                                                this.setState({ cuotas: '6', valorConRecargo: totalConIntereses, valorCuota: totalConIntereses / 6 })
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
                                Total : ${this.state.valorConRecargo}
                                <br />
                                Pagos : {this.state.cuotas}
                                <br />

                                Valor de la cuota : ${this.state.valorCuota !== '' ? this.state.valorCuota.toFixed(2) : null}
                                <br />
                                <div id="btn-continue">
                                <Link  to={{
                                    pathname: '/paymentConfirmation',
                                    state: {
                                        cvc: this.state.cvc,
                                        expiry: this.state.expiry,
                                        name: this.state.name,
                                        number: this.state.number,
                                        phone: this.state.phone,
                                        cuotas: this.state.cuotas,
                                        total: this.state.valorConRecargo,
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


