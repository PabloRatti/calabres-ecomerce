import React, { Component } from 'react';
import styled from 'styled-components';
import { carouselData } from '../cardsData';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image'
export default class HomeCarousel extends Component {

    render() {
        return (
            <HomeCarouselContainer>
                <Carousel interval="2000">
                    <Carousel.Item>
                        <img
                            className="carouselImg d-block w-100"
                            src={carouselData[0].imgUrl}
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="carouselImg d-block w-100"
                            src={carouselData[1].imgUrl}
                            alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="carouselImg d-block w-100 img-fluid"
                            src={carouselData[2].imgUrl}
                            alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>
            </HomeCarouselContainer>
        );
    }
}


const HomeCarouselContainer = styled.div` 
    height: 35rem;
    width: 100%;  
    max-height: 35rem;    
    
    .carouselImg{
        height: 35rem;
                  
  }

  @media (max-width: 48em) {
       max-height: 20rem;  
  .carouselImg {
      max-height: 20rem
  }
  .row{
      margin: 0 auto;
  }
}
`;