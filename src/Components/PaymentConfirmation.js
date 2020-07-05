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
            buttonDisabled: false,
            paymentMethodId: '',
            error: ''
           
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
        const { name, identity_number, number, expiry, cvc } = this.props.location.state;

        this.setState({ loadingTransaction: true })
        let expirationMonth = expiry.slice(0, 2);
        let expirationYear = expiry.slice(2, 4);

        console.log('Expitation : ' + expiry);
        console.log('Expiration month : ' + expirationMonth);
        console.log('Expiration year : ' + expirationYear);
        let cardHolderId = {
            type: "dni",
            number: identity_number
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

                card_number: '4507990000004905',
                card_expiration_month: expirationMonth,
                card_expiration_year: expirationYear,
                security_code: cvc,
                card_holder_name: name,
                card_holder_identification: cardHolderId
            })
        }

        return fetchData;
    }
    solicitarToken = (callback) => {


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
                if (data.status === 'active') {
                    tokenId = data.id;
                    this.setState({ token: tokenId });
                    console.log('Token recuperado: ' + this.state.token)
                    callback();
                } else {
                    throw data;
                }
            }).catch((err) => {
                console.log('Lanzando desde /tokens');
                this.errorHandler(err);
                throw err;
            })

    }

    generarPaymentRequest = () => {
        const { cuotas, number, total } = this.props.location.state;
        let totalAmount = parseInt(total);
        let bin = number.slice(0, 6);

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
                bin: '450799', //-------------------------->
                amount: totalAmount, //La API espera un numero 
                currency: "ARS",
                installments: parseInt(cuotas), //La API espera un numero no string
                description: "",
                payment_type: "single",
                sub_payments: []
            })
        }
        return request;

    }

    ejecucionPreAutorizacion = (callback) => {
        let paymentId = '';
        let paymentRequest = this.generarPaymentRequest();
        fetch('https://developers.decidir.com/api/v2/payments', paymentRequest)
            .then(function (res) {
                console.log('Loading /payments.....');
                return res.json()
            })
            .then((data) => {
                console.log(data);
                if (data.status !== 'pre_approved') {
                    let error = data.status_details.error.reason.description;
                    throw error;
                } else {
                    paymentId = data.id;
                    console.log('Payment Id obtenido de la preAutorizacion : ' + paymentId);
                    this.setState({ paymentId: paymentId })
                    callback();
                    return data;
                }

            }).catch((err) => {
                console.log('Lanzando desde preAutorizacion')
                this.errorHandler(err);
                throw err;
            })



    }

    finalPaymentRequestGenerator = () => {
        const { total } = this.props.location.state;
        let totalAmount = parseInt(total);
        let paymentConfirmationRequest = {
            mode: 'cors',
            method: "PUT",
            headers: {
                "apiKey": this.state.tokenForConfirmacionPagoSandbox,
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            },
            body: JSON.stringify({
                amount: totalAmount
            })
        }
        return paymentConfirmationRequest;
    }

    ejecutarPago = () => {
        let paymentConfirmationRequest = this.finalPaymentRequestGenerator();

        console.log('Final payment request');
        console.log(paymentConfirmationRequest);
        console.log('Payment id for final confirmation : ' + this.state.paymentId);
        setTimeout(() => {
            fetch('https://developers.decidir.com/api/v2/payments/' + this.state.paymentId, paymentConfirmationRequest)
                .then(function (res) {

                    console.log('Procesando pago final....')
                    console.log(res);
                    return res.json()
                })
                .then((data) => {
                    if (data.status === 'approved') {
                        console.log('Data del pago final:');
                        console.log(data)
                        console.log('Pago realizado con exito')
                        this.setState({ loadingTransaction: false, paymentAproved: true, displayMsg: true, message: 'Pago realizado exitosamente!', buttonDisabled: true })
                    } else {
                        throw 'Tarjeta de credito rechazada';
                    }

                }).catch((err) => {
                    console.log('Pago fallido, lanzando desde pago final : ');
                    this.errorHandler(err);
                    throw err;
                })
        }, 3000);

    }

    translateError = (error) => {
        let translatedError = error;
        switch (error) {
            case 'card_expiration_month':
                translatedError = 'Verifique mes de vencimiento';
                break;
            case 'expired card':
                translatedError = 'Tarjeta vencida';
                break;
        }
        this.setState({ error: translatedError })
        return translatedError;
    }

    errorHandler = (error) => {
        let auxError = error;
        console.log('Handling error')
        if (error.error_type === 'invalid_request_error') {
            let errorDescription = error.validation_errors[0].param;
            let spanishError = this.translateError(errorDescription);
            console.log('Error por datos inválidos : ' + spanishError);
            auxError = spanishError;

        }
        if (error.error_type === 'not_found_error') {
            console.log('Payment id expiro');
            auxError = 'Payment id expiro';
        }
        if (error.status) {
            error.status = 504 ? this.setState({ error: 'Verifique su conexion a internet' }) : null;
        }
        console.log(auxError)

        this.setState({ displayMsg: true, message: 'Error : ' + auxError })
        this.setState({ loadingTransaction: false })
    }


    submitHandler = () => {
        scroll.scrollToTop();
       
        //this.guardarVenta();

        this.solicitarToken(() => {
            this.ejecucionPreAutorizacion(() => this.ejecutarPago());
        });



        //guardarVenta();//Guarda el ticket en el BE para luego despacharlo

    }

    render() {
        const { number, expiry, name, phone, cuotas, total, products, userEmail, dir_Remitente, localidad, postalCode, identity_number } = this.props.location.state;
        return (
            <PaymentConfirmationContainer>

                {!this.state.loadingTransaction ?
                    <div className="info-container">


                        <div class="product-container">
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
                                {this.state.displayMsg ? <h5 className="msg" >{this.state.message}&nbsp;{this.state.error}</h5> : null}

                                <div id="submit-btn-container" class="container">

                                    <button disabled={this.state.buttonDisabled} type="submit" className="submit-btn" class="btn-primary mr-2 mt-3" onClick={() => this.submitHandler()}>Aceptar</button>

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


                            {products.map((item) => {
                                return (
                                    <Card id="my-card" style={{ width: '14rem', margin: '0 auto', display: 'inline-block' }}>
                                        <Card.Img id="card-img" variant="top" src={item.img} />
                                        <Card.Body id="card-body">
                                            <Card.Title>{item.company.toUpperCase()} {item.title}</Card.Title>
                                            <Card.Title>Unidades : {item.count}</Card.Title>
                                            <Card.Title>Valor : ${item.total}</Card.Title>

                                        </Card.Body>
                                    </Card>

                                );
                            })}
                        </div>
                    </div>
                    : <div className="spinner">
                        <div id="loader">
                            <Loader
                                type="Grid"
                                color="#00BFFF"
                                height={100}
                                width={100}
                                timeout={0}

                            />
                        </div>

                    </div>
                }


            </PaymentConfirmationContainer >
        );
    }
}


