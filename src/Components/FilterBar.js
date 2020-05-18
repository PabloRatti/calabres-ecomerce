import React, { Component } from 'react';
import styled from 'styled-components';
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
export default class FilterBar extends Component {
   

    render() {
        const { handleFilter } = this.props;

        return (

            <FilterBarContainer>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="#home">Filtros</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">

                            <NavDropdown className="drop" title="Marca" id="collasible-nav-dropdown">
                                <div className="itemsContainer">
                                    <NavDropdown.Item onClick={() => {
                                        return handleFilter('marcas', 'Pirelli');
                                    }}>
                                        Pirelli
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => {
                                        return handleFilter('marcas', 'Firestone');
                                    }}> Firestone</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => {
                                        return handleFilter('marcas', 'Michellin');
                                    }}>Michellin</NavDropdown.Item>

                                </div>
                            </NavDropdown>
                            <NavDropdown className="drop" title="Medida" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">50</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">22</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">43</NavDropdown.Item>

                            </NavDropdown>
                            <NavDropdown className="drop" title="Ancho" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">23.22</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">40.44</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">67.77</NavDropdown.Item>

                            </NavDropdown>
                            <NavDropdown className="drop" title="Tipo de vehiculo" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Auto</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Camioneta</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Pickup</NavDropdown.Item>

                            </NavDropdown>
                        </Nav>

                    </Navbar.Collapse>
                </Navbar>
            </FilterBarContainer>
        );
    }
}

const FilterBarContainer = styled.div`  
   .drop{       
       margin-left: 4rem;
   }
   .itemsContainer{
      
       
   }
   .
`;