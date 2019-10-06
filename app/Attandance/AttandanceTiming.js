import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

import { Icon } from 'react-native-elements'

class AttandanceTimingScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            adminToken: this.props.navigation.getParam('adminToken')
        }

        this.loadData()
    }

    loadData = async () => {


        const urls = global.Foo + 'timing/'
        const method = "GET"
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.state.adminToken
        }

        const response = await fetch(urls, {
            method: method,
            headers: headers,
        })

        const res = await response.json()
        console.warn("RES", res);
        // if (res.division) {
        //     Alert.alert("Division Already Exist")
        // }


    }

    render() {
        return (
            <Icon
                reverse
                containerStyle={{
                    width: 60,
                    position: 'absolute',
                    bottom: 20,
                    right: 20,
                    height: 60,
                }}
                size={30}
                name='plus'
                type='font-awesome'
                color='#f50'
                onPress={() => this.props.navigation.navigate('CreateTiming', {
                    adminToken: this.state.adminToken
                })} />
        );
    }
}
export default AttandanceTimingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});