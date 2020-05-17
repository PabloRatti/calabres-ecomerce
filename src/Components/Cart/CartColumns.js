import React from 'react';

export default function CartColumns(){
    return(
        <div className="container-fluid text-center d-none d-lg-block">
            <div className="row">
                <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase">Productos</p>
                </div>
                <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase">nombre del producto</p>
                </div>
                <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase">precio</p>
                </div>
                <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase">stock</p>
                </div>
                <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase">eliminar</p>
                </div>
                <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase">total</p>
                </div>
                
            </div>
        </div>
    );
}




