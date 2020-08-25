import React from 'react';
import styled from 'styled-components';
import NavBar from './NavBar';
const FullNavBar = () => {



    return (
        <FreeShippingContainer >

            <div style={{top: '1rem'}}>
                <img id="fire" src={require("../img/fire.png")} alt="home" />
                <h5>Envios gratis a todo el pais y 20% OFF en tienda online</h5>
                <img id="fire" src={require("../img/fire.png")} alt="home" />

            </div>


            <NavBar />
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

#fire{
    
    width: 2%;
    display:inline-block;
    margin-left:1rem;
    margin-right:1rem;
}
h5{   
    display:inline-block;
}

 @media (max-width: 48em) {
     #fire{
        width: 5%;
        }
        h5{
            font-size: .75em;
        }
 }
`;