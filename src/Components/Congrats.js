import React from 'react';
import styled from 'styled-components';
import { Image } from 'react-bootstrap';
import { animateScroll as scroll } from 'react-scroll';
export default class Congrats extends React.Component {

    
    componentDidMount = () => {       
        scroll.scrollToTop();
    }
    render() {
        return (
            <CongratsContainer >
                <div className="text-container">
                    <h1>Su pedido a sido registrado</h1>
                    <br /><br />
                    <h4>Al hacerse efectivo el pago se le enviara el numero de seguimiento OCA</h4>
                    <br />
                    <h5>Muchas gracias por su compra!</h5>
                </div>

                <Image className="brands" src={require("../calabres-api/images/static/MarcasCalabres.png")} />
            </CongratsContainer>
        );
    }
}

const CongratsContainer = styled.div`

text-align:center;

border: 2px solid transparent;

.text-container{
   
    margin: 0 auto;
    margin-top: 9rem !important;
    border: 2px solid var(--mainBlue); 
    margin-bottom: 2rem;
    font-family: monospace;
    border-radius: 0rem;
    width: 40%;
    height: 50%;
    box-shadow: 5px 10px #888888;
}
h1{
    color:var(--mainBlue);
    margin-top: 2rem;
}
.brands{
    max-width:100%;
    height:4rem;
        
}

@media (max-width: 48em) {
.text-container{
    width: 90%;
}
.brands{
    max-width:100%;
    height:2rem;
        
}
}
`;