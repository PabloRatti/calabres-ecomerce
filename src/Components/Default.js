import React, { Component } from 'react';

export default class Default extends Component {
    render() {
        console.log(this.props)
        return (
            <div className="container">
                <div className="row">
                    <div className="col-10 mx-auto text-center text-title text-ippercase pt-5">
                        <h1 className="display-3">404</h1>
                        <h1>error</h1>
                        <h2>no se encontro la pagina o se encuentra en mantenimiento</h2>
                        <h3>URL solicitada 
                        <span className="text-danger">
                                {this.props.location.pathname}
                            </span>
                            {" "}
                         inexistente...
                        </h3>
                    </div>
                </div>


            </div>
        );
    }
}