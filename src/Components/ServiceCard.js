import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import styled from 'styled-components';
export default class ServiceCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ServiceCardContainer >
                <Card>
                    <Card.Img variant="top" src={this.props.img} className="card-image" />
                    <Card.Body className="card-body"y>
                        <Card.Title>{this.props.title}</Card.Title>
                        <Card.Text>
                            {this.props.description}
                        </Card.Text>

                    </Card.Body>
                </Card>
            </ServiceCardContainer >
        );

    }
}

const ServiceCardContainer = styled.div`  
    
    height: 18rem; 
    .card-body{
    
    }
     @media (max-width: 48em) {
        height: 25rem; 
}
`;