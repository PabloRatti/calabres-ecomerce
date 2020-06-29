import React from 'react';
import styled from 'styled-components';
export default class Aviso extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: []
        }
    }


    render() {
        return (

            <AvisoContainer>


                Probando
            </AvisoContainer>
        );
    }
}

const AvisoContainer = styled.div`
border: 2px solid red;
background: green;
color:white;
position:fixed;
z-index: 1;

`;