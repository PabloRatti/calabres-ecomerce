import React, { Component } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import styled from 'styled-components';
import { storeProducts } from '../data';

export default class AdminUploadProduct extends Component {
    constructor() {
        super();
        this.myFile = React.createRef();
        this.state = {
            image: null,
            preview: '',
            description: '',
            producto: '',
            perfil: '',
            ancho: '',
            marca: ''

        }
    }
    submitHandler = () => {

    }

    imageHandler = (e) => {
        // this.setState({ image: e.target.value })
        console.log(this.myFile.current.files[0]);
    }

    descriptionHandler = (e) => {
        this.setState({ description: e.target.value })
    }

    productoHandler = (e) => {
        console.log('Inside product handler: ' + e)
        this.setState({ producto: e })
    }
    marcaHandler = (e) => {
        console.log('Inside marca handler: ' + e)
        this.setState({ marca: e })
    }

    anchoHandler = (e) => {
        console.log('Inside marca handler: ' + e)
        this.setState({ ancho: e })
    }

    perfilHandler = (e) => {
        console.log('Inside marca handler: ' + e)
        this.setState({ perfil: e })
    }

    render() {

        return (
            <DropZoneContainer>

                <form onSubmit={this.submitHandler} action='http://localhost:4000/upload' method="POST" enctype="multipart/form-data">
                    <div className="row my-2 text-capitalize text-center">
                        <div className="col-10 mx-auto col-lg-2">
                            <DropdownButton id="dropdown-basic-button" title="Producto">
                                <Dropdown.Item onClick={() => {
                                    return this.productoHandler('neumatico');
                                }} name="producto" value="Neumatico" id="producto">Neumatico</Dropdown.Item>
                                <Dropdown.Item name="producto" onClick={() => {
                                    return this.productoHandler('llanta');
                                }} value="Llanta" id="producto">Llanta</Dropdown.Item>
                            </DropdownButton>
                        </div>
                        <div className="col-10 mx-auto col-lg-2">
                            <DropdownButton id="dropdown-basic-button" title="Marca">
                                <Dropdown.Item onClick={() => {
                                    return this.marcaHandler('pirelli');
                                }}>Pirelli</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    return this.marcaHandler('firestone');
                                }}>Firestone</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    return this.marcaHandler('michellin');
                                }}>Michellin</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    return this.marcaHandler('fate o');
                                }}>Fate O</Dropdown.Item>
                            </DropdownButton>
                        </div>
                        <div className="col-10 mx-auto col-lg-2">
                            <DropdownButton id="dropdown-basic-button" title="Ancho">
                                <Dropdown.Item onClick={() => {
                                    return this.anchoHandler('ancho 1');
                                }}>Ancho 1</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    return this.anchoHandler('ancho 2');
                                }}>Ancho 2</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    return this.anchoHandler('ancho 3');
                                }}>Ancho 3</Dropdown.Item>
                            </DropdownButton>
                        </div>
                        <div className="col-10 mx-auto col-lg-2">
                            <DropdownButton id="dropdown-basic-button" title="Perfil">
                                <Dropdown.Item onClick={() => {
                                    return this.perfilHandler('perfil 1');
                                }}>Perfil 1</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    return this.perfilHandler('perfil 2');
                                }}>Perfil 2</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    return this.perfilHandler('perfil 3');
                                }}>Perfil 3</Dropdown.Item>
                            </DropdownButton>
                        </div>



                    </div>

                    <div className="row  my-2 text-capitalize text-center">

                        <div className="col-10 mx-auto col-lg-2">
                            {this.state.producto}
                        </div>
                        <div className="col-10 mx-auto col-lg-2">
                            {this.state.marca}
                        </div>
                        <div className="col-10 mx-auto col-lg-2">
                            {this.state.ancho}
                        </div>
                        <div className="col-10 mx-auto col-lg-2">
                            {this.state.perfil}
                        </div>

                    </div>
                    <div className="row mt-5 my-2 text-capitalize text-center">
                        <div className="col-10 mx-auto col-lg-2">
                            <input type="file" name="file" id="file" ref={this.myFile} onChange={this.imageHandler} />
                        </div>
                        <div className="col-10 mx-auto col-lg-2">
                            <input type="text" name="valorProducto" placeholder="Valor por unidad" />
                        </div>
                        <div className="col-10 mx-auto col-lg-2">
                            <input type="text" name="descripcion" id="descripcion" placeholder="Descripcion breve del producto" />
                        </div>
                        <div className="col-10 mx-auto col-lg-2">
                            <input type="submit" value="Guardar" />
                        </div>
                    </div>
                    <input type="text" id="producto" name="producto" value={this.state.producto} hidden="true" />
                    <input type="text" id="marca" name="marca" value={this.state.marca} hidden="true" />
                    <input type="text" id="perfil" name="perfil" value={this.state.perfil} hidden="true" />
                    <input type="text" id="ancho" name="ancho" value={this.state.ancho} hidden="true" />
                </form>

            </DropZoneContainer>
        );
    }
}


const DropZoneContainer = styled.div`
border: 2px solid red;
height: 20rem;
#descripcion{
    
    width: 15rem !important;
}
`;


