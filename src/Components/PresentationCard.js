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
                            <Link to="/llantas">
                                <img id="home-image" class="img-fluid" src={this.props.image} alt="home" />

                            </Link>

                        </div>
                    </div>


                    <div class="col">
                        <div id="imgContainer">
                            <Link to="/llantas">
                                <img id="home-image" class="img-fluid" src={this.props.image2} alt="home"/>

                            </Link>
                        </div>
                    </div>
                </div>




            </CardContainer>

        )
    }
}

const CardContainer = styled.div`   


margin-bottom:2rem;
margin-top:2rem;
height :30rem;


#home-image{
    width:70% !important;   
    height:95%;
    margin-bottom:0rem !important;
}
#imgContainer{
    text-align:center;
    height:30rem;
 
    margin-top:1rem;
}

#home-image:hover{
  filter: opacity(.5);
}
@media (max-width: 48em) {
 margin-top:0rem !important;
    height :12rem !important;

 #home-image{
     width:70% !important;   
     height:80% !important; 

     margin-top:1rem;
    }
    #imgContainer{
        height:12rem;
    }
}
   
`;