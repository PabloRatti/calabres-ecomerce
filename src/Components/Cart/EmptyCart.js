import React from 'react';
import styled from 'styled-components';
export default function EmptyCart() {

    return (
        <EmptyCartContainer>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-10 mx-auto text-center text-title">
                        <h1 className="mensajeVacio">El carrito se encuentra vacio!</h1>
                    </div>
                </div>
            </div>
        </EmptyCartContainer>
    );
}

const EmptyCartContainer = styled.div`  
  .mensajeVacio{
      margin-top: 6rem;
  }
`;