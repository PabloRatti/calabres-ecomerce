import React, { Component } from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
export default class PresentationCard extends Component {

    render() {

        return (
            <CardContainer>

                <div class="row">
                    <div class="col">

                        <div id="imgContainer">
                            <Link to={{
                                pathname : '/llantas',
                                state :  {
                                    productType : 'neumatico'
                                }
                            }}>
                                <img id="home-image" class="img-fluid" src={this.props.image} alt="home" />
                            </Link>
                        </div>
                    </div>


                    <div class="col">
                        <div id="imgContainer">
                            <Link to={{
                                pathname: '/llantas',
                                state: {
                                    productType: 'llantas'
                                }
                            }}>
                                <img id="home-image" class="img-fluid" src={this.props.image2} alt="home" />
                            </Link>
                        </div>
                    </div>
                </div>




            </CardContainer>

        )
    }
}

const CardContainer = styled.div`   
height: 100%;
#imgContainer{
    text-align:center;
    height:30rem;
    padding:2rem;
  
    width:100% !important;
    height: 100% !important;
   
}

#home-image{
    min-width:100% !important;   
    min-height:100% !important;
    margin-top: 0rem !important;
 
}


#home-image:hover{
  filter: opacity(.5);
}
@media (max-width: 48em) {

 padding: 0.5rem;
 #home-image{
     width:70% !important;   
     height:80% !important; 
     margin-top:1rem;
    }
    #imgContainer{
         height:12rem;
         padding:0rem;
    }
    .col{   
          padding: 0 0;
        }
}
    
`;