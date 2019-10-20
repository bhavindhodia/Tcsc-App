import React, { Component } from "react";
import {
    View, Dimensions, StatusBar,
    LayoutAnimation,
    StyleSheet
} from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Button, Text, } from 'react-native-elements'
import DateTimePicker from "react-native-modal-datetime-picker";

class QRCodeScannerScreen extends Component {
    constructor(props) {
        super(props)

        StatusBar.setHidden(true, 'slide');
        this.state = {
            lastScannedUrl: null,

            startDateTimePickerVisible: false,
            endDateTimePickerVisible: false,
            startTime: null,
            endTime: null
        }
    }

    reading = (result) => {
        // console.warn(result.data)
        LayoutAnimation.spring();
        const y = JSON.parse(result.data)
        this.setState({ lastScannedUrl: y })


    }

    showStartDateTimePicker = async () =>
        this.setState({ startDateTimePickerVisible: true });

    showEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: true });

    hideStartDateTimePicker = async () =>
        this.setState({ startDateTimePickerVisible: false });

    hideEndDateTimePicker = () =>
        this.setState({ endDateTimePickerVisible: false });

    handleStartDatePicked = async (date) => {
        s = new Date(date)

        const thedate = s.toLocaleTimeString('en-us')
        // const thedate = moment(date).format('LT')

        this.setState({ startTime: thedate })
        const startTime = "attandance_s_time"

        this.state.studentListData.map((item, i) => {
            const outputArr = this.state.studentListData.slice(0);

            item[startTime] = this.state.startTime


            outputArr[i] = item
            this.setState({
                studentListData: outputArr,
            });
        })

        this.hideStartDateTimePicker();
    };

    handleEndDatePicked = date => {
        s = new Date(date)
        // const thedate = moment(date).format('LT')
        const thedate = s.toLocaleTimeString('en-us')
        // console.warn("A time has been picked: ", thedate);
        this.setState({ endTime: thedate })

        const endTime = "attandance_e_time"

        this.state.studentListData.map((item, i) => {
            const outputArr = this.state.studentListData.slice(0);

            item[endTime] = this.state.endTime


            outputArr[i] = item
            this.setState({
                studentListData: outputArr,
            });
        })


        this.hideEndDateTimePicker();
    };

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

                    <Button
                        containerStyle={styles.ctnbtn}
                        buttonStyle={styles.btn}
                        type="outline"
                        titleStyle={[styles.titletxt, { color: '#9522c9', fontSize: 20 }]}
                        title={this.state.startTime === null ? "Start Time" : this.state.startTime} onPress={this.showStartDateTimePicker} />


                    <DateTimePicker
                        mode='time'
                        isVisible={this.state.startDateTimePickerVisible}
                        onConfirm={this.handleStartDatePicked}
                        onCancel={this.hideStartDateTimePicker}
                    />

                    <Button containerStyle={styles.ctnbtn}
                        buttonStyle={styles.btn}
                        type="outline"
                        titleStyle={[styles.titletxt, { color: '#9522c9', fontSize: 20 }]}
                        title={this.state.endTime === null ? "End Time" : this.state.endTime} onPress={this.showEndDateTimePicker}

                    />



                    <DateTimePicker
                        mode='time'
                        isVisible={this.state.endDateTimePickerVisible}
                        onConfirm={this.handleEndDatePicked}
                        onCancel={this.hideEndDateTimePicker}
                    />






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