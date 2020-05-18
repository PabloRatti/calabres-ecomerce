import React, { Component } from 'react';
import Product from './Product';
import Title from './Title';
import { ProductConsumer } from '../Context';
import FilterBar from './FilterBar';
import {storeProducts} from '../data';

export default class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: storeProducts,
            priceFilter: '',
            widthFilter: '',
            brandFilter: ''
        }
    }

    filterByPrice = (products, maxPrice) => {
        return products.filter((item) => {
            return item.price <= maxPrice;
        });
    }
    
    filterByBrand = (products, brand) => {
        console.log('In filter by brand , returning' + brand)
        return products.filter((item) => {
            return item.company == brand;
        });
    }
    filterByWidth = (products, width) => {
        return products.filter((item) => {
            return item.width == width;
        });

    }

    applyFilters = (products) => {
        if (this.state.priceFilter) {
            products = this.filterByPrice(products, this.state.priceFilter);
        }
        if (this.state.widthFilter) {
            products = this.filterByWidth(products, this.state.widthFilter);
        }
        if (this.state.brandFilter) {
            products = this.filterByWidth(products, this.state.brandFilter);
        }
        return products;
    }

    handleFilter = (tipo, valor) => {
        console.log('HandleFilter : '+tipo +'Valor: '+valor)
        let products = this.state.products;  
        switch (tipo) {
            case 'marcas':                        
                this.filterByBrand(products,valor);
                console.log('Filtrando marcas'+this.state.brandFilter);
                break;
            case 'medida':
                this.filterByWidth(products,valor);
                console.log('Filtrando medidas'+this.state.widthFilter);
                break;
        }

        
    }

    render() {

        return (
            <React.Fragment>
                <FilterBar handleFilter={this.handleFilter} />
                <div className="py-5">
                    <div className="container">
                        <Title name="Nuestros" title="productos" />
                        <div className="row">
                            <ProductConsumer>
                                {(value) => {
                                   
                                    return value.products.map(product => {
                                        return <Product key={product.id} product={product} />
                                    })
                                }}
                            </ProductConsumer>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}