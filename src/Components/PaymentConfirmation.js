import React from 'react';
import Title from './Title';
import styled from 'styled-components';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
export default class PaymentConfirmation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            name: this.props.location.state.name,
            total: this.props.location.state.total,
            products: this.props.location.state.products
        }

    }

    componentDidMount = () => {
        scroll.scrollToTop();
        //scroll.scrollTo(800)
    }


    submitHandler = () => {

        const { number, cvc,
            expiry, name, phone,
            cuotas, total, products,
            userEmail, dir_Remitente,
            localidad, postalCode, identity_number } = this.props.location.state;


        let fetchData = {
            method: "POST",
            headers: {
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
        //Hacer el update
        fetch('http://localhost:4000/notes/guardarVenta', fetchData)
            .then(response => {
                console.log(response.status);
                return response;
            })
            .then(json => {
                if (json.status === 200) {
                    console.log('Transaccion realizada con exito !')
                } else {
                    console.log('Error en la transaccion');
                };
                return json;
            });

    }

    render() {
        const { number, cvc, expiry, name, phone, cuotas, total, products, userEmail, dir_Remitente, localidad, postalCode } = this.props.location.state;
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
                                        <Card.Title>{item.type.toUpperCase()} {item.company.toUpperCase()} {item.title}</Card.Title>
                                        <Card.Title>Unidades : {item.count}</Card.Title>
                                        <Card.Title>Valor : ${item.price}</Card.Title>

                                    </Card.Body>
                                </Card>

                            );
                        })}
                    </div>

                    <div id="card-container" >
                        <h3>Datos de la compra</h3>
                        <div>Numero : {number}</div>
                        <div>Vencimiento : {expiry}</div>
                        <div>Titular : {name}</div>
                        <div>Cuotas : {cuotas}</div>
                        <div>Contacto del titular : {phone}</div>
                        <div>Email del titular : {userEmail}</div>
                        <div>Localidad : {localidad}</div>
                        <div>Codigo postal : {postalCode}</div>
                        <div>Sucursal a recibir : {dir_Remitente}</div>
                        <div>Total : ${total}</div>
                    </div>



                    <div id="submit-btn-container" class="container">
                        <Link to="/congrats">
                            <button type="submit" className="submit-btn" class="btn-primary mr-2 mt-3" onClick={() => this.submitHandler()}>Aceptar</button>

                        </Link>
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
    width: 50%; 
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