import React from 'react';
import Card from 'react-bootstrap/Card';
import styled from 'styled-components';
export default class ServiceCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: this.props.showDetails
        }
    }
    render() {
        return (
            <ServiceCardContainer >
                <Card>
                    <Card.Img variant="top" src={this.props.img} className="card-image" />
                    {this.state.showDetails ?
                        <Card.Body className="card-body" >
                            <Card.Title>{this.props.title}</Card.Title>
                            <Card.Text>
                                {this.props.description}
                            </Card.Text>

                        </Card.Body>
                        : null}
                </Card>
            </ServiceCardContainer >
        );

    }
}

const ServiceCardContainer = styled.div`  
    
 
   max-height: 100%;
  .card-image{
   
    max-height: 20%;
  }
     @media (max-width: 48em) {
         margin-top: 2rem;
        
}
`;