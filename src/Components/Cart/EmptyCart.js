import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
export default function EmptyCart() {

    return (
        <EmptyCartContainer>
            <div className="container mt-5">
                <div className="row">
                    <div id="container" className="col-10 mx-auto text-center text-title">
                        <h1 id="mensajeVacio" className="text-capitalize font-weight-bold">Su carrito se encuentra vacio</h1>
                        <Link className="link-back" to="/home">Volver a la tienda</Link>
                    </div>

                </div>
            </div>
        </EmptyCartContainer>
    );
}

const EmptyCartContainer = styled.div`  
    
    height: 25rem;
    text-align:center;
    marign: 0 auto;
    border:2px solid white;
   .link-back{
       font-family: Courier;       
   }

   #container{
       border: 2px solid var(--mainBlue);
       border-radius: 2rem;
       padding: 2rem;
 
       text-align:center;
       top: 8rem;
     
       position:relative;
       box-shadow: 10px 5px 5px black;
   }
  #mensajeVacio{     
        font-family: Courier;
  }

  @media (max-width: 48em) {
          height: 35rem;
     #container{
         top: 5rem;         
     }
}
`;