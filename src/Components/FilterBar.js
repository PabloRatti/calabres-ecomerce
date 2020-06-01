import React, { Component } from 'react';
import styled from 'styled-components';
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';

export default class FilterBar extends Component {


    render() {
        const { handleFilter } = this.props;

        return (

            <FilterBarContainer>
                <Navbar collapseOnSelect expand="lg" variant="dark">
                    <Navbar.Brand className="nav-reset" onClick={() => {
                        return handleFilter('reset', 'all');
                    }}>Reset </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <NavDropdown className="drop" title="Productos" id="collasible-nav-dropdown">

                                <NavDropdown.Item className="item" onClick={() => {
                                    return handleFilter('productos', 'neumatico');
                                }}>
                                    Neumáticos
                                    </NavDropdown.Item>
                                <NavDropdown.Item className="item" onClick={() => {
                                    return handleFilter('productos', 'llanta');
                                }}> Llantas</NavDropdown.Item>                               


                            </NavDropdown>
                            <NavDropdown className="drop" title="Marca" id="collasible-nav-dropdown">
                                
                                <NavDropdown.Item className="item" onClick={() => {
                                    return handleFilter('marcas', 'pirelli');
                                }}>
                                    Pirelli
                                    </NavDropdown.Item>
                                <NavDropdown.Item className="item" onClick={() => {
                                     return handleFilter('marcas', 'firestone');
                                }}> Firestone</NavDropdown.Item>
                                <NavDropdown.Item className="item" onClick={() => {
                                    return handleFilter('marcas', 'michellin');
                                }}>Michellin</NavDropdown.Item>


                            </NavDropdown>

                            <NavDropdown className="drop" title="Ancho" id="collasible-nav-dropdown">
                                <NavDropdown.Item className="item" href="#action/3.1">23.22</NavDropdown.Item>
                                <NavDropdown.Item className="item" href="#action/3.2">40.44</NavDropdown.Item>
                                <NavDropdown.Item className="item" href="#action/3.3">67.77</NavDropdown.Item>

                            </NavDropdown>
                            <NavDropdown className="drop" title="Perfil" id="collasible-nav-dropdown">
                                <NavDropdown.Item className="item" href="#action/3.1">23.22</NavDropdown.Item>
                                <NavDropdown.Item className="item" href="#action/3.2">40.44</NavDropdown.Item>
                                <NavDropdown.Item className="item" href="#action/3.3">67.77</NavDropdown.Item>

                            </NavDropdown>
                            <NavDropdown className="drop" title="Precio" id="collasible-nav-dropdown">
                                <NavDropdown.Item className="item" href="#action/3.1">23.22</NavDropdown.Item>
                                <NavDropdown.Item className="item" href="#action/3.2">40.44</NavDropdown.Item>
                                <NavDropdown.Item className="item" href="#action/3.3">67.77</NavDropdown.Item>

                            </NavDropdown>
                            <NavDropdown className="drop" title="Tipo de vehiculo" id="collasible-nav-dropdown">
                                <NavDropdown.Item className="item" href="#action/3.1">Auto</NavDropdown.Item>
                                <NavDropdown.Item className="item" href="#action/3.2">Camioneta</NavDropdown.Item>
                                <NavDropdown.Item className="item" href="#action/3.3">Pickup</NavDropdown.Item>

                            </NavDropdown>
                        </Nav>

                    </Navbar.Collapse>
                </Navbar>
            </FilterBarContainer>
        );
    }
}

const FilterBarContainer = styled.div` 
-webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
-moz-animation: fadein 2s; /* Firefox < 16 */
-ms-animation: fadein 2s; /* Internet Explorer */
-o-animation: fadein 2s; /* Opera < 12.1 */
animation: fadein 2s;


@keyframes fadein {
from { opacity: 0; }
to   { opacity: 1; }
}



/* Firefox < 16 */
@-moz-keyframes fadein {
from { opacity: 0; }
to   { opacity: 1; }
}

/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
from { opacity: 0; }
to   { opacity: 1; }
}

/* Internet Explorer */
@-ms-keyframes fadein {
from { opacity: 0; }
to   { opacity: 1; }
}

/* Opera < 12.1 */
@-o-keyframes fadein {
from { opacity: 0; }
to   { opacity: 1; }
} 


font-family: Comic sans;
background: var(--mainBlue); 
.nav-reset{
cursor: pointer;
}
.nav-reset:hover{
color:white;
color: cyan !important;
-webkit-transition: colorr 500ms linear;
-ms-transition: color 500ms linear;
transition: color 500ms linear;
}
.item:hover{       
color:white;
background-color: var(--mainBlue) !important;
-webkit-transition: background-color 500ms linear;
-ms-transition: background-color 500ms linear;
transition: background-color 500ms linear;

}
.drop{
margin-left: 3rem;
}
.dropdown-menu{

margin-top: 25px;
border: 2px solid gray;
text-align: center;

-webkit-animation: fadein 1s; /* Safari, Chrome and Opera > 12.1 */
-moz-animation: fadein 1s; /* Firefox < 16 */
-ms-animation: fadein 1s; /* Internet Explorer */
-o-animation: fadein 1s; /* Opera < 12.1 */
animation: fadein 1s;


@keyframes fadein {
from { opacity: 0; }
to   { opacity: 1; }
}

/* Firefox < 16 */
@-moz-keyframes fadein {
from { opacity: 0; }
to   { opacity: 1; }
}

/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
from { opacity: 0; }
to   { opacity: 1; }
}

/* Internet Explorer */
@-ms-keyframes fadein {
from { opacity: 0; }
to   { opacity: 1; }
}

/* Opera < 12.1 */
@-o-keyframes fadein {
from { opacity: 0; }
to   { opacity: 1; }
} 


`;