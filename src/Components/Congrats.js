import React from 'react';
import styled from 'styled-components';
import { Image } from 'react-bootstrap';

export default function () {

    return (
        <Congrats class="">
            <div className="text-container">
                <h1>Su pedido a sido registrado</h1>
                <br /><br />
                <h4>Al hacerse efectivo el pago se le enviara el numero de seguimiento OCA</h4>
                <br/>
                <h5>Muchas gracias por su compra!</h5>
            </div>

            <Image className="brands" src={require("../calabres-api/images/static/MarcasCalabres.png")} />
        </Congrats>
    );
}

const Congrats = styled.div`
height: 28rem;
text-align:center;
.text-container{
     margin: 0 auto;
    border: 2px solid var(--mainBlue);
    margin-top: 3rem;
    margin-bottom: 2rem;
    font-family: monospace;
    border-radius: 0rem;
    width: 40%;
    height: 80%;
    box-shadow: 5px 10px #888888;
}
h1{
    color:var(--mainBlue);
    margin-top: 2rem;
}
.brands{
    max-width:100%;
}
`;