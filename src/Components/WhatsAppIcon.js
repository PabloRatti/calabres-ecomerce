import React, { Component } from "react";
import styled from "styled-components";
import { isMobile } from "react-device-detect";
import ReactPixel from "react-facebook-pixel";

export default class WhatsAppIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      W_input: "En que podemos ayudarle?",
      modalOpen: false,
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.openModal = this.openModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const advancedMatching = { em: "some@email.com" }; // optional, more info: https://developers.facebook.com/docs/facebook-pixel/pixel-with-ads/conversion-tracking#advanced_match
    const options = {
      autoConfig: true, // set pixel's autoConfig
      debug: false, // enable logs
    };
    ReactPixel.init("1143009419162712", advancedMatching, options);
  }

  openModal() {
    this.setState({ modalOpen: this.state.modalOpen ? false : true });
    console.log("Now modal : " + this.state.modalOpen);
    ///document.getElementById('whatsapp-txt').removeAttribute("hidden");
  }

  changeHandler(event) {
    this.setState({ W_input: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    ReactPixel.track('Contact');
    console.log("Submited");
    let msg = this.state.W_input;
    let wspLink =
      "https://api.whatsapp.com/send?phone=542233129785&text=" + msg;
    //Agregar validacion para mobile
    window.location = wspLink;
  }

  handleSubmitMobile(e) {
    ReactPixel.track('Contact');
    console.log("Submited Mobile");
    let wspLink = "https://api.whatsapp.com/send?phone=542233129785";
    window.location = wspLink;
  }

  render() {
    let mustOpen = this.state.modalOpen;

    return (
      <WhatsAppContainer>
        {isMobile ? (
          <img
            alt="icon"
            onClick={() => this.handleSubmitMobile()}
            className="icon"
            id="icon"
            src={require("../img/whatsApp.png")}
          />
        ) : (
          <div className="container">
            <img
              alt="icon"
              onClick={() => this.openModal()}
              className="icon"
              id="icon"
              src={require("../img/whatsApp.png")}
            />
            {mustOpen ? (
              <form onSubmit={this.handleSubmit} id="whatsapp-txt">
                <input
                  onChange={this.changeHandler}
                  className="w-input"
                  type="text"
                  placeholder="En que podemos ayudarle"
                />
                <input className="mySubmit" type="submit" />
              </form>
            ) : null}
          </div>
        )}
      </WhatsAppContainer>
    );
  }
}

const WhatsAppContainer = styled.div`
  cursor: pointer;

  .container {
    position: fixed;
    z-index: 1;
  }
  .mySubmit {
    height: 5rem;
    border-radius: 0 1rem 1rem 0;
  }

  .mySubmit:hover {
    background-color: var(--mainBlue);
  }

  #whatsapp-txt {
    -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
    -moz-animation: fadein 2s; /* Firefox < 16 */
    -ms-animation: fadein 2s; /* Internet Explorer */
    -o-animation: fadein 2s; /* Opera < 12.1 */
    animation: fadein 2s;
    right: -22rem;
    top: 41rem;
    @keyframes fadein {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    position: absolute;
    height: 6rem;
    width: 25rem;
    border-radius: 1rem;
  }

  .w-input {
    height: 5rem;
    width: 20rem;
    border-radius: 1rem 0 0 1rem;

    right: 2rem;
  }

  .link {
    max-width: 100%;
    width: 3rem !important;
    cursor: pointer;
  }
  .icon {
    max-width: 3rem;
    position: fixed;
    z-index: 1;
    right: 1rem;
    bottom: 2rem;
  }
  @media screen and (max-width: 300px) {
    #whatsapp-txt {
      display: none;
    }
  }
`;
