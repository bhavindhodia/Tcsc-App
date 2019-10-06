import React, { Component, Fragment } from "react";
import {
    View, Alert,
    Text, Picker,
    TouchableHighlight
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { requestPermissions } from "../runtimePermissions";
import { Overlay, Button } from 'react-native-elements'

import styles from './attstyles'

import QRCodeScreen from './theQRCode'
import QRCodeScannerScreen from './QRCodeScanner'
import ListAttandanceScreen from "./listAttandance";
import CheckAttandanceScreen from './CheckAttandanace'
import ActivateStudentScreen from './ActivateStudent'

class AttandanceRouteScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mainData: [],
            userToken: null,
            isVisible: false,
            attandanceDiv: null,
            pathName: null,
            profileData: null,
        }
        this._bootstrapAsync()

    }

    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        const userData = await AsyncStorage.getItem('userData')
        const userProfile = await AsyncStorage.getItem('profileData')

        const md = JSON.parse(userData)
        const pd = JSON.parse(userProfile)



        this.setState({
            mainData: md,
            profileData: pd,
            userToken: userToken
        })

        if (this.state.profileData.not_error && this.state.mainData.role == 'STUDENT') {
            this.props.navigation.navigate('Profile')
        }
        //console.warn('userProfile', this.state.profileData)
    }
    openOverlay = (routeName) => {
        this.setState({ isVisible: true, pathName: routeName });
    }
    overlaySubmit = async () => {
        this.setState({ isVisible: false })

        if (this.state.attandanceDiv === 'NONE') {
            Alert.alert(
                'Error',
                'Division not selected',

            );

        }
        else {
            await requestPermissions()
            try {

                this.props.navigation.navigate(this.state.pathName, {
                    teacherData: this.state.mainData,
                    attandanceDiv: this.state.attandanceDiv,
                    theToken: this.state.userToken
                })

            } catch (error) {
                Alert.alert("Select a Value")
            }
        }
    }
    loadDiv = (value) => {
        const CS = ['NONE', 'TYCSA', 'TYCSB']
        const BMM = ['NONE', 'TYBMMA', 'TYBMMB']
        switch (value) {
            case "CS":

                return (CS.map((x, i) => {
                    return (<Picker.Item label={x} key={i} value={x} />)
                }))

                break;
            case "BMM":
                return (BMM.map((x, i) => {
                    return (<Picker.Item label={x} key={i} value={x} />)
                }))
                break;

        }

    }

    onBtnPress = (navi) => {
        this.props.navigation.navigate(navi, {
            studentData: this.state.mainData,
            profileData: this.state.profileData,
            theToken: this.state.userToken
        })
    }


    render() {
        const theRole = this.state.mainData.role
        return (
            <View style={styles.container}>
                {
                    theRole === 'STUDENT' &&
                    <View>

                        <Button
                            title="QR CODE"
                            titleStyle={styles.titletxt}
                            color="#fa3"
                            onPress={() => this.onBtnPress('QRCode')}
                        >
                        </Button>
                        <View style={{ marginVertical: 15 }} />
                        <Button
                            title="Check Attandance"
                            titleStyle={styles.titletxt}
                            color="#a631f5"
                            onPress={() => this.onBtnPress('CheckAttandance')}
                        >
                        </Button>

                    </View>
                }
                {
                    theRole === 'TEACHER' &&
                    <View>


                        <Button
                            title="QR Code Scanner"
                            titleStyle={styles.titletxt}
                            backgroundColor={'#fa3'}
                            onPress={() => this.openOverlay('QRCodeScanner')}
                        >
                        </Button>
                        <View style={{ marginVertical: 15 }} />
                        <Button
                            title="List Attandance"
                            backgroundColor={'red'}
                            titleStyle={styles.titletxt}
                            color="#a631f5"
                            onPress={() => this.openOverlay('ListAttandance')}
                        >
                        </Button>
                        <View style={{ marginVertical: 15 }} />
                        <Button
                            title="Activate Student"
                            titleStyle={styles.titletxt}
                            color="#af3"
                            onPress={() => this.openOverlay('ActivateStudent')}
                        >
                        </Button>


                        <Overlay

                            isVisible={this.state.isVisible}
                            animationType="fade"
                            transparent={true}
                            onBackdropPress={() => this.setState({ isVisible: false })}

                            children={<View>
                                <Picker style={{ height: 40, width: 400, fontFamily: 'Satisfy-Regular' }}


                                    mode='dropdown'
                                    itemStyle={{ backgroundColor: "grey", fontFamily: 'Satisfy-Regular' }}
                                    selectedValue={this.state.attandanceDiv}


                                    blurOnSubmit={false}

                                    onValueChange={(itemValue, itemIndex) => {

                                        this.setState({
                                            attandanceDiv: itemValue
                                        })
                                    }
                                    }
                                >
                                    {this.loadDiv(this.state.mainData.department)}
                                </Picker>

                                <Button
                                    containerStyle={{ padding: 18, margin: 18 }}
                                    title="Submit"
                                    titleStyle={styles.titletxt}
                                    onPress={this.overlaySubmit}
                                >

                                </Button>
                            </View>}

                        >

                        </Overlay>



                    </View>}

                {
                    theRole === 'ADMIN' &&
                    <View>
                        <TouchableHighlight style={{ padding: 18, margin: 18 }}
                        // onPress={() => this.props.navigation.navigate('Timing', {
                        //     adminToken: this.state.userToken
                        // })}
                        ><Text>Set Timings</Text></TouchableHighlight>
                    </View>
                }

            </View>
        );
    }
}
export default AttandanceRouteScreen;
export { QRCodeScreen, QRCodeScannerScreen, ListAttandanceScreen, CheckAttandanceScreen, ActivateStudentScreen }

