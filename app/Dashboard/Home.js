import React, { Component } from "react";
import {
    View, Text, FlatList, ImageBackground, TouchableOpacity,
} from "react-native";
import { Header, Icon, Avatar, } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';

import PaymentScreen from './Payment'
import ELibScreen from './ELib'
import ComingSoonScreen from './ComingSoon'


import dashstyles from "./dashstyles";

const data = [
    {
        key: 'Attendance', link: 'Attandance', iconName: 'edit', iconType: 'feather', iconColor: '#fae'
    },

    { key: 'E-Library', link: 'ELib', iconName: 'book', iconType: 'antdesign', iconColor: 'orange' },
    {
        key: 'Payment', link: 'Pay', iconName: 'edit', iconType: 'feather'
        , iconColor: 'green'
    },
    {
        key: 'About Us', link: 'Attandance', iconName: 'institution', iconType: 'font-awesome'
        , iconColor: 'purple'
    },
    {
        key: 'Share App', link: 'ComingSoon', iconName: 'share', iconType: 'entype'
        , iconColor: '#05f549'
    },


];


const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
        data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
        numberOfElementsLastRow++;
    }

    return data;
};
const numColumns = 3;






class HomeScreenS extends Component {

    constructor(props) {
        super(props);
        //const userData = this.props.navigation.getParam('userData', 'Guest')

        this.state = {

            mainData: [],
            profileData: null,

        }
        //this.navi = this.props.navigation.navigate

        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        const userData = await AsyncStorage.getItem('userData')
        const userProfile = await AsyncStorage.getItem('profileData')

        const x = JSON.parse(userData)
        const pd = JSON.parse(userProfile)
        this.setState({
            mainData: x,

        })



        this.props.navigation.navigate(userToken ? 'Dash' : 'Login');
    };

    _signOutAsync = async () => {
        let del = ['userToken', 'userData', 'profileData', 'theNoticeData', 'CollegeNoticeTime', 'DepartmentNoticeTime'];
        await AsyncStorage.multiRemove(del);
        this.props.navigation.navigate('Login');
    };

    renderItem = ({ item, index }) => {
        if (item.empty === true) {
            return <View style={[dashstyles.item, dashstyles.itemInvisible]} />;
        }
        return (

            <TouchableOpacity style={dashstyles.item}
                onPress={() => this.props.navigation.navigate(item.link)}

            >
                <View  >
                    <Icon
                        name={item.iconName}
                        type={item.iconType}
                        color={item.iconColor}
                        size={45}
                        containerStyle={{ margin: 10 }}
                    >

                    </Icon>
                    <Text style={[dashstyles.subtitletxt, { color: 'grey', fontSize: 18 }]} >{item.key}</Text>
                </View>
            </TouchableOpacity>
        );
    };


    render() {

        return (

            <>
                <View style={{ height: 300 }} >
                    <ImageBackground source={require('../../assets/Reg/homebg.jpg')}
                        style={{ flex: 1, padding: 15, tintColor: 'black', shadowOffset: 80 }}
                        blurRadius={10}
                    >
                        <Header
                            leftComponent={{
                                icon: 'menu', color: '#fff', size: 35, style: { top: -10 },
                                onPress: () => this.props.navigation.openDrawer()
                            }}
                            centerComponent={{ text: 'COLLEGE', style: [dashstyles.titletxt, { color: '#fff', fontSize: 35, fontWeight: '800', top: -10 }] }}
                            containerStyle={{ borderBottomColor: 'transperent' }}
                            rightComponent={<Icon
                                type='antdesign'
                                name='logout'
                                color='#fff'
                                size={25}
                                onPress={this._signOutAsync}
                                containerStyle={{ top: -7 }}


                            />
                            }
                            backgroundColor='transperent'
                            barStyle={'light-content'}
                            containerStyle={
                                { height: 65 }
                            }

                        />

                        <View style={{ flex: 1 }} >

                            <Text style={[dashstyles.subtitletxt, { color: '#fff', textAlign: 'center', marginTop: 10 }]} >Student's Dashboard</Text>
                            <View style={{ flexDirection: 'row', marginLeft: 30, top: 50 }} >
                                <Avatar
                                    rounded

                                    size="large"
                                    source={
                                        require('../../assets/Reg/student.jpg')
                                    }
                                />

                                <View>
                                    <Text style={dashstyles.weltext} >
                                        Welcome,
                                </Text>
                                    <Text style={dashstyles.weltext} >{this.state.mainData.first_name}  {this.state.mainData.last_name} </Text>
                                </View>
                            </View>

                        </View>

                    </ImageBackground>
                </View>

                <FlatList
                    data={formatData(data, numColumns)}
                    style={dashstyles.container2}
                    renderItem={this.renderItem}
                    numColumns={numColumns}
                />

            </>
        );
    }
}


export default HomeScreenS
export { PaymentScreen, ELibScreen, ComingSoonScreen }

