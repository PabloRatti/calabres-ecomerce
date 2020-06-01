import React, { Component } from 'react';
import Product from './Product';
import Title from './Title';
import { ProductConsumer } from '../Context';
import FilterBar from './FilterBar';
import { storeProducts } from '../data';


export default class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            priceFilter: '',
            widthFilter: '',
            brandFilter: '',
            title: '',
            productType: ''
        }
    }

    componentDidMount() {
        /*
        fetch('http://localhost:4000/notes/')
            .then(response => response.json())
            .then(json => {
                this.setState({ products: json });
                console.log(this.state.products)
                return json;
            });

        */
    }

    filterByProduct = (products, type) => {
        return products.filter((item) => {
            return item.type == type;
        });
    }

    filterByPrice = (products, maxPrice) => {
        return products.filter((item) => {
            return item.price <= maxPrice;
        });
    }

    filterByBrand = (products, brand) => {
        console.log('In filter by brand , returning ' + brand)
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

        if (this.state.productType) {
            products = this.filterByProduct(products, this.state.productType);  
        }
        if (this.state.priceFilter) {
            products = this.filterByPrice(products, this.state.priceFilter);
        }
        if (this.state.widthFilter) {
            products = this.filterByWidth(products, this.state.widthFilter);
        }
        if (this.state.brandFilter) {
            products = this.filterByBrand(products, this.state.brandFilter);
        }

        return products;
    }

    handleFilter = (tipo, valor) => {
        console.log('HandleFilter : ' + tipo + 'Valor: ' + valor)
        let products = this.state.products;
        console.log('Tenemos sin filtrar' + products);

        switch (tipo) {
            case 'marcas':
                this.setState({ brandFilter: valor })
                break;
            case 'medida':
                this.setState({ widthFilter: valor })
                break;
            case 'productos':
                this.setState({ productType: valor })
                break;
            case 'reset':
                this.setState({ brandFilter: '', widthFilter: '', priceFilter: '', productType: '' })
                break;
        }

    }

    render() {

        return (
            <React.Fragment>
                <FilterBar handleFilter={this.handleFilter} />
                <div className="py-5">
                    <div className="container">
                        <Title name={this.state.productType} title={this.state.brandFilter} renderLogo="true" />
                        <div className="row">
                            <ProductConsumer>
                                {(value) => {
                                    console.log('Products provided in consumer : ');
                                    console.log(value.products)
                                    let products = this.applyFilters(value.products);
                                  
                                    return products.map(product => {
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