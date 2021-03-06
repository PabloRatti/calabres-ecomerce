import React, { Component } from 'react';
import ReactPixel from "react-facebook-pixel";
const ProductContext = React.createContext();
//Provider
//Consumer

class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: [],
        cart: [],
        modalOpen: false,
        modalProduct: [],
        cartSubtotal: 0,
        cartTax: 0,
        cartTotal: 0,
        onLoad: true

    }

    componentDidMount() {
    
        let req = {
            method: "GET",
            headers: {
                "mode": 'CORS',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                
            }
        }
      
      
        fetch('https://elcalabres.com.ar/notes/', req)
            .then(response => response.json())
            .then(json => {
                this.setState({ products: json });
                return json;
            });
    }


    getItem = (id) => {
        const product = this.state.products.find(item =>
            item.id === id);
        return product;
    }

    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return { detailProduct: product }
        });
    }

    addToCart = (id) => {
        ReactPixel.track('AddToCart');
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        this.setState(() => {
            return {
                products: tempProducts,
                cart: [...this.state.cart, product]
            };

        }, () => {
            this.addTotals(); //Hace los calculos 
        });
    };

    openModal = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return {
                modalProduct: product,
                modalOpen: true
            }
        });
    };

    closeModal = () => {
        this.setState(() => {
            return { modalOpen: false }
        });
    };

    increment = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count + 1;
        product.total = product.count * product.price;

        this.setState(() => {
            return { cart: [...tempCart] }
        }, () => {
            this.addTotals();
        })
    };

    decrement = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count - 1;
        product.total = product.count * product.price;
        if (product.count === 0) {
            this.removeItem(id);
        } else {
            product.total = product.count * product.price;
            this.setState(() => {
                return { cart: [...tempCart] }
            }, () => {
                this.addTotals();
            })
        };

    }


    removeItem = (id) => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item => item.id !== id);
        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        this.setState(() => {
            return {
                cart: [...tempCart],
                products: [...tempProducts],
            }
        }, () => {
            this.addTotals();
        })
    };


    clearCart = () => {

        this.setState(() => {
            return { cart: [] };
        }, () => {
            //this.setProducts();
            this.addTotals();
        });
    };

    addTotals = () => {
        let subTotal = 0;
        this.state.cart.map(item => (subTotal += item.total));
        const tempTax = subTotal * 0.0;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        this.setState(() => {
            return {
                cartSubtotal: subTotal,
                cartTax: tax,
                cartTotal: total
            }
        })
    }

    creditPay = (e) => {
        let obj = e;
        console.log('Trying to pay with credit card an amount of : ' + obj);
        console.log(obj.target.value);
    }
    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                creditPay: this.creditPay,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart

            }}>

                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };