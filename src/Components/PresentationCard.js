import React, { Component } from 'react';
import styled from 'styled-components';
import { Image } from 'react-bootstrap';
export default class PresentationCard extends Component {

    render() {

        return (
            <CardContainer>
                <div className="py-5">
                    <div className="container">
                        <div className="row">
                            <div class="col-sm offset-md-1">
                                <div class="col-sm">
                                    <Image id="left-img" className="home-image" src={this.props.image} fluid />
                                </div>
                            </div>
                            <div class="col-sm">
                                <div class="imgContainer col-sm">
                                    <Image id="right-img" className="home-image" src={this.props.image2} fluid />
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
   .imgContainer{
       top: 4rem;
    }
    .home-image{
        max-height: 25rem;
        margin-top: 2rem;
        
    }

    @media (max-width: 48em) {
        .imgContainer{
             top: 0rem;
        }
     }
   
`;