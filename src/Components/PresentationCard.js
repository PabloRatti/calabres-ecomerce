import React, { Component } from 'react';
import styled from 'styled-components';

export default class PresentationCard extends Component {

    render() {

        return (
            <CardContainer>
                <div className="py-5">
                    <div className="container">
                        <div className="row">
                            <div class="rowContainer col-sm">
                                <h2 className="detailsTitle">{this.props.title}</h2>
                                <p className="cardDescription">{this.props.description}</p>
                            </div>
                            <div class="imgContainer col-sm">
                                <img class="img-fluid" src={this.props.image} alt="portada" />
                            </div>
                        </div>

                    </div>
                </div>
            </CardContainer>

        )
    }
}

const CardContainer = styled.div`   

    .imgContainer{          
        width: 35rem;
        margin: 0 auto;
    }
    .rowContainer{         
        float:right;
        text-align:center;      

    }
    .cardDescription{             
        margin-top: 7rem;
        font-family: Times New Roman;
    }
`;