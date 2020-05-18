import React, { Component } from 'react';
import styled from 'styled-components';
import PresentationCard from './PresentationCard';
import { cardsData } from '../cardsData';
import Carousel from './HomeCarousel';
import Footer from './Footer';
import ImagesGrid from './ImagesGrid';
export default class HomePage extends Component {
    render() {
        return (
            <HomeContainer>
                <Carousel className="carousel"/>
                <PresentationCard image={cardsData[0].img} title={cardsData[0].title} description={cardsData[0].description} />
                <ImagesGrid image="img/marcas.jpg" image2="img/marcas2.jpg"/>
         
                <PresentationCard image={cardsData[1].img} title={cardsData[1].title} description={cardsData[1].description} />
                <Footer />

            </HomeContainer>

        );
    }
}

const HomeContainer = styled.div`  
    height : 100%;
    .cardsSeparator{       
        height: 25rem;
    }
    .myImg{  
           
            margin-left: 3rem;
            float:left;
            padding: 2rem;
            max-width: 100%;
            max-height: 35rem;        
            display: block; /* remove extra space below image */
    }

    .carousel{}
`;