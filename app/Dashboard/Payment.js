import React, { Component } from "react";

import Redirecting from './Redirecting'





class PaymentScreen extends Component {

    render() {

        return (
            <Redirecting
                navigation={this.props.navigation}
                urls="http://tcsc.org.in/online_payment_terms.html"

            />
        );
    }
}
export default PaymentScreen;
