import React from "react";
import {

    StyleSheet
} from "react-native";


const styles = StyleSheet.create({
    header: {
        backgroundColor: "#f69b31",
        // height: 200,
    },
    headerContent: {
        padding: 30,
        alignItems: 'center',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
    },
    name: {
        fontSize: 25,
        color: "#fff",
        fontWeight: '600',
        fontFamily: 'TisaWeb W03 Bold'
    },
    userInfo: {
        fontSize: 18,
        color: "grey",
        fontWeight: '600',
        fontFamily: 'TisaWeb W03 Regular'
    },

});

export default styles;