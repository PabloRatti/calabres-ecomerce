import React, { Component } from 'react';
import styled from 'styled-components';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

export default class FilterBar extends Component {
constructor(){
    super();
    this.state ={
        inactive : false
    }
}

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
                                    this.setState({ inactive: false })
                                    return handleFilter('productos', 'neumatico');
                                }}>
                                    Neumáticos
                                    </NavDropdown.Item>
                                <NavDropdown.Item className="item" onClick={() => {
                                    this.setState({inactive : true})
                                    return handleFilter('productos', 'llantas');
                                }}> Llantas</NavDropdown.Item>


                            </NavDropdown>
                          
                            <NavDropdown disabled={this.state.inactive} className="drop" title="Marca" id="collasible-nav-dropdown">

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
                                <NavDropdown.Item className="item" onClick={() => {
                                    return handleFilter('marcas', 'westlake');
                                }}>Westlake</NavDropdown.Item>
                                <NavDropdown.Item className="item" onClick={() => {
                                    return handleFilter('marcas', 'windforce');
                                }}>Windforce</NavDropdown.Item>
                                <NavDropdown.Item className="item" onClick={() => {
                                    return handleFilter('marcas', 'fate');
                                }}>Fate O</NavDropdown.Item>
                                <NavDropdown.Item className="item" onClick={() => {
                                    return handleFilter('marcas', 'bridgetstone');
                                }}>Bridgetstone</NavDropdown.Item>
                                <NavDropdown.Item className="item" onClick={() => {
                                    return handleFilter('marcas', 'goodyear');
                                }}>Goodyear</NavDropdown.Item>
                                <NavDropdown.Item className="item" onClick={() => {
                                    return handleFilter('marcas', 'nexen');
                                }}>Nexen</NavDropdown.Item>


                            </NavDropdown>

                            <NavDropdown disabled={this.state.inactive} className="drop" title="Ancho" id="collasible-nav-dropdown">
                                <NavDropdown.Item className="item" onClick={()=>{
                                    return handleFilter('ancho','31');
                                }}>31</NavDropdown.Item>
                                <NavDropdown.Item className="item"  onClick={() => {
                                    return handleFilter('ancho', '165');
                                }}>165</NavDropdown.Item>
                                <NavDropdown.Item className="item"  onClick={() => {
                                    return handleFilter('ancho', '175');
                                }}>175</NavDropdown.Item>
                                <NavDropdown.Item className="item"  onClick={() => {
                                    return handleFilter('ancho', '185');
                                }}>185</NavDropdown.Item>
                                <NavDropdown.Item className="item"  onClick={() => {
                                    return handleFilter('ancho', '195');
                                }}>195</NavDropdown.Item>
                                <NavDropdown.Item className="item"  onClick={() => {
                                    return handleFilter('ancho', '205');
                                }}>205</NavDropdown.Item>
                                <NavDropdown.Item className="item"  onClick={() => {
                                    return handleFilter('ancho', '215');
                                }}>215</NavDropdown.Item>
                                <NavDropdown.Item className="item"  onClick={() => {
                                    return handleFilter('ancho', '225');
                                }}>225</NavDropdown.Item>
                                <NavDropdown.Item className="item"  onClick={() => {
                                    return handleFilter('ancho', '235');
                                }}>235</NavDropdown.Item>
                                <NavDropdown.Item className="item"  onClick={() => {
                                    return handleFilter('ancho', '245');
                                }}>245</NavDropdown.Item>
                                <NavDropdown.Item className="item"  onClick={() => {
                                    return handleFilter('ancho', '255');
                                }}>255</NavDropdown.Item>
                                <NavDropdown.Item className="item"  onClick={() => {
                                    return handleFilter('ancho', '265');
                                }}>265</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown disabled={this.state.inactive} className="drop" title="Perfil" id="collasible-nav-dropdown">
                                <NavDropdown.Item className="item" onClick={() => {
                                    return handleFilter('perfil', '10.5');
                                }} >10.5</NavDropdown.Item>
                                <NavDropdown.Item className="item" onClick={() => {
                                    return handleFilter('perfil', '40');
                                }}>40</NavDropdown.Item>
                                <NavDropdown.Item className="item" onClick={() => {
                                    return handleFilter('perfil', '45');
                                }}>45</NavDropdown.Item>
                                <NavDropdown.Item className="item" onClick={() => {
                                    return handleFilter('perfil', '50');
                                }}>50</NavDropdown.Item>
                                <NavDropdown.Item className="item" onClick={() => {
                                    return handleFilter('perfil', '55');
                                }}>55</NavDropdown.Item>
                                <NavDropdown.Item className="item" onClick={() => {
                                    return handleFilter('perfil', '60');
                                }}>60</NavDropdown.Item>
                                <NavDropdown.Item className="item" onClick={() => {
                                    return handleFilter('perfil', '65');
                                }}>65</NavDropdown.Item>
                                <NavDropdown.Item className="item" onClick={() => {
                                    return handleFilter('perfil', '70');
                                }}>70</NavDropdown.Item>
                                <NavDropdown.Item className="item" onClick={() => {
                                    return handleFilter('perfil', '265');
                                }}>75</NavDropdown.Item>
                                <NavDropdown.Item className="item" onClick={() => {
                                    return handleFilter('perfil', '80');
                                }}>80</NavDropdown.Item>

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

top: 4rem;
position:fixed;
 z-index: 1;
 width: 100%;
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