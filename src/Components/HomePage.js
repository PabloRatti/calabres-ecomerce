import React, { Component } from 'react';
import styled from 'styled-components';
import PresentationCard from './PresentationCard';
import Carousel from './HomeCarousel';

import { Image } from 'react-bootstrap';
import { animateScroll as scroll } from 'react-scroll';

import PresentationCard2 from './PresentationCard2';
export default class HomePage extends Component {

    componentDidMount = () => {
        scroll.scrollToTop();

    }

    render() {
        return (
            <HomeContainer>
                <Image className="home-image" src={require("../calabres-api/images/static/yellowCar.jpg")} fluid />
                <Carousel className="carousel" />


                <PresentationCard image2={require("../calabres-api/images/static/llantas2.jpg")} image={require("../calabres-api/images/static/neumaticos.jpg")} />


                <Image className="brands" src={require("../calabres-api/images/static/MarcasCalabres.png")} fluid />
                {/*<HorizontalGallery />*/}
                <PresentationCard2 image2={require("../calabres-api/images/static/carretera2.jpg")} image={require("../calabres-api/images/static/pickupcalabres.jpg")} />


                <Image className="banner" src={require("../calabres-api/images/static/banner.png")} />
            </HomeContainer>

        );
    }
}

const HomeContainer = styled.div`  
 height : 100%;
 background-color: #ffffff;
 border: 1px translucent white;
 .img-container{
     border:2px solid red;
     height:30rem;
 }
 #pic{
    max-width:40% !important;
    height:80%;
 }
.banner{ 
    width:100%; 
    margin-bottom: 2rem;
    
}

.home-image{
    margin-top:5.5rem !important;
    width:100%;
}
.brands{
    margin-top: 3rem !important;
}

.carousel{
        max-height: 21rem;
        position:relative;
        padding: 1rem;
        z-index: 0;
       
}
    .brands{    
        position:relative;   
        max-width: 100%;   
        margin-top: 2rem;    
      
    }

    @media (max-width: 48em) {
       .brands{
            margin-top:2rem !important;
            height:2rem;  
            margin-bottom:0rem;         
       }     
       .banner{ 
        margin-top:0rem !important;   
       }

    }
   
`;






/*



   <Image className="home-image" src={require("../calabres-api/images/static/calabres_portada.jpg")} fluid />
                <Carousel className="carousel" />
                <Image className="brands" src={require("../calabres-api/images/static/banner.png")} />
                <ThreeCards className="cardsContainer" />
                <Image className="brands" src={require("../calabres-api/images/static/MarcasCalabres.png")} />
                <PresentationCard image2={require("../calabres-api/images/static/ahora12Imagen.png")} image={require("../calabres-api/images/static/IMG-20200519-WA0003.jpg")} title="Title" description="descasda" />
*/