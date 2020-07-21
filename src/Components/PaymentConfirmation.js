import React from 'react';

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
            token: '',
            tokenRequestKeySandbox: '96e7f0d36a0648fb9a8dcb50ac06d260',
            tokenForPaymentSandbox: '',
            tokenForConfirmacionPagoSandbox: '',
            loadingTransaction: false,
            paymentId: '',
            displayMsg: false,
            message: '',
            paymentAproved: false,
            buttonDisabled: false,
            paymentMethodId: this.props.location.state.paymentMethodId,
            error: '',
            installments : this.props.location.state.cuotas

        }

    }

    componentDidMount = () => {
        scroll.scrollToTop();
        //scroll.scrollTo(800)
    }

    crearVenta = () => {
        const { name, phone,
            cuotas, total, products,
            userEmail, dir_Remitente,
            localidad, postalCode, identity_number } = this.props.location.state;

        let venta = {
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
                identity_number: identity_number
                


            })
        }
        return venta;
    }
    guardarVenta = (venta) => {

        //Hacer el update
        fetch('http://localhost:4000/notes/guardarVenta', venta)
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


    submitHandler = (e) => {
        e.preventDefault();
        console.log('Submit handler triggered')
        console.log(e.target);
        let form = e.target;
        try {
            const publicApiKey = "96e7f0d36a0648fb9a8dcb50ac06d260";
            const urlSandbox = "https://developers.decidir.com/api/v2";
            //Para el ambiente de desarrollo
            let decidir = new window.Decidir(urlSandbox);
            //Se indica la public API Key
            decidir.setPublishableKey(publicApiKey);
            decidir.setTimeout(5000);//timeout de 5 segundos    
            decidir.createToken(form, this.sdkResponseHandler);

        } catch (e) {
            console.log('Error')
            console.log(e);
        }
    }
    paymentRequest = (response) => {
        const {total,name,paymentMethodId} = this.props.location.state;

        console.log('Response for build request');
        console.log(response);
        let req = {
            mode: 'cors',
            method: "POST",
            headers: {
                "apiKey": this.state.tokenRequestKeySandbox,
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            },                        
            body: JSON.stringify({
                token: response.id,
                bin: response.bin,
                card_expiration_month: response.expiration_month,
                card_expiration_year: response.expiration_year,         
                cardholder: response.cardholder,
                amount: total,
                name: name,
                installments: parseInt(this.state.installments),
                paymentMethodId: parseInt(paymentMethodId)
            })  
        }

        return req;
    }
    ejecutarPago = (req) => {
        console.log('Ejecutando pago request para el backend: ');
        console.log(req);
        fetch('http://localhost:4000/ejecutarPago', req)
            .then(response => {
                return response.json();
            })
            .then(json => {
                console.log('payment response')
                console.log(json)
                console.log(json.status);
                this.paymentResponseHandler(json);
            });
    }

    paymentResponseHandler = (resp) => {
        console.log('Final response (catching from BE)');
        if (resp.status == 'approved') {
            console.log('Aprovada!');
            this.setState({ message: 'Pago exitoso', displayMsg: true })
            window.location.replace('http://localhost:3000/Congrats');
        }
        if (resp.status == 'rejected'){
            console.log('Rechazada!');
            let error = resp.status_details.error.reason.description;
            this.setState({ message: error, displayMsg: true })
        }

        if (resp.error) {
            let error = resp.error.get(0);
            switch (error.param) {
                case 'expiry_date':
                    this.setState({ message: 'Fecha de vencimiento incorrecta', displayMsg: true });
                    break;
            }
        }

    }

    sdkResponseHandler = (status, response) => {
        console.log('In response handler , status : ' + status)
        console.log(response);
        let message = '';
        if (status !== 200 && status !== 201) {
            if (status == 503) {
                message = 'Servidor no disponible, intente en unos minutos';
            } else {
                if (response.error !== null) {
                    console.log('Response error captured');
                    let error = response.error[0];
                    console.log(error);
                    switch (error.error.message) {
                        case 'Expiry date is invalid':
                            message = 'Vencimiento incorrecto';
                            break;
                    }
                }
            }

            this.setState({ displayMsg: true, message: message });
        } else {
            let token = response.id;
            console.log('Token capturado : ' + token);
            let paymentRequest = this.paymentRequest(response);
            setTimeout(() => this.ejecutarPago(paymentRequest), 2000)
        }
    }

    render() {
        const { number, cvc, expiry, name, phone, cuotas, total, products, userEmail, dir_Remitente, localidad, postalCode, identity_number,paymentMethodId } = this.props.location.state;
        let expiryMonth = 10//expiry.substr(0, 2);
        let expiryYear = 23//expiry.substr(2, 2);
        return (
            <PaymentConfirmationContainer>

                {!this.state.loadingTransaction ?
                    <div className="info-container">


                        <div class="product-container">
                            <div id="card-container" >

                                <h3>Datos de la compra</h3> 
                                <div>Numero de tarjeta :    {number}</div>
                                <div>Vencimiento :          {expiry}</div>
                                <div>Titular :              {name}</div>
                                <div>DNI :                  {identity_number}</div>
                                <div>Contacto del titular : {phone}</div>
                                <div>Email del titular :    {userEmail}</div>
                                <div>Localidad :            {localidad}</div>
                                <div>Codigo postal :        {postalCode}</div>
                                <div>Sucursal a recibir :   {dir_Remitente}</div>
                                <div>Cuotas :               {cuotas}</div>
                                <div>Total : $              {total}</div>
                                {this.state.displayMsg ? <h5 className="msg" >{this.state.message}&nbsp;{this.state.error}</h5> : null}

                                <div id="submit-btn-container" class="container">
                                    <form id="formulario" method="post" action="" onSubmit={this.submitHandler}>
                                        <fieldset>
                                            <input hidden="true" type="text" data-decidir="card_holder_name" placeholder="TITULAR" value={name} />
                                            <input hidden="true" type="text" data-decidir="card_number" placeholder="XXXXXXXXXXXXXXXX" value={number} />
                                            <input hidden="true" type="text" data-decidir="security_code" placeholder="XXX" value={cvc} />
                                            <input hidden="true" type="text" data-decidir="card_expiration_month" placeholder="MM" value={expiryMonth} />
                                            <input hidden="true" type="text" data-decidir="card_expiration_year" placeholder="AA" value={expiryYear} />
                                            <input hidden="true" type="text" data-decidir="card_holder_doc_type" placeholder="AA" value="dni" />
                                            <input hidden="true" type="text" data-decidir="card_holder_doc_number" placeholder="XXXXXXXXXX" value={identity_number} />
                                            <input disabled={this.state.buttonDisabled} type="submit" value="Aceptar" id="submit-btn" class="btn-primary mr-2 mt-3" />
                                        </fieldset>
                                    </form>
                                    {this.state.paymentAproved ?
                                        <Link to="/">
                                            <button type="submit" id="submit-btn" class="btn-danger mr-2 mt-3 ">Finalizar</button>
                                        </Link>
                                        :
                                        <Link to="/cart">
                                            <button type="submit" id="back-btn" class="btn-danger mr-2 mt-3 ">Volver</button>
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
height: 40rem;

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
    height: 100%;
   
    max-height: 20% !important;  
}

#submit-btn{
   
    
}
#back-btn{
    
    margin: 0 auto;
    margin-left:1rem;
}
fieldset{

    max-width: 4.5rem;
}

#formulario{
    
    max-width: 4.5rem;
    margin: 0 auto;
    display: inline-block;
    
}
#card-container{
    border: 5px solid var(--mainBlue) !important;
    width: 20rem;
    height: 30%;
    margin-top: 5rem !important;
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
    max-height: 100%;  
    margin-top: 5rem !important;
      
}
#card-img{     
     max-height:50%;
     min-height:50%;
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
        float: none;
        margin-top: 7rem !important;
                   
    }
    .product-container{
        padding: 0 !important;
        
    }
}
 }
`;