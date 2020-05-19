import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
export default class ServiceCard extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Card style={{ width: '18rem'}}>
                <Card.Img variant="top" src={this.props.img} />
                <Card.Body>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Card.Text>
                        {this.props.description}
                     </Card.Text>
                    
                </Card.Body>
            </Card>
        );

    }
}