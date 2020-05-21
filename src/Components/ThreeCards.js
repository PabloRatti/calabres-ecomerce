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
                                    <ServiceCard img="img/FrenosFoto.jpg" description="Venta, colocacion y mantenimiento de llantas y neumaticos" title="Llantas y neumaticos" />
                                </div>
                            </div>
                            <div class="col-sm">
                                <div class="col-sm">
                                    <ServiceCard img="img/recambio.jpg" description="Venta y colocacion de frenos" title="Frenos" />
                                </div>
                            </div>
                            <div class="col-sm">
                                <div class="col-sm">
                                    <ServiceCard img="img/AlineacionBalanceo.jpg" title="Tren delantero" description="Contamos con personal capacitado y las mejores herramientas. Alineacion, balanceo y tren delantero"/>
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