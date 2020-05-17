import React, { Component } from 'react';
import styled from 'styled-components';

export default class ImagesGrid extends Component {

    render() {

        return (
            <CardContainer>
                <div className="py-5">
                    <div className="container">
                        <div className="row">
                            <div class="rowContainer col-sm">
                                <img class="img-fluid" src={this.props.image} alt="portada" />
                            </div>
                            <div class="imgContainer col-sm">
                                <img class="img-fluid" src={this.props.image2} alt="portada" />
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
    .py-5{
        padding-bottom: 0rem!important;
    }
  
`;