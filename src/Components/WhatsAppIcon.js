import React, { Component } from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
export default class WhatsAppIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            W_input: 'En que podemos ayudarle?',
            modalOpen: false,

        }
        this.changeHandler = this.changeHandler.bind(this);
        this.openModal = this.openModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    openModal() {
        this.setState({ modalOpen: this.state.modalOpen ? false : true })
        console.log('Now modal : ' + this.state.modalOpen)
        ///document.getElementById('whatsapp-txt').removeAttribute("hidden");
    }

    changeHandler(event) {
        this.setState({ W_input: event.target.value })
    }

    handleSubmit(e) {
        e.preventDefault()
        console.log("Submited");
        let msg = this.state.W_input;
        let wspLink = 'https://api.whatsapp.com/send?phone=2235911061&text=' + msg;
        //Agregar validacion para mobile
        window.location = wspLink;

    }

    handleSubmitMobile(e) {

        console.log("Submited Mobile");
        let wspLink = 'https://api.whatsapp.com/send?phone=542235911061';
        window.location = wspLink;
    }
    render() {
        let mustOpen = this.state.modalOpen;

        return (
            <WhatsAppContainer  >
                {isMobile ? <img onClick={() => this.handleSubmitMobile()} className="icon" id="icon" src={require("../calabres-api/images/static/whatsApp.png")} /> :
                    <div className="container">
                        <img onClick={() => this.openModal()} className="icon" id="icon" src={require("../calabres-api/images/static/whatsApp.png")} />
                        {mustOpen ?
                            <form onSubmit={this.handleSubmit} id="whatsapp-txt">

                                <input onChange={this.changeHandler} className="w-input" type="text" placeholder="En que podemos ayudarle" />
                                <input className="mySubmit" type="submit" />
                            </form> : null
                        }
                    </div>

                }



            </WhatsAppContainer>
        );
    }
}

const WhatsAppContainer = styled.div` 

cursor:pointer; 

.container{
    position:fixed;
    z-index: 1;
}
.mySubmit{
 height: 5rem;
 border-radius: 0 1rem  1rem 0 ;
}

.mySubmit:hover{
    background-color: var(--mainBlue);
}

#whatsapp-txt{
    -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
-moz-animation: fadein 2s; /* Firefox < 16 */
-ms-animation: fadein 2s; /* Internet Explorer */
-o-animation: fadein 2s; /* Opera < 12.1 */
animation: fadein 2s;
right: -5rem !important;
top: 0rem !important;
@keyframes fadein {
from { opacity: 0; }
to   { opacity: 1; }
}

    position:absolute;
    height: 6rem;
    width: 25rem;
    border-radius: 1rem;
    position:absolute;
    right: 3rem;
    top: 5rem;
}

.w-input{
    height: 5rem;
    width: 20rem;
    border-radius: 1rem 0 0 1rem;
    
    right: 2rem;
    top: 4rem;
}

   .link{      
       max-width: 100%;
       width: 3rem !important;
       cursor: pointer;
   }
   .icon{
        max-width: 3rem; 
        position:fixed;  
        z-index: 1;
        right: 1rem;  
               
   }
@media screen and (max-width: 300px) {
#whatsapp-txt{
display:none;
}

}
`;


