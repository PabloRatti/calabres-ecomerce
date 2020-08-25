import React, { Component } from 'react';
import styled from 'styled-components';
import AdminProductRow from './AdminProductRow';
import Title from './Title';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { animateScroll as scroll } from 'react-scroll';
export default class AdminProductsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [...this.props.products],
            loading: false
        }
    }

    deletePicture = (param) => {

        try {
            console.log('Getting image to delete param : ' + param)
            let myPic = param.slice(23);
            console.log('Deleting picture : ' + myPic);
            fetch('https://elcalabres.com.ar/notes/deletePicture/' + myPic, { method: 'POST', })
                .then(response => response.json());

        } catch (e) {
            console.log('No se encontro la imagen');
            console.log(e.getMessage())
            debugger;
        }
    }

    deletePublication = (id, aux) => {
        scroll.scrollToTop();
        //Data
        this.setState({ loading: true })
        fetch('https://elcalabres.com.ar/notes/' + id, { method: 'DELETE', })
            .then(response => {
                console.log(response);
                this.deletePicture(aux);
                return response.json();
            })
            .then(response => {
                console.log(response);
                this.setState({ products: response, loading: false });
            });
    }

    updatePublication = (id, newPrice) => {
        this.setState({ loading: true })
        console.log('Updating publication')

        let updateRequest = {
            method: "PUT",
            headers: {
                "mode": 'cors',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                price: newPrice
            })
        }
        console.log(updateRequest)
        console.log('httpss://elcalabres.com.ar/notes/update/' + id);
       
        fetch('https://elcalabres.com.ar/notes/update/' + id, updateRequest)
            .then(response => {                
                  return response.json()
            })
            .then(response => {
                console.log(response);                
                this.setState({ products: response, loading: false });
                console.log(this.state.products);
                
            });


    }


    //In aux is the name of the pic to delete in case of delete operation
    handleActions = (operation, id, aux) => {
        console.log('In handle operation aux value for img = ' + aux);
        //console.log('Delete operation triggered to '+operation+' : '+id);
        switch (operation) {
            case 'update':
                this.updatePublication(id, aux);
                break;
            case 'delete':
                this.deletePublication(id, aux);
                break;
            default:
                return null;
        }

    }

    render() {
        let products = this.state.products;
        return (
            <AdminProductsViewContainer>

                {this.state.loading ? <div className="spinner">
                    <div id="loader">
                        <Loader
                            type="Grid"
                            color="#00BFFF"
                            height={200}
                            width={200}
                            timeout={0}
                        />
                    </div>

                </div> : <div>
                        <div className="title">
                            <Title name="Controlador de " title="productos" />

                        </div>

                        {products.map((item) => {
                            return <AdminProductRow key={item.id} id={item.id} handleActions={this.handleActions} handleFilter={this.handleFilter} item={item} />
                        })}
                    </div>}


            </AdminProductsViewContainer>
        );
    }
}

const AdminProductsViewContainer = styled.nav`
height: 100%;
margin-bottom: 2rem;
border: 1px solid white;
.title{  
    margin-top: 6rem !important;
    height: 8rem;
}
.spinner{  
   height:25rem;
}

#loader{    
    width: 10%;    
    margin: 0 auto;
    margin-top:10rem;
}

`;