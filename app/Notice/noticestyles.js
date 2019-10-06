import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';


export default StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,


    },
    title: {

        fontSize: 30,
        marginBottom: 15,
        fontFamily: 'TisaWeb W03 Bold'
    },

    subtitles: {
        marginBottom: 15,
        fontSize: 13,
        color: 'grey',
        textAlignVertical: 'center',
        justifyContent: 'center',
        fontFamily: 'TisaWeb W03 Regular',

    },
    theBody: {
        fontSize: 23,
        marginBottom: 15,
        fontFamily: 'TisaWeb W03 Regular',

    },
    btn: {
        width: 150,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fff',
        fontFamily: 'TisaWeb W03 Regular',
    },
    smbtn: {
        width: 50,
        borderRadius: 5,
        borderWidth: 1,
        fontFamily: 'TisaWeb W03 Regular',
        borderColor: '#fff'

    },
    row: {
        flexDirection: 'row',

    },

});
