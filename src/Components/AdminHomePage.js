import React, { Component } from 'react';
import AdminProductsView from './AdminProductsView';
import styled from 'styled-components';
import AdminUploadProduct from './AdminUploadProduct';
export default class AdminHomePage extends Component {

    componentDidMount = () => {
        let userValidation = sessionStorage.getItem('isLoged');
        console.log('Is loged ? : ' + userValidation);
        if (!userValidation) {
            this.props.history.push("/");
        }
    }
    render() {
        return (
            <AdminHomePageContainer>
               
                <AdminProductsView />
                <AdminUploadProduct />
            </AdminHomePageContainer>
        );
    }
}

const AdminHomePageContainer = styled.nav`
height: 100%;

`;