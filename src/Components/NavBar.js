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
                            Llantas
                        </Link>
                    </li>
                    <li className="nav-item ml-5">
                        <Link to="/gomas" className="nav-link">
                            Gomas
                        </Link>
                    </li>
                    <li className="titulo nav-item ml-5">
                        <Link to="/" className="nav-link">
                            El calabres neumaticos
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
.nav-link{
    color: var(--mainWhite);
    font-size: 1.3rem;
    text-transform: capitalize;
}

.navTitle{
    margin-left: 10rem;
    color: var(--mainWhite);
}

.homeIcon:hover{
         color: cyan;
}

.titulo{
    margin-left: 14rem !important;
}
`;