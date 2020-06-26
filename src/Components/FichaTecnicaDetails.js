import React from 'react';

import styled from 'styled-components';
import { ButtonContainer } from './Button';
export default class FichaTecnicaDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {           
            onTab: 2
        }
    }
    render() {
        const { id, type, company, img, title, inCart, price, width, profile, info, rodado} = this.props.detailProduct
        return (
            <Container>
            
                <div className="container">
                    <div className="row">
                        <div className="btn-container" onClick={() => {
                            this.setState({ onTab: 2 })
                        }}>
                            Detalles
                </div>
                        <div className="btn-container" onClick={() => {
                            this.setState({ onTab: 1 })
                        }}>
                            Ficha Tecnica
                </div>
                    </div>
                </div>
                <div className="info-container" hidden={this.state.onTab === 1 ? true : false}>
                   <p className="info"> {info}</p>
                </div>
                <div className="info-container" hidden={this.state.onTab === 2 ? true : false}>
                    <div>
                        <div>Marca : {company}</div>
                        <div>Modelo : {title}</div>
                        <div>Ancho :  {width}</div>
                        <div>Rodado : {rodado}</div>
                        <div>Perfil : {profile}</div>
                    </div>
                </div>

            </Container>

        );
    }
}

const Container = styled.div`
    
    background-color: #f8f8f8;
    width: 80%;


    margin: 0 auto;
    text-align:center; 
   

   
    .btn-container{
        box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
       padding: 1rem;
        border-right: 2px solid black;
        min-height: 65% !important;
        width:50%;
    }
    .btn-container:hover{
        background-color: var(--mainBlue);
        cursor: pointer;
        color:white;
    }
    .info-container{       
         border-top: 2px solid black; 
         font-size: 1.2rem;
         word-wrap: break-word;
    }

    @media (max-width: 48em) {
      
        width : 95%;
        .btn-container{

        }
    
    }
`;