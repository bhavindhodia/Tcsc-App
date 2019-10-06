import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    KeyboardAvoidingView,
    ImageBackground,


} from 'react-native';

import DismisKeyboard from '../comps/theComps'

import LoginForm from '../Forms/LoginForm'



export default class LoginScreen extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (

            <ImageBackground source={require('../../assets/Reg/bg.png')}
                style={styles.backgroundImage}

            >
                <DismisKeyboard>
                    <View style={styles.overlay} >
                        <KeyboardAvoidingView >
                            <LoginForm navigation={this.props.navigation} />
                        </KeyboardAvoidingView>
                    </View>

                </DismisKeyboard>

            </ImageBackground>




        );
    }
}


const styles = StyleSheet.create({

    backgroundImage: {
        flex: 1,
        width: null,
        height: null,

    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.5)'

    }

});