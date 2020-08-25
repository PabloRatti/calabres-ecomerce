import React, { Component } from 'react';
import styled from 'styled-components';

import Carousel from 'react-bootstrap/Carousel';

export default class HomeCarousel extends Component {

    render() {
        return (
            <HomeCarouselContainer class="shadow p-3 mb-5 bg-white rounded">
                <Carousel fade="true" interval="2200" pause="false">
                    <Carousel.Item id="firs-slide">
                        <img                           
                            className="carouselImg d-block w-100"
                            src={require("../img/ahora12Cover.jpeg")}
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="carouselImg d-block w-100"
                            src={require("../img/EnviosAtodos.jpeg")}
                            alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="carouselImg d-block w-100"
                            src={require("../img/coverGomas.jpeg")}
                            alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="carouselImg d-block w-100 img-fluid"
                            src={require("../img/coverCalabres.jpeg")} alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>
            </HomeCarouselContainer>
        );
    }
}


const HomeCarouselContainer = styled.div` 
    height: 30rem;
 
    width: 100%;     
    position:relative;
.carouselImg{
    height:30rem;        
} 
.carousel{
    padding:0rem !important;
}
  @media (max-width: 48em) {
       max-height: 13rem;  
  .carouselImg {
      max-height: 11rem
  }
 
  
}
`;