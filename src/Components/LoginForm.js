import React, { Component } from "react";
import styled from 'styled-components';
import { Image } from 'react-bootstrap';
import { animateScroll as scroll } from 'react-scroll';

export default class LoginForm extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount = () => {
        scroll.scrollToTop();
    }

    handleSubmit = () => {

        if (this.state.password == '123' && this.state.user == 'pablo') {
            alert('Bienvenido ! Calabres tienda E-Comerce');
            sessionStorage.setItem('isLoged', true);
            //Redireccionar a admin homepage
            this.props.history.push("/adminHome");     

        } else {
            alert('Datos incorrectos intente nuevamente');
        }


    }

    userHandler = (event) => {

        this.setState({
            user: event.target.value
        })

    }

    passwordHandler = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    render() {
        return (
            <FormPageContainer>



                <div className="py-5">
                    <div className="container">
                        <div className="row">
                            <div class="col-sm offset-md-1">
                                <div class="col-sm">
                                    <Image fluid className="loginImg mr-auto" src={require("../calabres-api/images/static/IMG-20200514-WA0072.jpg")} />
                                </div>
                            </div>
                            <div class="col-sm">
                                <div class="imgContainer col-sm">
                                    <form className="form-container" onSubmit={this.handleSubmit}>
                                        <h3 className="form-title">Login</h3>

                                        <label className="input-container">
                                            Usuario  <br />
                                            <input type="text" onChange={this.userHandler} />
                                        </label>
                                        <br />
                                        <label className="input-container">
                                            Contraseña  <br />
                                            <input type="password" onChange={this.passwordHandler} />
                                        </label>
                                        <br /><br />
                                        <input type="submit" value="Submit" />
                                    </form>                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </FormPageContainer>
        );
    }
}


const FormPageContainer = styled.nav`
    padding: 1rem;
    .input-container{
        margin-top: 1rem;
    }
    .form-title{
        margin-top:2rem;
    }
.loginImg{
    max-height: 30rem;
     border: 5px solid var(--mainBlue);
    border-radius: 2rem;
    
}
   
.form-container{
    
     box-shadow: 5px 10px #888888;

    border: 5px solid var(--mainBlue);
    border-radius: 2rem;
    height: 20rem;
    width: 50%;
    max-width: 50%;   
    text-align:center;
}

@media (max-width: 48em) {
    .loginImg{
        hidden: true;
        display: none;
    }
   .form-container{
     max-width: 70%;
     width: 70%;
     margin: 0 auto;
     margin-top: 2rem;

   }

   
    }

   
}
`;