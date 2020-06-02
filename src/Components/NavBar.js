import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import styled from 'styled-components';
import { ButtonContainer } from './Button';

export default class NavBar extends Component {
    render() {
        return (
            <NavWrapper className="navbar navbar-expand-sm  navbar-dark px-sm-5">
                <Link to='/'>
                    <HomeIcon className="homeIcon" color="primary" />
                </Link>
                <ul className="navbar-nav align-items-center">
                    <li className="nav-item ml-5">
                        <Link to="/llantas" className="nav-link">
                            Tienda
                        </Link>
                    </li>                 
                 
                </ul>
              
                <Link to="/cart" className="ml-auto">

                    <ButtonContainer>
                        <span className="mr-2">
                            <i className="fas fa-cart-plus" />
                        </span>
                       Carrito
                    </ButtonContainer>
                </Link>
              
            </NavWrapper>
        );
    }
}

const NavWrapper = styled.nav`
background: var(--mainBlue);
font-family: Trebuchet MS, sans-serif;
.icon{
    float: right ! important;
}
.ahora-logo{    
    height: 4rem;      
}
.ahora-img{
     height: 3.5rem;
}
.nav-link{
    color: var(--mainWhite);
    font-size: 1.3rem;
    text-transform: capitalize;
   
    border-radius:2rem;
}
.nav-link:hover{
     color: cyan !important;
    -webkit-transition: color 500ms linear;
    -ms-transition: color 500ms linear;
    transition: color 500ms linear;
}

.navTitle{
    margin-left: 10rem;
    color: var(--mainWhite);
}

.homeIcon:hover{
     color: cyan !important;
    -webkit-transition: color 500ms linear;
    -ms-transition: color 500ms linear;
    transition: color 500ms linear;
}

.titulo{
    margin-left: 14rem !important;
}

`;