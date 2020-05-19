import React, { Component } from 'react';

import ServiceCard from './ServiceCard';
export default class ThreeCards extends Component {
    render() {
        return (
            <div className="py-5">
                <div className="container">
                    <div className="row">
                        <div class="rowContainer col-sm">
                            <ServiceCard img="img/frenos.jpg" description="Recambio y reparacion de frenos" title="Frenos"/>
                        </div>
                        <div class="imgContainer col-sm">
                            <ServiceCard img="img/recambio.jpg" description="Venta y colocacion de neumaticos/llantas" title="Venta de rodados"/>
                        </div>
                        <div class="imgContainer col-sm">
                            <ServiceCard img="img/portada4.png" description="Descripcion del servicio" title="Titulo"/>
                        </div>
                    </div>

                </div>
            </div>

        );
    }
}