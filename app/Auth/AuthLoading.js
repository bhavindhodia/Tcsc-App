import React from 'react';
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LoginScreen from './Login'
import SignUpScreen from './SignUp'

// import OfflineNotice from '../../config/OfflineNotice'



class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            pd: []
        }
        this._bootstrapAsync()
        // this.profileData()
    }

    navi = (role) => {
        switch (role) {

            case 'STUDENT':
            case 'Student':
                // console.log("STU", role)
                this.props.navigation.navigate('DashS')
                break;

            case 'TEACHER':
            case 'Teacher':
                // console.log("TEACHER", role)
                this.props.navigation.navigate('DashT')
                break;

            case 'ADMIN':
            case 'Admin':
                // console.log("ADMIN", role)
                this.props.navigation.navigate('DashA')
                break;

        }

    }


    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken', null);
        // console.warn("OFFLINE FETCH");

        if (userToken === null) {
            this.props.navigation.navigate('Login')
        }
        else {
            const temp = await AsyncStorage.getItem('userData', null);
            const userData = JSON.parse(temp)
            // console.warn("D", userData);

            if (userData === null) {
                // console.warn("FIRST TIME LOADED");

                this.fetchData(userToken)
            } else {
                // console.warn("FETCH FROM ASYNC");

                this.navi(userData.role)
            }

        }

    };

    fetchData = async (userToken) => {
        json = (response) => {

            return response.json()
        }
        try {
            const urls = global.Foo + "rest-auth/user/"
            const urls2 = global.Foo + "userprofile/create"


            const method = "GET"
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + userToken
            }

            await fetch(urls2, {
                method: method,
                headers: headers
            })
                .then(json)
                .then(theres => theres.map(result => (
                    AsyncStorage.setItem('profileData', JSON.stringify(result))
                )))

                .then(async () => {
                    await fetch(urls, {
                        method: method,
                        headers: headers,
                    })
                        .then(json)

                        .then(async (json) => {


                            this.setState({
                                isLoading: false
                            })
                            await AsyncStorage.setItem('userData', JSON.stringify(json))
                            this.navi(json.role)

                        }).done()
                }).done()
        }
        catch (error) {
            console.warn(error)
        }
    }


    render() {


        return (
            <View style={styles.mainConatiner} >
                {/* <OfflineNotice /> */}
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainConatiner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default AuthLoadingScreen
export { LoginScreen, SignUpScreen }