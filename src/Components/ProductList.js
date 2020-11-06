import React, { Component } from 'react';
import Product from './Product';
import Title from './Title';
import { ProductConsumer } from '../Context';
import FilterBar from './FilterBar';
import styled from 'styled-components';
import { animateScroll as scroll } from 'react-scroll';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ReactPixel from "react-facebook-pixel";
export default class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            priceFilter: '',
            widthFilter: '',
            brandFilter: '',
            title: '',
            productType: this.props.location.state ? this.props.location.state.productType : '',
            profile: '',
            rodado: '',
            isLoading: true
        }
    }
    componentDidUpdate() {
        scroll.scrollToTop();
    }
    componentDidMount() {
        const advancedMatching = { em: "some@email.com" }; // optional, more info: https://developers.facebook.com/docs/facebook-pixel/pixel-with-ads/conversion-tracking#advanced_match
        const options = {
          autoConfig: true, // set pixel's autoConfig
          debug: false, // enable logs
        };
        ReactPixel.init("1143009419162712", advancedMatching, options);
        console.log('Tipo de productos : '+this.state.productType)
        scroll.scrollToTop();
        let req = {
            method: "GET",
            headers: {
                "mode": 'cors',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }
        fetch('https://elcalabres.com.ar/notes/', req)
            .then(response => response.json())
            .then(json => {
                this.setState({ products: json });
                console.log(this.state.products)
                return json;
            })
            .then(resp => this.setState({ isLoading: false }));
    }

    filterByProduct = (products, type) => {

        return products.filter((item) => {
            return item.type === type;
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
            return item.company === brand;
        });
    }
    filterByWidth = (products, width) => {
        return products.filter((item) => {
            return item.width === width;
        });

    }
    filterByProfile = (products, profile) => {
        return products.filter((item) => {
            return item.profile === profile;
        });
    }

    filterByRodado = (products, rodado) => {
        return products.filter((item) => {
            return item.rodado === rodado;
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
        if (this.state.profile) {
            products = this.filterByProfile(products, this.state.profile);
        }
        if (this.state.rodado) {
            products = this.filterByRodado(products, this.state.rodado);
        }

        return products;
    }

    resetFilters = () => {
        this.setState({ brandFilter: '', widthFilter: '', priceFilter: '', productType: '', profile: '', rodado: '' })
    }

    handleFilter = (tipo, valor) => {
        ReactPixel.track('Search');
        console.log('HandleFilter : ' + tipo + 'Valor: ' + valor)
        let products = this.state.products;
        console.log('Tenemos sin filtrar' + products);

        switch (tipo) {
            case 'marcas':
                this.setState({ brandFilter: valor })
                break;
            case 'ancho':
                this.setState({ widthFilter: valor })
                break;
            case 'productos':
                this.setState({ productType: valor })
                break;
            case 'perfil':
                this.setState({ profile: valor })
                break;
            case 'rodado':
                this.setState({ rodado: valor })
                break;
            case 'reset':
                this.resetFilters();
                break;
            default: break;
        }

    }

    render() {

        return (
            <ProductListContainer>
                {this.state.isLoading ? <div className="spinner">
                    <div id="loader">
                        <Loader
                            type="Puff"
                            color="#00BFFF"
                            height={200}
                            width={200}
                            timeout={0}
                        />
                    </div>

                </div> :
                    <React.Fragment>
                        <FilterBar productType={this.state.productType} handleFilter={this.handleFilter} />

                        <div className="py-5">
                            <div className="container">
                                <div className="title-container">
                                    <Title name={this.state.productType} title={this.state.brandFilter} width={this.state.widthFilter} profile={this.state.profile} rodado={this.state.rodado} renderLogo="true" />

                                </div>
                                <div className="row">

                                    <ProductConsumer>
                                        {(value) => {

                                            let products = this.applyFilters(value.products);

                                            return products.map(product => {
                                                return <Product key={product.id} product={product} />
                                            })
                                        }}
                                    </ProductConsumer>

                                </div>
                            </div>
                        </div>
                    </React.Fragment>}
            </ProductListContainer>
        );
    }
}

const ProductListContainer = styled.div`
min-height: 30rem;
.container{ 
    margin-top: 7rem !important;
}

.spinner{
border: 2px solid white;
height: 25rem;
}

#loader{
width: 13%;
margin: 0 auto;
margin-top: 8rem;
}

 @media (max-width: 48em) {
.spinner{
border: 2px solid white;
}


#loader{

width: 50%;
text-aling:center;
}
`;