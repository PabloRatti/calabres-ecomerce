import React, { Component } from 'react';
import styled from 'styled-components';
import PresentationCard from './PresentationCard';
import { cardsData } from '../cardsData';
import Carousel from './HomeCarousel';
import Card from './ServiceCard';
import ImagesGrid from './ImagesGrid';
import ThreeCards from './ThreeCards';
import {Image} from 'react-bootstrap';
export default class HomePage extends Component {
    render() {
        return (
            <HomeContainer>
               {/*<Carousel className="carousel"/>               
                
                */}
                <Image className="home-image" src="img/calabres_portada.jpg" fluid />
                <Carousel className="carousel" />
                <Image className="brands" src="img/banner.png" />
                <ThreeCards className="cardsContainer"/>
                <Image className="brands" src="img/marcasCalabres.png"/>
                <PresentationCard image2="img/ahora12Imagen.png" image="img/IMG-20200519-WA0003.jpg" title="Title" description="descasda" />
            </HomeContainer>

        );
    }
}

const HomeContainer = styled.div`  
    height : 100%;
    
    .cardsContainer{
        border: 2px solid black;
    }
    .carousel{
        max-height: 20rem;
    }
    .brands{
       
        max-width: 100%;
        margin-top: 2rem;
    }

    @media (max-width: 48em) {
       .brands{
           margin-top: 0rem;
       }

    }
   
`;