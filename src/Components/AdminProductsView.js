import React, { Component } from 'react';
import styled from 'styled-components';
import {storeProducts} from '../data';
import AdminProductRow from './AdminProductRow';
import AdminProductsColumns from './AdminProductsColumns';
import Title from './Title';
export default class AdminProductsView extends Component {
  

    render() {
        return (
            <AdminProductsViewContainer>
                <Title name="Controlador de " title="productos" />
                                  
                {storeProducts.map((item)=>{
                    return <AdminProductRow brand={item.company} title={item.title} img={item.img} />
                })}
           
            </AdminProductsViewContainer>
        );
    }
}

const AdminProductsViewContainer = styled.nav`


height: 100%;
margin-bottom: 2rem;

`;