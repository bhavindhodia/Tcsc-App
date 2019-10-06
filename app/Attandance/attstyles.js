import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';


export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    titletxt: {
        fontFamily: 'TisaWeb W03 Bold'
    },
    subtitletxt: {
        fontFamily: 'TisaWeb W03 Regular',
    },
    ctnbtn: {
        marginHorizontal: 7,
        marginVertical: 10,

    },
    btn: {
        borderColor: '#9522c9'
    },
    containerbtn: {

        width: '100%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitbtn: {
        padding: 15,
        paddingHorizontal: 90,
        backgroundColor: '#0bb346'
    },
    cardText: {
        fontFamily: 'TisaWeb W03 Regular',
        textAlign: 'center',
        margin: 'auto',
        padding: 5,
        fontSize: 20
    }
});
