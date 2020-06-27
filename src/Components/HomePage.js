import React, { Component } from 'react';
import styled from 'styled-components';
import PresentationCard from './PresentationCard';
import Carousel from './HomeCarousel';

import { Image } from 'react-bootstrap';
import { animateScroll as scroll } from 'react-scroll';
import HorizontalGallery from './HorizontalGallery';

export default class HomePage extends Component {

    componentDidMount = () => {
      scroll.scrollToTop();
        //scroll.scrollTo(800)
    }

    render() {
        return (
            <HomeContainer>
                <Image className="home-image" src={require("../calabres-api/images/static/calabres_portada.jpg")} fluid />
                <Carousel className="carousel" />               
                <div id="firstCard">
                    <PresentationCard image2={require("../calabres-api/images/static/ahora12Imagen.png")} image={require("../calabres-api/images/static/neumaticosCalabresTypo.jpg")} />


                </div>

                <Image className="brands" src={require("../calabres-api/images/static/MarcasCalabres.png")} />
                <HorizontalGallery />
                <PresentationCard  details2="Nuestros productos" image2={require("../calabres-api/images/static/nexendark.jpg")} image={require("../calabres-api/images/static/gomasHD.jpg")}/>



                <Image className="banner" src={require("../calabres-api/images/static/banner.png")} />
               
            </HomeContainer>

        );
    }
}

const HomeContainer = styled.div`  
 height : 100%;
.banner{ 
    width:100%;
    margin-bottom: 2rem;
}
#firstCard{
top: 0rem;
}
.home-image{
    margin-top:3.3rem !important;
}
   
.carousel{
        max-height: 21rem;
        position:relative;
        z-index: 0;
}
    .brands{
       
        max-width: 100%;
       
        margin-top: 2rem;
    }

    @media (max-width: 48em) {
       .brands{
           margin-top: 0rem;
           height: 4rem;
           max-height: 4rem !important;
       }
       .home-image{
       
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