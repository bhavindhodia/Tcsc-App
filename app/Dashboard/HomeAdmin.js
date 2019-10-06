import React, { Component } from "react";
import {
    View, Text, StyleSheet, TouchableOpacity
} from "react-native";

import AsyncStorage from '@react-native-community/async-storage';







class HomeScreenA extends Component {


    constructor(props) {
        super(props);
        //const userData = this.props.navigation.getParam('userData', 'Guest')

        this.state = {

            mainData: []

        }
        //this.navi = this.props.navigation.navigate

        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        const userData = await AsyncStorage.getItem('userData')

        const x = JSON.parse(userData)
        this.setState({
            mainData: x
        })

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.

        this.props.navigation.navigate(userToken ? 'Dash' : 'Login');
    };

    _signOutAsync = async () => {
        let del = ['userToken', 'userData', 'profileData', 'theNoticeData', 'CollegeNoticeTime', 'DepartmentNoticeTime'];
        await AsyncStorage.multiRemove(del);
        this.props.navigation.navigate('Login');
    };


    render() {


        return (

            <View style={styles.container}>

                <Text>Admin Console</Text>

                <Text>{this.state.mainData.email}</Text>

                <Text>{this.state.mainData.role}</Text>

                <Text>{this.state.mainData.department}</Text>
                <TouchableOpacity
                    onPress={this._signOutAsync}


                ><Text>Logout</Text></TouchableOpacity>

                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Attandance')}
                ><Text>Attandance</Text></TouchableOpacity>


                <TouchableOpacity
                    onPress={() => this.props.navigation.openDrawer()}
                ><Text>DRAWER</Text></TouchableOpacity>

            </View>
        );
    }
}


export default HomeScreenA


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});