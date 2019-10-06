import React, { Component } from "react";
import {
    View, Dimensions, StatusBar,
    Text, TouchableOpacity, LayoutAnimation,
    StyleSheet
} from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';

class QRCodeScannerScreen extends Component {
    constructor(props) {
        super(props)

        StatusBar.setHidden(true, 'slide');
        this.state = {
            lastScannedUrl: null
        }
    }

    reading = (result) => {
        // console.warn(result.data)
        LayoutAnimation.spring();
        const y = JSON.parse(result.data)
        this.setState({ lastScannedUrl: y })


    }



    render() {

        return (
            <View style={styles.container} >

                <QRCodeScanner
                    reactivate={true}
                    reactivateTimeout={3000}
                    cameraStyle={{

                        height: Dimensions.get('screen').height,
                        width: Dimensions.get('screen').width
                    }}
                    onRead={this.reading}
                >

                </QRCodeScanner>
                {this._renderTop()}
                {this._maybeRenderUrl()}

            </View>

        );
    }
    _maybeRenderUrl = () => {
        // console.warn('errrrr2', this.state.lastScannedUrl)
        if (this.state.lastScannedUrl === null) {

            return


        }


        else {

            return (

                <View style={styles.bottomBar} >
                    <Text style={styles.urlText} >NAME -{this.state.lastScannedUrl.username}</Text>
                </View>

            );
        }

    };

    _renderTop = () => {
        // console.warn('errrrr2', this.state.lastScannedUrl)
        if (this.state.lastScannedUrl === null) {

            return


        }


        else {

            return (

                <View style={styles.topBar} >

                    <Text style={styles.urlText} >TOP{this.state.lastScannedUrl.username}</Text>

                </View>

            );
        }

    };


}
export default QRCodeScannerScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#000',
    },
    topBar: {
        width: '100%',
        padding: 15,
        height: 50,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 10,

    },
    bottomBar: {
        width: '100%',
        padding: 15,
        height: 50,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', //Here is the trick
        bottom: 0, //Here is the trick
    },
    url: {
        flex: 1,
    },
    urlText: {
        color: '#fff',
        fontSize: 20,
    },
    cancelButton: {
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButtonText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 18,
    },
});