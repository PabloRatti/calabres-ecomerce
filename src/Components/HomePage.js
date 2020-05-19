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
                <ThreeCards />
                <PresentationCard image2="img/IMG-20200519-WA0002.jpg" image="img/IMG-20200519-WA0003.jpg" title="Title" description="descasda" />
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

   .card{
       max-height: 5rem;
       max-width; 10rem;
   }
`;