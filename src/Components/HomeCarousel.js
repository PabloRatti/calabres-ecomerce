import React, { Component } from 'react';
import styled from 'styled-components';

import Carousel from 'react-bootstrap/Carousel';

export default class HomeCarousel extends Component {

    render() {
        return (
            <HomeCarouselContainer>
                <Carousel fade="true" interval="2200" >
                    <Carousel.Item id="firs-slide">
                        <img
                           
                            className="carouselImg d-block w-100"
                            src={require("../calabres-api/images/static/ahora12Portada.png")}
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img class="img-fluid"
                            className="carouselImg d-block w-100"
                            src={require("../calabres-api/images/static/IMG-20200519-WA0004.jpg")}
                            alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="carouselImg d-block w-100 img-fluid"
                            src={require("../calabres-api/images/static/neumaticosWide.jpg")} alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>
            </HomeCarouselContainer>
        );
    }
}


const HomeCarouselContainer = styled.div` 

   height: 27rem;
    
    margin-bottom: 3rem;
    position:relative;
    border : 2px solid red;
    .carouselImg{
        height: 25rem;                  
  } 

  @media (max-width: 48em) {
        
  .carouselImg {
  
  }
  .row{
      margin: 0 auto;
  }
  #first-slide{
      height: 3rem !important;
       max-height: 100%;  
  
  }
}
`;