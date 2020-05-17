import React, { Component } from 'react';
import styled from 'styled-components';
import { carouselData } from '../cardsData';
import Carousel from 'react-bootstrap/Carousel';

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
                            className="carouselImg d-block w-100 img-fluid"
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
 
   max-height:25rem;
   
    .carouselImg{
        max-width: 100%;
        max-height: 25rem;
        
        display: block; /* remove extra space below image */
        
  }
`;