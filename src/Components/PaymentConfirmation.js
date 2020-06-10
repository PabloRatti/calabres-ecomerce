import React from 'react';
import Title from './Title';
import styled from 'styled-components';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export default class PaymentConfirmation extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const { number, cvc, expiry, name, phone, cuotas, total, products } = this.props.location.state;
        return (
            <PaymentConfirmationContainer>
                <Title name="Confirmar " title="pago" />
                <div className="info-container">


                    <div class="product-container">

                        {products.map((item) => {
                            return (
                                <Card id="my-card" style={{ width: '14rem', margin: '0 auto', display: 'inline-block' }}>
                                    <Card.Img variant="top" src={item.img} />
                                    <Card.Body>
                                        <Card.Title>{item.type} {item.company} {item.title}</Card.Title>
                                        <Card.Title>Unidades : {item.count}</Card.Title>
                                        <Card.Title>Precio : {item.price}</Card.Title>
                                        <Button variant="primary">Go somewhere</Button>
                                    </Card.Body>
                                </Card>

                            );
                        })}
                    </div>

                    <div id="card-container" >
                        <h3>Datos de la tarjeta</h3>
                        <div>Numero : {number}</div>
                        <div>Vencimiento : {expiry}</div>
                        <div>Titular : {name}</div>
                        <div>Cuotas : {cuotas}</div>
                        <div>Contacto del titular : {phone}</div>
                        <div>Total : ${total}</div>
                    </div>


                    <div id="submit-btn-container" class="container">
                        <button type="submit" className="submit-btn" class="btn-primary mr-2 mt-3 ">Aceptar</button>
                        <Link to="/llantas">
                            <button type="submit" className="submit-btn" class="btn-danger mr-2 mt-3 ">Cancelar</button>

                        </Link>

                    </div>

                </div>






            </PaymentConfirmationContainer >
        );
    }
}


const PaymentConfirmationContainer = styled.div`

width: 100%;
margin-bottom: 3rem;
text-align:center;
margin: 0 auto;
#submit-btn-container{
    margin: 0 auto;
    text-align: center;    
    padding:2rem;
}
#card-container{
    border: 5px solid var(--mainBlue) !important;
    width: 20rem;
    margin: 0 auto;
    margin-top: 2rem;
    border-radius: 2rem ;
    box-shadow: 5px 10px #888888;
    text-align:center;
    
}

.product-container{
    
    padding: 2rem;
    margin-bottom: 2rem;
    width: 70%; 
    margin: 0 auto;
    text-align:center;  

    
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