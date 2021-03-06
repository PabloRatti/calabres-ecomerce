import React, { Component } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import styled from 'styled-components';

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
            rodado: '',
            marca: '',
            isLoading: false,
            disableButton: false
        }
    }

    submitHandler = () => {
        const { handleUpload } = this.props;
        console.log('Submited!!!!')
        this.setState({disableButton : true})
        setTimeout(() => {
            this.setState({ disableButton: false })
            return handleUpload(8000);
        }, 2000);
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

    rodadoHandler = (e) => {
        console.log('Inside rodado handler: ' + e)
        this.setState({ rodado: e })
    }

    render() {

        return (
            <DropZoneContainer>
                <h1 className="carga-title" >Carga de productos</h1>
                <br />
                <br />

                <div>

                    <form onSubmit={this.submitHandler} action='https://elcalabres.com.ar/notes' method="POST" encType="multipart/form-data">
                        <div className="row my-2 text-capitalize text-center">
                            <div className="col-10 mx-auto col-lg-2">
                                <DropdownButton id="dropdown-basic-button" title="Producto">
                                    <Dropdown.Item onClick={() => {
                                        return this.productoHandler('neumatico');
                                    }} name="producto" value="Neumatico" id="producto">Neumatico</Dropdown.Item>
                                    <Dropdown.Item name="producto" onClick={() => {
                                        return this.productoHandler('llantas');
                                    }} value="Llanta" id="producto">Llanta</Dropdown.Item>
                                </DropdownButton>
                            </div>
                            <div className="col-10 mx-auto col-lg-2">
                                <DropdownButton id="dropdown-basic-button" title="Marca">
                                    <Dropdown.Item onClick={() => {
                                        return this.marcaHandler('pirelli');
                                    }}>Pirelli</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        return this.marcaHandler('formula energy');
                                    }}>Formula Energy</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        return this.marcaHandler('firestone');
                                    }}>Firestone</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        return this.marcaHandler('michellin');
                                    }}>Michellin</Dropdown.Item>                       
                                    <Dropdown.Item onClick={() => {
                                        return this.marcaHandler('westlake');
                                    }}>Westlake</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        return this.marcaHandler('tango');
                                    }}>Tango</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        return this.marcaHandler('windforce');
                                    }}>Windforce</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        return this.marcaHandler('fate');
                                    }}>Fate</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        return this.marcaHandler('bridgestone');
                                    }}>Bridgestone</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        return this.marcaHandler('continental');
                                    }}>Continental</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        return this.marcaHandler('goodyear');
                                    }}>Goodyear</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        return this.marcaHandler('nexen');
                                    }}>Nexen</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        return this.marcaHandler('cooper');
                                    }}>Cooper</Dropdown.Item>
                                   
                                </DropdownButton>
                            </div>
                            <div className="col-10 mx-auto col-lg-2">
                                <DropdownButton id="dropdown-basic-button" title="Ancho">
                                    <Dropdown.Item onClick={() => {
                                        return this.anchoHandler('31');
                                    }}>31</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        return this.anchoHandler('165');
                                    }}>165</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        return this.anchoHandler('175');
                                    }}>175</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        return this.anchoHandler('185');
                                    }}>185</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        return this.anchoHandler('195');
                                    }}>195</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        return this.anchoHandler('205');
                                    }}>205</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        return this.anchoHandler('215');
                                    }}>215</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        return this.anchoHandler('225');
                                    }}>225</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        return this.anchoHandler('235');
                                    }}>235</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        return this.anchoHandler('245');
                                    }}>245</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        return this.anchoHandler('255');
                                    }}>255</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        return this.anchoHandler('265');
                                    }}>265</Dropdown.Item>
                                </DropdownButton>
                            </div>
                            <div className="col-10 mx-auto col-lg-2">
                                <DropdownButton id="dropdown-basic-button" title="Perfil">
                                    <Dropdown.Item onClick={() => {
                                        return this.perfilHandler('10.5');
                                    }}>10.5</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        return this.perfilHandler('40');
                                    }}>40</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        return this.perfilHandler('45');
                                    }}>45</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        return this.perfilHandler('50');
                                    }}>50</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        return this.perfilHandler('55');
                                    }}>55</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        return this.perfilHandler('60');
                                    }}>60</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        return this.perfilHandler('65');
                                    }}>65</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        return this.perfilHandler('70');
                                    }}>70</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        return this.perfilHandler('75');
                                    }}>75</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        return this.perfilHandler('80');
                                    }}>80</Dropdown.Item>
                                </DropdownButton>
                            </div>
                            <div className="col-10 mx-auto col-lg-2">
                                <DropdownButton id="dropdown-basic-button" title="Rodado">
                                    <Dropdown.Item onClick={() => {
                                        return this.rodadoHandler('12');
                                    }}>12</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        return this.rodadoHandler('13');
                                    }}>13</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        return this.rodadoHandler('14');
                                    }}>14</Dropdown.Item>                        
                                    <Dropdown.Item onClick={() => {
                                        return this.rodadoHandler('15');
                                    }}>15</Dropdown.Item>                                    
                                    <Dropdown.Item onClick={() => {
                                        return this.rodadoHandler('16');
                                    }}>16</Dropdown.Item>                                    
                                    <Dropdown.Item onClick={() => {
                                        return this.rodadoHandler('17');
                                    }}>17</Dropdown.Item>                                    
                                    <Dropdown.Item onClick={() => {
                                        return this.rodadoHandler('18');
                                    }}>18</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        return this.rodadoHandler('19');
                                    }}>19</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        return this.rodadoHandler('20');
                                    }}>20</Dropdown.Item>

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
                            <div className="col-10 mx-auto col-lg-2">
                                {this.state.rodado}
                            </div>

                        </div>
                        <div className="row mt-5 my-2 text-capitalize text-center">
                            <div className="col-10 mx-auto col-lg-2">
                                <input type="file" name="file" id="file" ref={this.myFile} onChange={this.imageHandler} />
                            </div>
                            <div className="col-10 mx-auto col-lg-2">
                                <input type="text" name="price" placeholder="Valor..." />
                            </div>
                            <div className="col-10 mx-auto col-lg-2">
                                <input type="text" name="title" id="title" placeholder="Titulo/modelo" />
                            </div>

                        </div>

                        <div id="last-row" className="row mt-5 my-2">
                            <div id="info-container" className="col-10 mx-auto col-lg-2">
                                <textarea type="text" name="info" id="info" placeholder="Descripcion..." ></textarea>
                            </div>

                            <button disabled={this.state.disableButton} type="submit" id="submit" class="btn btn-outline-success">Guardar</button>
                            {/*<input className="submit" type="submit" value="Guardar" />*/}

                        </div>
                        <div className="col-10 mx-auto col-lg-2"  >
                        </div>

                        <div hidden={true}>
                            <input type="text" id="type" name="type" readOnly={true} value={this.state.producto} hidden={true} />
                            <input type="text" id="company" name="company" value={this.state.marca} hidden={true} />
                            <input type="text" id="profile" name="profile" value={this.state.perfil} hidden={true} />
                            <input type="text" id="width" name="width" value={this.state.ancho} hidden={true} />
                            <input type="text" id="rodado" name="rodado" value={this.state.rodado} hidden={true} />
                        </div>
                    </form>
                </div>
            </DropZoneContainer>
        );
    }
}


const DropZoneContainer = styled.div`
border: 2px solid var(--mainBlue);
border-radius: 2rem;
height: 25rem;
width: 90%;
margin: 0 auto;
text-align: center;
margin-bottom: 2rem;

#last-row{   
    height: 7rem;
    width: 60%;
    margin: 0 auto;

}

.btn-container{    
    width: 50%;  
    margin-right: 0rem;
    margin-left: 0rem;     
}

#info-container{   
    width: 40%;
    margin: 0 auto;    
}

#info{
   width: 15rem;    
}

#descripcion{    
    width: 15rem !important;
}
#submit{
    margin: 0 auto;
    height: 50%;   
}

.carga-title{
    margin: 0 auto;
}
@media (max-width: 48em) {
  display: none;
}
`;


