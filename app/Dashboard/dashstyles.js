import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';


export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container2: {
        flex: 1,
        marginVertical: 20,
    },
    titletxt: {
        fontFamily: 'TisaWeb W03 Bold'
    },
    subtitletxt: {
        fontFamily: 'TisaWeb W03 Regular',
    },
    weltext: {
        marginLeft: 35, color: '#fff', fontSize: 25, justifyContent: 'space-between',
        fontFamily: 'TisaWeb W03 Regular',
    },
    item: {

        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        height: Dimensions.get('window').width / 3, // approximate a square
    },
    itemInvisible: {
        backgroundColor: 'transparent',
    },
});
