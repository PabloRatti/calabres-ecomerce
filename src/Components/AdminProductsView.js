import React, { Component } from 'react';
import styled from 'styled-components';

import AdminProductRow from './AdminProductRow';

import Title from './Title';
export default class AdminProductsView extends Component {
    constructor() {
        super();
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        this.getProducts();
    }

    getProducts = () => {
        fetch('http://localhost:4000/notes/')
            .then(response => response.json())
            .then(json => {
                this.setState({ products: json });
                return json;
            });
    }
    deletePicture = (param) => {
        try {

            let myPic = param.slice(4);
            console.log('Deleting picture : ' + myPic);
            fetch('http://localhost:4000/notes/deletePicture/' + myPic, { method: 'POST', })
                .then(response => response.json())
                .then(json => {
                    this.getProducts();
                    return json;
                });
        } catch (e) {
            console.log(e.getMessage())
        }
    }

    deletePublication = (id, aux) => {
        //Picture
        this.deletePicture(aux);
        //Data
        fetch('http://localhost:4000/notes/' + id, { method: 'DELETE', })
            .then(response => response.json())
            .then(json => {
                this.getProducts();
                return json;
            });


    }

    //In aux is the name of the pic to delete in case of delete operation
    handleOperation = (operation, id, aux) => {
        console.log('In handle operation aux value for img = ' + aux);
        //console.log('Delete operation triggered to '+operation+' : '+id);
        switch (operation) {
            case 'delete':
                this.deletePublication(id, aux);
                break;
            case 'update':

                break;
            default : break;
        }

    }
    render() {
        let products = this.state.products;
        return (
            <AdminProductsViewContainer>
                <Title name="Controlador de " title="productos" />

                {products.map((item) => {
                    return <AdminProductRow type={item.type} id={item._id} handleOperation={this.handleOperation} handleFilter={this.handleFilter} brand={item.company} title={item.title} img={item.img} price={item.price} />
                })}

            </AdminProductsViewContainer>
        );
    }
}

const AdminProductsViewContainer = styled.nav`


height: 100%;
margin-bottom: 2rem;

`;