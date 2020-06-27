import React, { Component } from 'react';
import styled from 'styled-components';
import Product from './Product';
import {ProductConsumer} from '../Context';
export default class HorizontalGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []            
        }
    }
    componentDidMount() {
     
        fetch('http://localhost:4000/notes/')
            .then(response => response.json())
            .then(json => {
                this.setState({ products: json });
                console.log(this.state.products)
                return json;
            });
    }
    render() {
        const randomProducts = this.state.products.slice(0,4);
        return (
            <HorizontalGalleryContainer>
                <div className="py-5">
                    <div className="container">
                        <div className="row">
                            <ProductConsumer>
                                {(value) => {
                                    return randomProducts.map(product => {
                                        return <Product key={product.id} product={product} />
                                    })
                                }}
                            </ProductConsumer>
                        </div>
                    </div>
                </div>
            </HorizontalGalleryContainer>
        );
    }
}

const HorizontalGalleryContainer = styled.div`   
  
  
   position:relative;
   width: 100%;
  
   @media (max-width: 48em) {
      
     
}
    
   
`;