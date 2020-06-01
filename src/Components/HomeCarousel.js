import React, { Component } from 'react';
import styled from 'styled-components';

import Carousel from 'react-bootstrap/Carousel';

export default class HomeCarousel extends Component {

    render() {
        return (
            <HomeCarouselContainer>
                <Carousel  fade="true" interval="2200" >
                    <Carousel.Item>
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
    max-height: 35rem;    
    margin-bottom: 3rem;
    position:relative;
    .carouselImg{
        height: 25rem;                  
  } 

  @media (max-width: 48em) {
       max-height: 15rem;  
  .carouselImg {
      max-height: 15rem
  }
  .row{
      margin: 0 auto;
  }
}
`;