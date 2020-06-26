import React from 'react';
import styled from 'styled-components';



export default class ProductSold extends React.Component {
    constructor() {
        super();
        this.state = {
            dispatched: false
        }
    }

    submitHandler = () => {
        const { id } = this.props.ticket;
        console.log('Dispatching id : ' + id);
        this.deleteProductsFromTicket(id);
        this.deleteTicket(id);
        this.setState({ dispatched: true });
    }

    deleteTicket = (id) => {
        //Eliminar Ticket
        fetch('http://localhost:4000/notes/deleteTicket/' + id, { method: 'DELETE', })
            .then(response => response.json())
            .then(json => {


            });
    }

    deleteProductsFromTicket = (ticketId) => {
        //Eliminar productos
        fetch('http://localhost:4000/notes/deleteProductsFromTicket/' + ticketId, { method: 'DELETE', })
            .then(response => response.json())
            .then(json => {


            });
    }
    render() {
        const { name, phone, localidad, postalCode, id, total, identity_number, dir_Remitente } = this.props.ticket;
        let count = 0;
        return (
            <ProductSoldContainer>
                <div class="row">
                    <div className="titulo">
                        <h2 >Solicitud de : {name}</h2>

                    </div>
                </div>
                <div class="row">
                    <div id="col" class="col">
                        {this.props.products.map((product) => {
                            return (
                                <div key={product.id} className="prod-container">
                                    <h4>Producto : {count = count + 1}</h4>

                                        Marca : {product.company}<br />
                                        Modelo : {product.title}<br />
                                        Ancho : {product.width}<br />
                                        Perfil : {product.profile}<br />
                                        Rodado : {product.rodado}<br />
                                        Cantidad : {product.cant}<br />


                                </div>
                            );
                        })}

                    </div>

                    <div id="col" class="col">

                        <div id="ticket-container">
                            Titular : {name} <br />
                            DNI : {identity_number} <br />
                            Ticket Id : {id} <br />
                            Telefono : {phone} <br />
                            Localidad : {localidad} <br />
                            Sucursal destino : {dir_Remitente} <br />
                            Codigo postal : {postalCode} <br />
                            Total : ${total} <br />

                            <button disabled={this.state.dispatched} onClick={this.submitHandler} type="submit" id="despachar" class="btn-primary">Despachar</button>

                            <br />


                        </div>

                    </div>
                    <div class="col">
                        <div className="dispatched-container">
                            <h1 className="dispatched" hidden={!this.state.dispatched}>DESPACHADO</h1>
                        </div>
                    </div>
                </div>


            </ProductSoldContainer>
        );
    }
}


const ProductSoldContainer = styled.div`  

border-style: outset;

padding: 1rem;
margin-bottom: 5rem;
height: 30rem;
position:relative;
margin: 0 auto;
#col{
    
    text-align: center;
}
.dispatched-container{
   
    position:absolute;
    border-radius: 1rem;
    margin: 0 auto;
    margin-top: 2rem;
    left: 2rem;
}

.dispatched{
   color:red;
    
}
.titulo{
    margin: 0 auto;
    text-align:center;
    margin-bottom: 2rem;
}
.prod-container{
   border: 2px solid black;
   padding: 1rem;
    width: 70%;
    margin-right: 0 !important;
}
#ticket-container{
    
    width: 100%;
    text-align: center;
    max-height: 100% ;
   
    margin: 0 auto;

  
}


#despachar{
    margin: 0 auto !important;
    margin-top: 3rem !important;
}
`;