import React, { Component } from 'react';
import styled from 'styled-components';

import Carousel from 'react-bootstrap/Carousel';

export default class HomeCarousel extends Component {

    render() {
        return (
            <HomeCarouselContainer class="shadow p-3 mb-5 bg-white rounded">
                <Carousel fade="true" interval="2200" >
                    <Carousel.Item id="firs-slide">
                        <img
                           
                            className="carouselImg d-block w-100"
                            src={require("../calabres-api/images/static/ahora12Portada.png")}
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
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
    height: 25rem;
    
    width: 100%;  
     
  
    
    position:relative;
    .carouselImg{
        height: 25rem;                  
  } 

  @media (max-width: 48em) {
       max-height: 13rem;  
  .carouselImg {
      max-height: 11rem
  }
  #firs-slide {
      max-height: 8rem
  }
  .row{
      margin: 0 auto;
  }
  
}
`;