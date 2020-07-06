import React from 'react';
import styled from 'styled-components';
import NavBar from './NavBar';
const FullNavBar = () => {



    return (
        <FreeShippingContainer>
            <div>
                <img id="fire" src={require("../calabres-api/images/static/fire.png")} alt="home" />
                <h5>Envios gratis a todo el pais y 20% off en tienda online</h5>
                <img id="fire" src={require("../calabres-api/images/static/fire.png")} alt="home"/>

            </div>
            <NavBar/>
        </FreeShippingContainer>);
}

export default FullNavBar;
const FreeShippingContainer = styled.div`

background-color: var(--mainDark);
color: var(--mainWhite);
position:fixed;
width:100%;
z-index: 1;
text-align:center;
padding: 1px;
#fire{
    height: 100%;
    width: 2%;
    display:inline-block;
    margin-left:1rem;
    margin-right:1rem;
}
h5{
    font-size: 1.00rem;
    display:inline-block;
}
`;