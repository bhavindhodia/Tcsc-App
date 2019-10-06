import React, { Component } from "react";
import Redirecting from './Redirecting'





class ELibScreen extends Component {

    render() {

        return (
            <Redirecting
                navigation={this.props.navigation}
                urls="http://43.252.194.170/"

            />
        );
    }
}
export default ELibScreen;
