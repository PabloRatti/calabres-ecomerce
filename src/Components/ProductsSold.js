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
        fetch('https://elcalabres.com.ar/notes/deleteTicket/' + id, { method: 'DELETE', })
            .then(response => response.json())
            .then(json => {


            });
    }

    deleteProductsFromTicket = (ticketId) => {
        //Eliminar productos
        fetch('https://elcalabres.com.ar/notes/deleteProductsFromTicket/' + ticketId, { method: 'DELETE', })
            .then(response => response.json())
            .then(json => {


            });
    }
    render() {
        const { name, userEmail,phone, localidad, postalCode, id, total, identity_number, dir_Remitente } = this.props.ticket;
        let count = 0;
        return (
            <ProductSoldContainer>
                <div class="row">
                    <div className="titulo">
                        <h2 >Solicitud de  {name}</h2>

                    </div>
                </div>
                <div class="row">
                    <div id="col" class="col">

                        <div id="ticket-container">
                            Titular : {name} <br />
                            DNI : {identity_number} <br />
                            Ticket Id : {id} <br />
                            Email : {userEmail} <br/>
                            Telefono : {phone} <br />
                            Localidad : {localidad} <br />
                            Sucursal destino : {dir_Remitente} <br />
                            Codigo postal : {postalCode} <br />
                            Total : ${total} <br />

                            <button disabled={this.state.dispatched} onClick={this.submitHandler} type="submit" id="despachar" class="btn-primary">Despachar</button>

                            <br />


                        </div>

                    </div>
                </div>
                <div id="productsList">
                  
                                {this.props.products.map((product) => {
                                    return (
                                        <div key={product.id} className="prod-container">
                                            <h4>Producto  {count = count + 1}</h4>

                                        Marca : {product.company}<br />
                                        Modelo : {product.title}<br />
                                        Ancho : {product.width}<br />
                                        Perfil : {product.profile}<br />
                                        Rodado : {product.rodado}<br />
                                        Cantidad : {product.cant}<br />


                                        </div>
                                    );
                                })}

                          
                  
              
                        <div className="dispatched-container">
                            <h1 className="dispatched" hidden={!this.state.dispatched}>DESPACHADO</h1>
                        
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
height: 100%;
position:relative;
margin: 0 auto;

#productsList{
    text-align:center;
    
    margin-top: 1rem;
    height:100%;
}
.col{
    margin:0 auto;
}

}
.dispatched-container{
   
    position:absolute;
    border-radius: 1rem;
    margin: 0 auto;
    top:10rem;
    
    left: 10rem;
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
     width:20%;
     display:inline-block;
     margin: 0 auto !important;
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

 @media (max-width: 48em) {
.prod-container{
    max-height:100%;
    width:60%;
    text-align: none;
     word-wrap: break-word;
}
.dispatched-container{
    left:2rem;
}
 }
`;