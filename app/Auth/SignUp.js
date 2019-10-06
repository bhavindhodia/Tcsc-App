import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    KeyboardAvoidingView,
    ImageBackground, ScrollView

} from 'react-native';

import DismisKeyboard from '../comps/theComps'

import SignUpForm from '../Forms/SignupForm'
const { height } = Dimensions.get('window')

export default class SignUpScreen extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (


            <ImageBackground source={require('../../assets/Reg/reg.jpg')}
                style={styles.backgroundImage}

            >
                <ScrollView style={styles.overlay}>



                    <DismisKeyboard>



                        <KeyboardAvoidingView >
                            <SignUpForm navigation={this.props.navigation} />
                        </KeyboardAvoidingView>



                    </DismisKeyboard>
                </ScrollView>
            </ImageBackground>



        );
    }
}

const resizeMode = 'center';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
    },
    bgImage: {
        flex: 1,
        resizeMode,
        // position: 'absolute',
        width: '100%',
        height: height,

    },

    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        // backgroundColor: 'rgba(0,0,0,0.5)'
    },
    overlay: {

        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.5)'

    }

});