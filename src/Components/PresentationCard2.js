import React, { Component } from 'react';
import styled from 'styled-components';

export default class PresentationCard extends Component {

    render() {

        return (
            <CardContainer>



                <div class="row">
                    <div class="col">

                        <div className="imgContainer">                  
                                <img id="home-image" class="img-fluid" src={this.props.image} alt="home"/>                     
                        </div>
                    </div>
                    <div class="col">
                        <div className="imgContainer">
                            <img id="home-image" class="img-fluid" src={this.props.image2} alt="home" />
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

padding:1rem;
#home-image{
   height:100%;
    margin-bottom:0rem !important;
    border-radius:2rem;
}
.imgContainer{
    text-align:center;
    height:30rem; 
    margin-top:1rem;
}

#home-image:hover{
    cursor:pointer;
   
}

@media (max-width: 48em) {
 margin-top:0rem !important;
    height :15rem !important;

 #home-image{ 

     margin-top:1rem;
    }
    .imgContainer{
        height:12rem;
    }
}
   
`;