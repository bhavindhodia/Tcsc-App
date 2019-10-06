import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import QRCode from 'react-native-qrcode-svg';


class QRCodeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            studentData: this.props.navigation.getParam('studentData'),
            profileData: this.props.navigation.getParam('profileData'),
            theToken: this.props.navigation.getParam('theToken')


        })
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>{this.state.studentData.username}</Text>
                <Text>{this.state.theToken}</Text>
                <QRCode
                    value={JSON.stringify({
                        id: this.state.studentData.id,
                        username: this.state.studentData.username,
                        token: this.state.theToken
                        // stream: this.state.profileData.stream,
                        // classes: this.state.profileData.classes,
                        // division: this.state.profileData.division,
                        // rollno: this.state.profileData.rollno
                    }
                    )}
                />
            </View>
        );
    }
}
export default QRCodeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});