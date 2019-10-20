import React, { Component } from "react";
import {
    View, Text, FlatList, ImageBackground, TouchableOpacity, Button
} from "react-native";
import { Header, Icon, Avatar, } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';
import dashstyles from "./dashstyles";

const data = [
    {
        key: 'Attendance', link: 'Attandance', iconName: 'edit', iconType: 'feather', iconColor: '#fae'
    },

    { key: 'E-Library', link: 'Attandance', iconName: 'book', iconType: 'antdesign', iconColor: 'orange' },
    {
        key: 'Activate Student', link: 'Attandance', iconName: 'edit', iconType: 'feather'
        , iconColor: 'lightgreen'
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




class HomeScreenT extends Component {



    constructor(props) {
        super(props);


        this.state = {

            mainData: []

        }


        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        const userData = await AsyncStorage.getItem('userData')

        const x = JSON.parse(userData)
        this.setState({
            mainData: x
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
                <View style={{ height: 320 }} >
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

                            <Text style={[dashstyles.subtitletxt, { color: '#fff', textAlign: 'center', marginTop: 10 }]} >Teacher's Dashboard</Text>
                            <View style={{ flexDirection: 'row', marginLeft: 30, top: 50 }} >
                                <Avatar
                                    rounded

                                    size="large"
                                    source={
                                        require('../../assets/Reg/teacher.jpg')
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
                        <View style={{ marginVertical: 50 }} />

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


export default HomeScreenT


