import React from 'react';
import styled from 'styled-components';
import ProductsSold from './ProductsSold';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Title from './Title';
import { Link } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
export default class ProductsSoldList extends React.Component {
    constructor() {
        super();
        this.state = {
            tickets: [],
            products: [],
            fullTickets: [],
            loading: true,
            isEmpty: true
        }
    }

    componentDidMount() {
        this.getTickets();
        this.getProductsRelatedToTickets();
        setTimeout(() => {
            this.generateFullTickets();
            this.setState({ loading: false, })
        }, 3000);
        scroll.scrollToTop();
    }

    getTickets = () => {
        fetch('http://localhost:4000/notes/getTickets/getAll')
            .then(response => response.json())
            .then(json => {
                this.setState({ tickets: json });

                return json;
            });
    }

    //Generate a full ticket with products related
    generateFullTickets = () => {
        console.log('In generate full tickets');
        let tickets = this.state.tickets;
        let products = this.state.products;
        let fullTickets = [];

        tickets.map((ticket) => {
            //console.log('Generando ticket N : ' + ticket.id);
            let ticketProducts = [];


            for (let i = 0; i < products.length; i++) {

                if (ticket.id === products[i].sellId) {

                    ticketProducts.push(products[i]);
                }
            }

            let fullTicket = {
                ticket: ticket,
                products: ticketProducts
            }
            fullTickets.push(fullTicket);
            return null;

        });
        this.setState({ fullTickets: fullTickets, isEmpty: false });
        console.log(this.state.fullTickets[0]);
    }

    getProductsRelatedToTickets = () => {
        fetch('http://localhost:4000/notes/getTicketsProducts/getAll')
            .then(response => response.json())
            .then(json => {
                this.setState({ products: json });

                return json;
            });
    }
    render() {
        return (
            <ProductsSoldListContainer>
                <div id="main-title">
                    <Title name="Despacho de" title="productos" />
                </div>
                <br />
                <br />


                <div className="loading" hidden={!this.state.loading}>
                    <div className="spinner">
                        <Loader
                            type="Grid"
                            color="#00BFFF"
                            height={100}
                            width={100}
                            timeout={0}
                        />
                    </div>

                </div>
                <div hidden={this.state.loading} class="productContainer">
                    {this.state.fullTickets.map((item) => {
                        return <div className="product-container"><ProductsSold key={item.id} ticket={item.ticket} products={item.products} /></div>
                    })}
                    <div className="warning">

                        <Link to="/adminHome">
                            <button class="btn-primary" id="back">Volver</button>
                        </Link>

                    </div>

                </div>

            </ProductsSoldListContainer>


        );
    }
}
const ProductsSoldListContainer = styled.div`
padding:2rem;
min-height: 35rem;

.warning{
    margin: 0 auto;
    text-align:Center;   
}
.product-container{
    height:100%;   
}
#main-title{
    margin-top: 5rem;
}
#back{
    margin-top: 3rem;
}
.loading{
    margin: 0 auto;
 
    text-align: center;

   
}
.spinner{ 
    width: 20rem;
    margin: 0 auto;
}
.title-container{
    text-align:center;
}
.title{
    margin-top: 10rem !important;
}

 @media (max-width: 48em) {


 }
`;



/*





                */