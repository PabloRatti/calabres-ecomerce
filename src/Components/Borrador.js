constructor(props) {
    super(props);
    this.state = {
        name: this.props.location.state.name,
        total: this.props.location.state.total,
        products: this.props.location.state.products,
        token: '',
        tokenRequestKeySandbox: '41cbc74acc604a109157bb8394561d27',
        tokenForPaymentSandbox: '1fb6dc55c0a1489db411a8ee8f9c9707',
        tokenForConfirmacionPagoSandbox: '1fb6dc55c0a1489db411a8ee8f9c9707',
        loadingTransaction: false,
        paymentId: '',
        displayMsg: false,
        message: '',
        paymentAproved: false,
        buttonDisabled: false,
        paymentMethodId: '',
        error: ''

    }

}
    generarTokenRequest = () => {
        const { name, identity_number,  expiry, cvc } = this.props.location.state;

        this.setState({ loadingTransaction: true })
        let expirationMonth = expiry.slice(0, 2);
        let expirationYear = expiry.slice(2, 4);

        console.log('Expitation : ' + expiry);
        console.log('Expiration month : ' + expirationMonth);
        console.log('Expiration year : ' + expirationYear);
        let cardHolderId = {
            type: "dni",
            number: identity_number
        }
        let fetchData = {
            mode: 'cors',
            method: "POST",
            headers: {
                "apiKey": this.state.tokenRequestKeySandbox,
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            },
            body: JSON.stringify({

                card_number: '4507990000004905',
                card_expiration_month: expirationMonth,
                card_expiration_year: expirationYear,
                security_code: cvc,
                card_holder_name: name,
                card_holder_identification: cardHolderId
            })
        }

        return fetchData;
    }
    solicitarToken = (callback) => {


        let tokenRequest = this.generarTokenRequest();
        console.log('Request generated for request token ');
        console.log(tokenRequest);
        let tokenId = '';
        //Hacer el update
        fetch('https://developers.decidir.com/api/v2/tokens', tokenRequest)
            .then(function (res) {
                console.log('Loading /token.....')
                return res.json()
            })
            .then((data) => {
                if (data.status === 'active') {
                    tokenId = data.id;
                    this.setState({ token: tokenId });
                    console.log('Token recuperado: ' + this.state.token)
                    callback();
                } else {
                    throw data;
                }
            }).catch((err) => {
                console.log('Lanzando desde /tokens');
                this.errorHandler(err);
                throw err;
            })

    }

    generarPaymentRequest = () => {
        const { cuotas, total } = this.props.location.state;
        let totalAmount = parseInt(total);
        //let bin = number.slice(0, 6);

        let transactionId = Math.floor(Math.random() * (99999999 - 1) + 1);
        let request = {
            mode: 'cors',
            method: "POST",
            headers: {
                "apiKey": this.state.tokenForPaymentSandbox,
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            },
            body: JSON.stringify({
                site_transaction_id: transactionId.toString(), //Cambiar esto por id del ticket, desarrollar
                token: this.state.token,
                payment_method_id: 1,
                bin: '450799', //-------------------------->
                amount: totalAmount, //La API espera un numero 
                currency: "ARS",
                installments: parseInt(cuotas), //La API espera un numero no string
                description: "",
                payment_type: "single",
                sub_payments: []
            })
        }
        return request;

    }

    ejecucionPreAutorizacion = (callback) => {
        let paymentId = '';
        let paymentRequest = this.generarPaymentRequest();
        fetch('https://developers.decidir.com/api/v2/payments', paymentRequest)
            .then(function (res) {
                console.log('Loading /payments.....');
                return res.json()
            })
            .then((data) => {
                console.log(data);
                if (data.status !== 'pre_approved') {
                    let error = data.status_details.error.reason.description;
                    throw error;
                } else {
                    paymentId = data.id;
                    console.log('Payment Id obtenido de la preAutorizacion : ' + paymentId);
                    this.setState({ paymentId: paymentId })
                    callback();
                    return data;
                }

            }).catch((err) => {
                console.log('Lanzando desde preAutorizacion')
                this.errorHandler(err);
                throw err;
            })



    }

    finalPaymentRequestGenerator = () => {
        const { total } = this.props.location.state;
        let totalAmount = parseInt(total);
        let paymentConfirmationRequest = {
            mode: 'cors',
            method: "PUT",
            headers: {
                "apiKey": this.state.tokenForConfirmacionPagoSandbox,
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            },
            body: JSON.stringify({
                amount: totalAmount
            })
        }
        return paymentConfirmationRequest;
    }

    ejecutarPago = () => {
        let paymentConfirmationRequest = this.finalPaymentRequestGenerator();

        console.log('Final payment request');
        console.log(paymentConfirmationRequest);
        console.log('Payment id for final confirmation : ' + this.state.paymentId);
        setTimeout(() => {
            fetch('https://developers.decidir.com/api/v2/payments/' + this.state.paymentId, paymentConfirmationRequest)
                .then(function (res) {

                    console.log('Procesando pago final....')
                    console.log(res);
                    return res.json()
                })
                .then((data) => {
                    if (data.status === 'approved') {
                        console.log('Data del pago final:');
                        console.log(data)
                        console.log('Pago realizado con exito')
                        this.setState({ loadingTransaction: false, paymentAproved: true, displayMsg: true, message: 'Pago realizado exitosamente!', buttonDisabled: true })
                    } else {
                        throw data;
                    }

                }).catch((err) => {
                    console.log('Pago fallido, lanzando desde pago final : ');
                    this.errorHandler(err);
                    throw err;
                })
        }, 3000);

    }

    translateError = (error) => {
        let translatedError = error;
        switch (error) {
            case 'card_expiration_month':
                translatedError = 'Verifique mes de vencimiento';
                break;
            case 'expired card':
                translatedError = 'Tarjeta vencida';
                break;
            default:
                return null;
        }
        this.setState({ error: translatedError })
        return translatedError;
    }

    errorHandler = (error) => {
        let auxError = error;
        console.log('Handling error')
        if (error.error_type === 'invalid_request_error') {
            let errorDescription = error.validation_errors[0].param;
            let spanishError = this.translateError(errorDescription);
            console.log('Error por datos inválidos : ' + spanishError);
            auxError = spanishError;

        }
        if (error.error_type === 'not_found_error') {
            console.log('Payment id expiro');
            auxError = 'Payment id expiro';
        }
        if (error.error_type === 'api_error') {
            console.log('Error del servicio');
            auxError = 'Mala conexion, intente nuevamente';
        }
        if (error.status) {
            error.status = 504 ? this.setState({ error: 'Verifique su conexion a internet' }) : null;
        }
        console.log(auxError)

        this.setState({ displayMsg: true, message: 'Error : ' + auxError })
        this.setState({ loadingTransaction: false })
    }


    submitHandler = () => {
        scroll.scrollToTop();
       
        //this.guardarVenta();

        this.solicitarToken(() => {
            this.ejecucionPreAutorizacion(() => this.ejecutarPago());
        });
        //guardarVenta();//Guarda el ticket en el BE para luego despacharlo

    }