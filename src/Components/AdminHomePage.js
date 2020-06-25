import React, { Component } from 'react';
import AdminProductsView from './AdminProductsView';
import styled from 'styled-components';
import AdminUploadProduct from './AdminUploadProduct';
import { Link } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
export default class AdminHomePage extends Component {

    componentDidMount = () => {
        let userValidation = sessionStorage.getItem('isLoged');
        console.log('Is loged ? : ' + userValidation);
        if (!userValidation) {
            this.props.history.push("/");
        }
        scroll.scrollToTop();
    }
    render() {
        return (
            <AdminHomePageContainer>
                <AdminProductsView />
                <AdminUploadProduct />
                <div id="btn-container" class="container">
                    <Link to="/productsSoldList">
                        <button id="despacho" class="btn-primary">Ventas para despachar</button>
                    </Link>
                </div>
            </AdminHomePageContainer>
        );
    }
}

const AdminHomePageContainer = styled.nav`
height: 100%;

#btn-container{
 
    text-align:center;
    margin-bottom: 2rem;
    padding: 1rem;
}
#despacho{
   margin: 0 auto;
}
`;