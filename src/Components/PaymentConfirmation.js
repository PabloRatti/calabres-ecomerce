import React from 'react';
import Title from './Title';
import styled from 'styled-components';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
export default class PaymentConfirmation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.location.state.name,
            total: this.props.location.state.total,
            products: this.props.location.state.products,
            token: '',
            tokenRequestKeySandbox: '41cbc74acc604a109157bb8394561d27',
            tokenForPaymentSandbox: '1fb6dc55c0a1489db411a8ee8f9c9707',
            tokenForConfirmacionPagoSandbox: '1fb6dc55c0a1489db411a8ee8f9c9707',
            loadingTransaction: false,
            paymentId: '',
            displayMsg: false,
            message: '',
            paymentAproved: false,
            buttonDisabled: false
        }

    }

    componentDidMount = () => {
        scroll.scrollToTop();
        //scroll.scrollTo(800)
    }

    guardarVenta = () => {
        const { name, phone,
            cuotas, total, products,
            userEmail, dir_Remitente,
            localidad, postalCode, identity_number } = this.props.location.state;

        let fetchData = {
            method: "POST",
            headers: {
                "mode": 'cors',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                total: total,
                cuotas: cuotas,
                dir_Remitente: dir_Remitente,
                userEmail: userEmail,
                localidad: localidad,
                postalCode: postalCode,
                phone: phone,
                products: products,
                identity_number: identity_number,


            })
        }
        //Hacer el update
        fetch('http://localhost:4000/notes/guardarVenta', fetchData)
            .then(response => {
                console.log(response.status);
                return response;
            })
            .then(json => {
                console.log('Respuesta de save venta : ');
                console.log(json);
                if (json.status === 200) {
                    console.log('Venta guardada !')
                } else {
                    console.log('Error al guardar la venta');
                };
                return json;
            });

            
    }



    generarTokenRequest = () => {
        const {
            expiry } = this.props.location.state;

        this.setState({ loadingTransaction: true })
        let expirationMonth = expiry.slice(0, 2);
        let expirationYear = expiry.slice(2, 4);

        console.log('Expitation : ' + expiry);
        console.log('Expiration month : ' + expirationMonth);
        console.log('Expiration year : ' + expirationYear);
        let cardHolderId = {
            type: "dni",
            number: "35043330"
        }
        let fetchData = {
            mode: 'cors',
            method: "POST",
            headers: {
                "apiKey": this.state.tokenRequestKeySandbox,
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            },
            body: JSON.stringify({

                card_number: "4507990000004905",
                card_expiration_month: "07",
                card_expiration_year: "25",
                security_code: "223",
                card_holder_name: "Ratti Pablo",
                card_holder_identification: cardHolderId


            })
        }

        return fetchData;
    }
    solicitarToken = () => {

        let tokenRequest = this.generarTokenRequest();
        console.log('Request generated for request token ');
        console.log(tokenRequest);
        let tokenId = '';
        //Hacer el update
        fetch('https://developers.decidir.com/api/v2/tokens', tokenRequest)
            .then(function (res) {
                console.log('Loading /token.....')
                return res.json()
            })
            .then((data) => {
                tokenId = data.id;
                this.setState({ token: tokenId });
            }).then(() => {
                console.log('Token en llamada a solicitarToken: ' + this.state.token)

            }).catch(function (err) {
                console.log(err)
            })

        return null;
    }

    generarPaymentRequest = () => {
        const { cuotas } = this.props.location.state;
        let transactionId = Math.floor(Math.random() * (99999999 - 1) + 1);
        let request = {
            mode: 'cors',
            method: "POST",
            headers: {
                "apiKey": this.state.tokenForPaymentSandbox,
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            },
            body: JSON.stringify({
                site_transaction_id: transactionId.toString(), //Cambiar esto por id del ticket, desarrollar
                token: this.state.token,
                payment_method_id: 1,
                bin: '450799',
                amount: 2000, //La API espera un numero 
                currency: "ARS",
                installments: parseInt(cuotas), //La API espera un numero no string
                description: "",
                payment_type: "single",
                sub_payments: []
            })
        }
        return request;

    }

    ejecucionPreAutorizacion = () => {
        let paymentId = '';
        this.solicitarToken();

        setTimeout(() => {
            let paymentRequest = this.generarPaymentRequest();
            console.log(paymentRequest);
            console.log('Token desde ejecucion preAutorizacion : ' + this.state.token);
            fetch('https://developers.decidir.com/api/v2/payments', paymentRequest)
                .then(function (res) {
                    console.log('Loading /payments.....');
                    return res.json()
                })
                .then((data) => {

                    console.log('Data from payment endpoint:');
                    console.log(data.id)
                    paymentId = data.id;
                    console.log('Payment Id preAutorizacion : ' + paymentId);
                    this.setState({ paymentId: paymentId })
                    return paymentId;
                }).catch(function (err) {
                    console.log(err.json())
                })
        }, 3000);

        return null;
    }
    ejecutarPago = () => {
        let paymentConfirmationRequest = {
            mode: 'cors',
            method: "PUT",
            headers: {
                "apiKey": this.state.tokenForConfirmacionPagoSandbox,
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            },
            body: JSON.stringify({
                amount: 2100
            })
        }
        console.log('Payment id for final confirmation : ' + this.state.paymentId);
        fetch('https://developers.decidir.com/api/v2/payments/' + this.state.paymentId, paymentConfirmationRequest)
            .then(function (res) {
                console.log('Procesando pago final....')
                console.log(res);
                if (res.status == '400') {
                    console.log('Arrojando exepcion');
                    throw "Exception 400";
                }
                return res.json()
            })
            .then((data) => {

                console.log('Data from payment confirmation PUT endpoint:');
                console.log(data)
                console.log('Finalizando el flujo');
                this.setState({ loadingTransaction: false })
            }).catch((err) => {
                console.log('Error :' + err)
                alert('Verifique los datos de la tarjeta');
                this.setState({ displayMsg: true, message: 'Datos invalidos, por favor intente nuevamente' })
                this.setState({ loadingTransaction: false })
            })
    }

    submitHandler = () => {
        scroll.scrollToTop();
        this.setState({ buttonDisabled : false })
        this.guardarVenta();
        /*
        try {

            this.ejecucionPreAutorizacion();
            setTimeout(() => {
                console.log('Ejecutando pago');
                this.ejecutarPago();
            }, 10000);
            this.setState({paymentAproved : true ,displayMsg: true, message: 'Pago realizado exitosamente!' })
        } catch (e) {
            //alert('Verifique los datos de la tarjeta');
            // this.setState({ loadingTransaction: false })

            console.log('Exception catched');
            console.log(e);
        }

        */
        //guardarVenta();//Guarda el ticket en el BE para luego despacharlo

    }

    render() {
        const { number, expiry, name, phone, cuotas, total, products, userEmail, dir_Remitente, localidad, postalCode, identity_number } = this.props.location.state;
        return (
            <PaymentConfirmationContainer>
                <Title name="Confirmar " title="pago" />
                {!this.state.loadingTransaction ?
                    <div className="info-container">


                        <div class="product-container">

                            {products.map((item) => {
                                return (
                                    <Card id="my-card" style={{ width: '14rem', margin: '0 auto', display: 'inline-block' }}>
                                        <Card.Img variant="top" src={item.img} />
                                        <Card.Body>
                                            <Card.Title>{item.company.toUpperCase()} {item.title}</Card.Title>
                                            <Card.Title>Unidades : {item.count}</Card.Title>
                                            <Card.Title>Valor : ${item.total}</Card.Title>

                                        </Card.Body>
                                    </Card>

                                );
                            })}
                        </div>

                        <div id="card-container" >

                            <h3>Datos de la compra</h3>
                            <div>Numero de tarjeta : {number}</div>
                            <div>Vencimiento : {expiry}</div>
                            <div>Titular : {name}</div>
                            <div>DNI : {identity_number}</div>
                            <div>Contacto del titular : {phone}</div>
                            <div>Email del titular : {userEmail}</div>
                            <div>Localidad : {localidad}</div>
                            <div>Codigo postal : {postalCode}</div>
                            <div>Sucursal a recibir : {dir_Remitente}</div>
                            <div>Cuotas : {cuotas}</div>
                            <div>Total : ${total}</div>

                        </div>

                        {this.state.displayMsg ? <h5 className="msg" >{this.state.message}</h5> : null}

                        <div id="submit-btn-container" class="container">

                            <button disabled={this.state.buttonDisabled} type="submit" className="submit-btn" class="btn-primary mr-2 mt-3" onClick={() => this.submitHandler()}>Aceptar</button>
                            {console.log('------------->', this.state.paymentAproved)}
                            {this.state.paymentAproved ?
                                <Link to="/">
                                    <button type="submit" className="submit-btn" class="btn-danger mr-2 mt-3 ">Finalizar</button>
                                </Link>                              
                                : 
                                <Link to="/cart">
                                    <button type="submit" className="submit-btn" class="btn-danger mr-2 mt-3 ">Volver</button>
                                </Link>
                                }



                        </div>



                    </div>



                    : <div className="spinner">
                        <Loader
                            type="Grid"
                            color="#00BFFF"
                            height={100}
                            width={100}
                            timeout={0}
                        />
                    </div>}


            </PaymentConfirmationContainer >
        );
    }
}


const PaymentConfirmationContainer = styled.div`

width: 100%;
margin-bottom: 3rem;
text-align:center;
margin: 0 auto;
min-height:25rem;
.msg{

    margin-top:2rem;
    color:red;
}
.spinner{
    margin-top:5rem;
}
#submit-btn-container{
    margin: 0 auto;
    text-align: center;    
    padding:2rem;
}
#card-container{
    border: 5px solid var(--mainBlue) !important;
    width: 20rem;
    height: 100%;
    margin: 0 auto;
    margin-top: 2rem;
    border-radius: 2rem ;
    box-shadow: 5px 10px #888888;
    text-align:center;
    
}

.product-container{
    
    padding: 2rem;
    margin-bottom: 2rem;
    width: 100%; 
    margin: 0 auto;
    text-align:center;  
    max-width: 100%;
    
}
.img-container{
border: 2px solid red;
width:30%;

float:right;
}
.product-description{
    border: 2px solid blue;
    width: 25%;
}
.img{
    width: 30%;
}

`;