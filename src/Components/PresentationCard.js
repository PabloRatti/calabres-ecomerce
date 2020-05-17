import React, { Component } from 'react';
import styled from 'styled-components';

export default class PresentationCard extends Component {

    render() {

        return (
            <CardContainer>
                <div className="py-5">
                    <div className="container">
                        <div className="row">
                            <div class="detailsContainer rowContainer col-sm">
                                <div className="cardDescription">
                                    <h2 className="detailsTitle">{this.props.title}</h2>
                                    <p>{this.props.description}</p>
                                </div>
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
        width: 25rem;
        margin: 0 auto;
    }
    .rowContainer{         
        bottom: 2rem;
        text-align:center;      

    }
    .detailsContainer{
        
        text-align: center;
        height:15rem;
        top: 5rem;       
      
    }
    .cardDescription{             
        height: 10rem;
        font-family: Times New Roman;  
         
    }
`;