import React, { Component } from 'react';
import AdminProductsView from './AdminProductsView';
import styled from 'styled-components';
import AdminUploadProduct from './AdminUploadProduct';
import { Link } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
export default class AdminHomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            products: []
        }
    }

    getProducts = (wait) => {
        scroll.scrollToTop();
        this.setState({ isLoading: true });
        console.log('Capturando productos')
        fetch('https://elcalabres.com.ar/notes/')
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(products => {
                console.log(products)
                this.setState({ products: [...products] });
                return products;
            })
            .then((products) => {
                setTimeout(() => this.setState({ isLoading: false }), wait);

            });
    }

    componentDidMount = () => {
        scroll.scrollToTop();
        this.getProducts(3000);
        let userValidation = sessionStorage.getItem('isLoged');
        console.log('Products un home');
        console.log(this.state.products);
        if (!userValidation) {
            this.props.history.push("/home");
        }
        
    }
    componentDidUpdate() {
        scroll.scrollToTop();
    }

    refresh = () => {
        console.log('Refreshing data');
        window.location.reload();
       //let products = this.getProducts(3000);
        //this.setState({ products: products });
    }


    handleUpload = (time) => {
        console.log('Handling loading! ' + time);

        this.getProducts(500);
        scroll.scrollToTop();
        console.log('Submited!');
        setTimeout(() => {
            this.setState({ isLoading: false });
        }, 6000);
    }
   

    render() {
        return (
            <AdminHomePageContainer>

                {this.state.isLoading ?
                    <div className="spinner">
                        <div id="loader">
                            <Loader
                                id="loader"
                                type="Puff"
                                color="#00BFFF"
                                height={200}
                                width={200}
                                timeout={0}
                            />
                        </div>

                    </div> :
                    <div>
                        <AdminProductsView products={[...this.state.products]} />
                        <AdminUploadProduct handleUpload={this.handleUpload} handleRefreshPage={this.refresh} />
                        <div id="btn-container" class="container">
                            <Link to="/productsSoldList">
                                <button id="despacho" class="btn-primary">Ventas para despachar</button>
                            </Link>
                        </div>
                    </div>
                }
            </AdminHomePageContainer>
        );
    }
}

const AdminHomePageContainer = styled.nav`
height: 100%;

.container{
text-align:center;
}
#btn-container{

text - align:center;
margin-bottom: 2rem;
padding: 1rem;
}
#despacho{
margin: 0 auto;

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

 }
`;