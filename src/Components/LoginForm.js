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
    /*
        handleSubmit = () => {
    
            if (this.state.password === '123' && this.state.user === 'pablo') {
                alert('Bienvenido ! Calabres tienda E-Comerce');
                sessionStorage.setItem('isLoged', true);
                //Redireccionar a admin homepage
                this.props.history.push("/adminHome");     
    
            } else {
                alert('Datos incorrectos intente nuevamente');
            }
    
    
        }
    */
    handleSubmit = (e) => {
        e.preventDefault();
        let fetchData = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: this.state.user,
                password: this.state.password
            })
        }
        //Hacer el update
        fetch('https://elcalabres.com.ar/notes/adminLogin/', fetchData)
            .then(response => {
                console.log(response.status);                
                return response;
            })
            .then(json => {
                if (json.status === 200) {
                    alert('Bienvenido ! Calabres tienda E-Comerce');
                    sessionStorage.setItem('isLoged', true);
                    //Redireccionar a admin homepage
                    this.props.history.push("/adminHome");
                } else {
                    console.log('Incorrect login');
                    alert('Datos incorrectos, intente nuevamente...');
                    this.setState({user:'',password: ''})
                };
                return json;
            });


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
                                    <Image fluid className="loginImg mr-auto" src={require("../img/loginImage.jpg")} />
                                </div>
                            </div>
                            <div class="col-sm">
                                <div class="col-sm">
                                    <form className="form-container" onSubmit={this.handleSubmit}>
                                        <h3 className="form-title">Login</h3>

                                        <label className="input-container">
                                            Usuario  <br />
                                            <input id="inpt" type="text" value={this.state.user} onChange={this.userHandler} />
                                        </label>
                                        <br />
                                        <label className="input-container">
                                            Contraseña  <br />
                                            <input id="inpt" type="password" value={this.state.password} onChange={this.passwordHandler} />
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

padding: 3rem;   

.input-container{
        margin-top: 1rem;
        max-width: 100%;
    
    }

#inpt{
 
    max-width: 100%;
}
.form-title{
        margin-top:2rem;
    }
.loginImg{
    max-height: 30rem;
    margin-top: 2rem;
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
    margin-top: 2rem;
}

@media (max-width: 48em) {
    .loginImg{
        hidden: true;
        display: none;
    }
   .form-container{
    
     min-width: 100%;
     margin: 0 auto;
     margin-top: 2rem;

   }
  

   
    

   
}
`;