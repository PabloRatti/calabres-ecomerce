import React, { Component } from 'react';
import styled from 'styled-components';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export default class PresentationCard extends Component {

    render() {

        return (
            <CardContainer>
                <div className="py-5">
                    <div className="container">
                        <div className="row">
                            <div id="aux" class="col-sm offset-md-1">
                                <div class="col-sm">
                                    <Link to="/llantas">
                                        <Image id="left-img" className="home-image" src={this.props.image} fluid />
                                       
                                    </Link>

                                </div>

                            </div>

                            <div class="col-sm">
                                <div class="imgContainer col-sm">
                                    <Link to="/llantas">
                                    <Image id="right-img" className="home-image" src={this.props.image2} fluid />
                                    
                                    </Link>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </CardContainer>

        )
    }
}

const CardContainer = styled.div`   

    .py-5{
        padding-top: 0rem !important;
    }
    .home-image{
     
        min-height: 25rem;
        min-width: 70%;
        max-width: 100%;
        max-height: 25rem;
        margin-top: 0rem;
        
    }
    .home-image:hover{
        cursor:pointer;
    }
  
    @media (max-width: 48em) {
        .home-image{
     
      
        min-width: 100%;
        
        
    }
     }
   
`;