const PaymentConfirmationContainer = styled.div`

width: 100%;
text-align:center;
height: 100%;

.msg{   
    color:red;
}
.spinner{
   border:2px solid white;
   height:25rem;
}
#loader{
   
    margin-top:10rem;
}
#submit-btn-container{
    margin-bottom: 1rem !important;
    text-align: center;    
    margin:0 auto;
}
#card-container{
    border: 5px solid var(--mainBlue) !important;
    width: 20rem;

    margin-top: 3rem;
    border-radius: 2rem ;
    box-shadow: 5px 10px #888888;
    float:left;
    display:inline-block;
    
}

.product-container{
    
    padding: 2rem;  
    margin: 0 auto;
    text-align:center;  
  
    
}
#my-card{
    border:2px solid white;
    margin-left: 1rem !important;
    min-height: 50%;
    max-height: 50%;  
    margin-top: 4rem !important;
      
}
#card-img{     
     max-height:13rem;
     min-height:13rem;
}
#card-body{
     border: 2px solid white;
     max-height:10rem;
     min-height:10rem;
}
@media (max-width: 48em) {
   height:100%;
    #my-card{
        margin-top: 3rem !important;
        margin-left: 0rem !important;
        min-width: 50%;
        max-width: 50%;  
    }
    #card-container{
        margin-left: 0.7rem;
    }
}
 }
`;