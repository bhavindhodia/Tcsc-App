import React, { Component } from "react";
import {
    View, Dimensions,
    Image, Text,
    StyleSheet
} from "react-native";

const { width, height } = Dimensions.get('window')

class ComingSoonScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.stretch}
                    source={require('../../assets/Reg/comingsoon.png')}
                />

                <Text style={styles.txt} >Coming Soon</Text>
            </View>
        );
    }
}
export default ComingSoonScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    stretch: {
        width: width - 40,
        height: 500,
        resizeMode: 'stretch'
    },
    txt: {
        fontSize: 40,
        fontWeight: '400',
        fontFamily: 'Satisfy-Regular'
    }
});

