import React from 'react';
import Title from './Title';
import styled from 'styled-components';
export default class PaymentConfirmation extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const { number, cvc, expiry, name, phone, cuotas, total } = this.props.location.state;
        return (
            <PaymentConfirmationContainer>
                <Title name="Confirmar " title="pago" />
                <div className="info-container">
                    
                        <div>Numero : {number}</div>
                        <div>Vencimiento : {expiry}</div>
                        <div>Titular : {name}</div>
                        <div>Cuotas : {cuotas}</div>
                        <div>Contacto del titular : {phone}</div>
                        <div>Total : ${total}</div>

                    <button type="submit" className="submit-btn" class="btn-primary mt-5">Aceptar</button>
                   

                </div>


            </PaymentConfirmationContainer>
        );
    }
}


const PaymentConfirmationContainer = styled.div`

width: 25rem;
margin: 0 auto;
height: 25rem;
.info-container{
    text-align:center;
 
    height: 25rem;
}


`;