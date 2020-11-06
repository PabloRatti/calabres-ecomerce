import React from "react";

import styled from "styled-components";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ReactPixel from "react-facebook-pixel";
export default class PaymentConfirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      //tokenRequestKeySandbox: '96e7f0d36a0648fb9a8dcb50ac06d260',
      tokenForPaymentSandbox: "",
      tokenForConfirmacionPagoSandbox: "",
      loadingTransaction: false,
      paymentId: "",
      displayMsg: false,
      message: "",
      paymentAproved: false,
      buttonDisabled: false,
      paymentMethodId: this.props.location.state.paymentMethodId,
      error: "",
      installments: this.props.location.state.cuotas,
    };
  }

  componentDidMount = () => {
    scroll.scrollToTop();
    const advancedMatching = { em: "some@email.com" }; // optional, more info: https://developers.facebook.com/docs/facebook-pixel/pixel-with-ads/conversion-tracking#advanced_match
    const options = {
      autoConfig: true, // set pixel's autoConfig
      debug: false, // enable logs
    };
    ReactPixel.init("1143009419162712", advancedMatching, options);    
  };

  crearVenta = () => {
    const {
      name,
      phone,
      cuotas,
      total,
      products,
      userEmail,
      dir_Remitente,
      localidad,
      postalCode,
      identity_number,
    } = this.props.location.state;

    let venta = {
      method: "POST",
      headers: {
        mode: "cors",
        Accept: "application/json",
        "Content-Type": "application/json",
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
      }),
    };
    this.guardarVenta(venta);
    return venta;
  };
  guardarVenta = (venta) => {
    //Hacer el update
    fetch("https://elcalabres.com.ar/notes/guardarVenta", venta)
      .then((response) => {
        console.log(response.status);
        return response;
      })
      .then((json) => {
        console.log("Respuesta de save venta : ");
        console.log(json);
        if (json.status === 200) {
          console.log("Venta guardada !");
          this.setState({ loadingTransaction: false });
        } else {
          console.log("Error al guardar la venta");
        }
        return json;
      });
  };

  submitHandler = (e) => {
    e.preventDefault();
    let form = e.target;
    try {
      scroll.scrollToTop();
      this.setState({ loadingTransaction: true });
      const publicApiKey = "7b9372c4617643f8956863442ae28378";
      //const privateApiKey = "8d2d4458c38d4e2cb563e2d4eb5c43dc";

      //const urlSandbox = "https://developers.decidir.com/api/v2";
      const urlProd = "https://live.decidir.com/api/v2";
      //Para el ambiente de desarrollo
      let decidir = new window.Decidir(urlProd);
      //Se indica la public API Key
      decidir.setPublishableKey(publicApiKey);
      
      decidir.setTimeout(5000); //timeout de 5 segundos
      decidir.createToken(form, this.sdkResponseHandler);
    } catch (e) {
        
      this.setState({
        message: "Error en el servicio, intente en unos minutos...",
        displayMsg: true,
        loadingTransaction: false
      });
    }
  };
  paymentRequest = (response) => {
    const { total, name, paymentMethodId } = this.props.location.state;
    let req = {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "http://live.decidir.com/api/v2",
        "access-control-allow-credentials" : "true"
        
      },
      body: JSON.stringify({
        token: response.id,
        bin: response.bin,
        card_expiration_month: response.expiration_month,
        card_expiration_year: response.expiration_year,
        cardholder: response.cardholder,
        amount: parseInt(total + "00"),
        name: name,
        installments: parseInt(this.state.installments),
        paymentMethodId: parseInt(paymentMethodId),
      }),
    };

    return req;
  };
  ejecutarPago = (req) => {
    console.log("Sending payment request with installments: ");
    console.log(req);

    fetch("https://elcalabres.com.ar/ejecutarPago", req)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
        debugger;
        this.paymentResponseHandler(json);
      });
  };

  paymentResponseHandler = (resp) => {
    console.log("Payment response handler: ");
    if (resp.status === "approved") {
      this.setState({
        message: "Pago exitoso",
        displayMsg: true,
        paymentDoneId: resp.id,
        buttonDisabled: true,
        paymentAproved: true,
        loadingTransaction: false,
      });
      this.crearVenta();
      ReactPixel.track('Purchase');
    }
    if (resp.status === "rejected") {
      let error = resp.status_details.error.reason.description;
      this.setState({
        message: error,
        displayMsg: true,
        loadingTransaction: false,
      });
    }

    if (resp.error) {
      let error = resp.error.get(0);
      switch (error.param) {
        case "expiry_date":
          this.setState({
            message: "Fecha de vencimiento incorrecta",
            displayMsg: true,
            loadingTransaction: false,
          });
          break;
        case "empty_card_number":
          this.setState({
            message: "Ingrese el numero de tarjeta",
            displayMsg: true,
            loadingTransaction: false,
          });
          break;
        default:
          return null;
      }
    }

    if (resp.validation_errors) {
      let error = resp.validation_errors[0];
      switch (error.param) {
        case "bin":
          this.setState({
            message:
              "El numero de tarjeta no corresponde a la entidad seleccionada",
            displayMsg: true,
            loadingTransaction: false,
          });
          break;
        case "payment_method_id":
          this.setState({
            message: "Numero de tarjeta invalido",
            displayMsg: true,
            loadingTransaction: false,
          });
          break;
        default:
          return null;
      }
    }
    // setTimeout(() => this.setState({ loadingTransaction: false }), 3000);
  };

  sdkResponseHandler = (status, response) => {
    console.log("In response sdk handler , status : " + status);
    console.log(response);
    let message = "";
    if (status === 200 || status === 201) {
      let token = response.id;
      console.log("Token capturado : " + token);
      let paymentRequest = this.paymentRequest(response);
      console.log(paymentRequest);
      console.log(paymentRequest);
      setTimeout(() => this.ejecutarPago(paymentRequest), 1000);
    } else {
      if (status === 403) {
        message = response.message;
      } else if (status === 503) {
        message = "Servidor no disponible, intente en unos minutos";
      } else {

        if (response) {
          let error = response.error[0];
          console.log("Error : ");
          console.log(error);
          switch (error.error.message) {
            case "Expiry date is invalid":
              message = "Vencimiento incorrecto";
              break;
            default:
              return null;
          }
        }
        console.log("Error en datos ! sdk");
      }
    }

    this.setState({
      displayMsg: true,
      message: message,
      loadingTransaction: false,
    });
  };

  render() {
    const {
      number,
      cvc,
      expiry,
      name,
      phone,
      cuotas,
      total,
      products,
      userEmail,
      dir_Remitente,
      localidad,
      postalCode,
      identity_number,
    } = this.props.location.state;
    let expiryMonth = expiry.substr(0, 2);
    let expiryYear = expiry.substr(2, 2);
    return (
      <PaymentConfirmationContainer>
        {!this.state.loadingTransaction ? (
          <div className="info-container">
            <div class="product-container">
              <div id="card-container">
                <h3>Datos de la compra</h3>
                <div>Numero de tarjeta : {number}</div>
                <div>
                  Vencimiento : {expiryMonth}/{expiryYear}
                </div>
                <div>Titular : {name}</div>
                <div>DNI : {identity_number}</div>
                <div>Contacto del titular : {phone}</div>
                <div>Email del titular : {userEmail}</div>
                <div>Localidad : {localidad}</div>
                <div>Codigo postal : {postalCode}</div>
                <div>Sucursal a recibir : {dir_Remitente}</div>
                <div>Cuotas : {cuotas}</div>
                <div>Total : $ {total}</div>
                {this.state.displayMsg ? (
                  <h5 className="msg">
                    {this.state.message}&nbsp;{this.state.error}
                  </h5>
                ) : null}

                <div id="submit-btn-container" class="container">
                  <form
                    id="formulario"
                    method="post"
                    action=""
                    onSubmit={this.submitHandler}
                  >
                    <fieldset>
                      <input
                        hidden="true"
                        type="text"
                        data-decidir="card_holder_name"
                        value={name}
                      />
                      <input
                        hidden="true"
                        type="text"
                        data-decidir="card_number"
                        value={number}
                      />
                      <input
                        hidden="true"
                        type="text"
                        data-decidir="security_code"
                        value={cvc}
                      />
                      <input
                        hidden="true"
                        type="text"
                        data-decidir="card_expiration_month"
                        value={expiryMonth}
                      />
                      <input
                        hidden="true"
                        type="text"
                        data-decidir="card_expiration_year"
                        value={expiryYear}
                      />
                      <input
                        hidden="true"
                        type="text"
                        data-decidir="card_holder_doc_type"
                        value="dni"
                      />
                      <input
                        hidden="true"
                        type="text"
                        data-decidir="card_holder_doc_number"
                        value={identity_number}
                      />

                      <input
                        disabled={this.state.buttonDisabled}
                        type="submit"
                        value="Aceptar"
                        id="submit-btn"
                        class="btn-primary mr-2 mt-3"
                      />
                    </fieldset>
                  </form>

                  {this.state.paymentAproved ? (
                    <Link to="/Congrats">
                      <button
                        type="submit"
                        id="submit-btn"
                        class="btn-danger mr-2 mt-3 "
                      >
                        Finalizar
                      </button>
                    </Link>
                  ) : (
                    <Link to="/cart">
                      <button
                        type="submit"
                        id="back-btn"
                        class="btn-danger mr-2 mt-3 "
                      >
                        Volver
                      </button>
                    </Link>
                  )}
                </div>
              </div>

              {products.map((item) => {
                return (
                  <Card
                    id="my-card"
                    style={{
                      width: "14rem",
                      margin: "0 auto",
                      display: "inline-block",
                    }}
                  >
                    <Card.Img id="card-img" variant="top" src={item.img} />
                    <Card.Body id="card-body">
                      <Card.Title>
                        {item.company.toUpperCase()} {item.title}
                      </Card.Title>
                      <Card.Title>Unidades : {item.count}</Card.Title>
                      <Card.Title>Valor : ${item.total}</Card.Title>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="spinner">
            <div id="loader">
              <Loader
                type="Grid"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={0}
              />
              <h5 style={{ margin: "0 auto", "margin-top": "3rem" }}>
                Procesando pago, aguarde por favor
              </h5>
            </div>
          </div>
        )}
      </PaymentConfirmationContainer>
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
