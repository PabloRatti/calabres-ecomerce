import React, { Component } from 'react';
import styled from 'styled-components';
import ServiceCard from './ServiceCard';
export default class ThreeCards extends Component {
    render() {
        return (
            <ThreeCardsContainer>
                <div className="py-5">
                    <div className="container">
                        <div className="row">
                            <div class="col-sm">
                                <div class="col-sm">
                                    <ServiceCard img="img/frenos.jpg" description="Recambio y reparacion de frenos" title="Frenos" />
                                </div>
                            </div>
                            <div class="col-sm">
                                <div class="col-sm">
                                    <ServiceCard img="img/recambio.jpg" description="Venta y colocacion de neumaticos/llantas" title="Venta de rodados" />
                                </div>
                            </div>
                            <div class="col-sm">
                                <div class="col-sm">
                                    <ServiceCard img="img/alineacion-balanceo.jpg" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </ThreeCardsContainer>
        );
    }
}

const ThreeCardsContainer = styled.div`   

   height: 25rem;
   @media (max-width: 48em) {
       height: 80rem;
}
    
   
`;