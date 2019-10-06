import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
const resizeMode = 'center';

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },

    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 300,
        height: 45,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',

        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        // shadowOpacity: 0.25,
        shadowRadius: 3.84,
        fontFamily: 'TisaWeb W03 Regular',
        elevation: 5,
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
        fontFamily: 'TisaWeb W03 Regular',

    },

    textAreaContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        borderBottomWidth: 1,
        marginBottom: 15,
        flexDirection: 'row',

        width: 300,
        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        // shadowOpacity: 0.25,
        shadowRadius: 3.84,
        fontFamily: 'TisaWeb W03 Regular',
        elevation: 5,
    },

    textArea: {
        height: 145,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginRight: 15,
        justifyContent: 'center'
    },

    btnForgotPassword: {
        height: 15,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginBottom: 10,
        width: 300,
        backgroundColor: 'transparent'
    },
    loginButton: {
        margin: 15,
        padding: 12,
        backgroundColor: "#13d63e",
        // fontFamily: 'TisaWeb W03 Bold',
        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 15,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,


        elevation: 19,
    },
    loginText: {
        color: 'white',
        fontFamily: 'TisaWeb W03 Bold',
    },
    bgImage: {
        flex: 1,
        resizeMode,
        position: 'absolute',
        width: '100%',
        height: '100%',

    },
    btnText: {
        color: "white",
        fontFamily: 'TisaWeb W03 Bold',
    },
    err: {
        color: 'white',
        fontSize: 18,
        marginBottom: 20,
        marginTop: 5,

        textAlign: 'center',

        fontFamily: 'TisaWeb W03 Bold',
    },

    signup: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,
        marginBottom: 100,
    },
    signupText: {
        fontSize: 15,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'TisaWeb W03 Bold',
    },
    signupbtn: {
        width: 90,
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'TisaWeb W03 Bold',
    },
    row: {

        flexDirection: 'row',

    },
    buttonContainer: {
        margin: 10,
        padding: 10,
        width: 190,

    },
    topContainer: {

        backgroundColor: '#fff',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width,
        position: 'absolute',
        top: 0,
        marginBottom: 10,

    },
});
