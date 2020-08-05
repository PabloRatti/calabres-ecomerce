import React, { Component } from 'react';
import styled from 'styled-components';

export default class PresentationCard extends Component {

    render() {

        return (
            <CardContainer>



                <div class="row">
                    <div class="col">

                        <div className="imgContainer">
                            <img id="home-image" class="img-fluid" src={this.props.image} alt="home" />
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
height: 30rem;
padding:1rem;

.col{  
    max-height:100% !important; 
}

.row{
     height:100%;
}
#home-image{
    height:100% !important;
    margin:0 auto !important;
    border-radius:2rem;

}
.imgContainer{
    text-align:center;
    height:100%;

    margin: 0 auto;
}

@media (max-width: 48em) {
    padding: 0rem;
    margin-top: 1rem !important;
    margin-bottom: 1rem !important;
    height : 8rem !important;
 


.imgContainer{
 
 padding: 0.5rem;
   height:100%;
}

}
   
`;