import React, { Component } from "react";
import {
    View, Alert,
    Text,
    ActivityIndicator,
    FlatList,
    AsyncStorage, TouchableOpacity, Dimensions
} from "react-native";
import styles from '../Forms/Style'
import { ListItem, Icon } from 'react-native-elements';

import DepartmentalNoticeForm from '../Forms//DepartmentalNoticeForm'
import viewNoticeScreen from './viewNotice'
import UpdateNoticeScreen from './updateNotice'

// import { viewNoticeScreen, UpdateNoticeScreen} from


import { Foundation } from '@expo/vector-icons'


const { width, height } = Dimensions.get('window');

class DeptNotice extends Component {

    constructor(props) {
        super(props);



        this.state = {
            mainData: [],
            theNotice: [],
            theToken: null,
            visible: true,
            refreshing: false,
            curTime: null
        }
        this._userDetail();

    }

    _userDetail = async () => {
        const x = await AsyncStorage.getItem('userToken');
        const userToken = x
        const userData = await AsyncStorage.getItem('userData');
        const _data = JSON.parse(userData)
        this.setState({
            mainData: _data,
            theToken: userToken
        })

        const temp = await AsyncStorage.getItem('theNoticeData');
        if (temp != null) {
            const _data = JSON.parse(temp)
            // console.log("offline db", _data)
            console.log("Fetched From DB")
            this.setState({
                theNotice: _data
            })
        }
        else {
            this._getNotice()
        }




    }

    _onCreateNotice = async () => {
        console.log(this.state.mainData)
        this.props.navigation.navigate('DeptNoticeForm', {
            userDept: this.state.mainData.department
        })
    }


    _getNotice = async () => {
        try {
            console.log("Collecting from server")
            const urls = global.Foo + "upload/departmental/"
            const method = "GET"
            const bvn = this.state.theToken
            console.log("THe token", bvn)

            const headers = {
                // 'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + bvn
                // 'Authorization': 'Token '+this.state.theToken

            }

            const res = await fetch(urls, {
                method: method, headers: headers,
            });
            const resjson = await res.json()
            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
            const x = new Date().toLocaleTimeString('default')
            const y = new Date().toLocaleDateString('locals', options)

            if (resjson != null) {
                console.log("Collected Successfully from server")
                this.setState({
                    visible: false,
                    theNotice: resjson,
                    refreshing: false,
                    curTime: y + ' at ' + x

                })
                await AsyncStorage.setItem('theNoticeData', JSON.stringify(this.state.theNotice));
                console.log("Saved in DB")
            }
            else {
                console.log("Something Wen Wrong While Fetching Notice")
            }


        }
        catch (error) {
            console.log("NetWork Issue")
        }
    }

    _onRefresh = async () => {

        this.setState({
            refreshing: true,
            theNotice: null
        })

        this._getNotice()
    }

    // *********************************** //
    keyExtractor = (item, index) => index.toString()

    renderItem = (
        { item }) => (


            <ListItem

                title={`${item.title}`}
                titleProps={
                    { numberOfLines: 1 }
                }
                subtitle={`${item.body}`}
                subtitleProps={
                    { numberOfLines: 1 }
                }

                titleStyle={{ color: 'black', fontWeight: 'bold' }}
                subtitleStyle={{ color: 'grey' }}
                chevron
                // bottomDivider
                // topDivider
                onPress={() => this.props.navigation.navigate('viewNotice', {
                    noticeData: item,
                    userToken: this.state.theToken
                })}


            />


        )

    render() {

        return (



            < View style={{ flex: 1 }} >




                {this.state.visible && (
                    <ActivityIndicator
                        style={{ position: "absolute", top: height / 2, left: width / 2 }}
                        size="large"
                    />
                )}

                <View style={styles.topContainer} >
                    {this.state.curTime === null ?
                        <Text>Pull to Refresh</Text>
                        :
                        <Text> Last Updated {this.state.curTime}</Text>
                    }
                </View>

                <FlatList
                    style={{ top: 25 }}
                    keyExtractor={this.keyExtractor}
                    data={this.state.theNotice}
                    renderItem={this.renderItem}
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}


                />


                {
                    this.state.mainData.role === 'ADMIN' || this.state.mainData.role === 'Teacher' ?
                        <TouchableOpacity
                            style={{
                                borderWidth: 1,
                                borderColor: 'rgba(0,0,0,0.2)',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 60,
                                position: 'absolute',
                                bottom: 10,
                                right: 10,
                                height: 60,
                                backgroundColor: '#41F515',
                                borderRadius: 100,

                            }}
                            onPress={this._onCreateNotice}
                        >
                            <Foundation name="plus" size={30} color="white"
                            />

                        </TouchableOpacity>
                        :
                        <View >

                        </View>

                }
            </View>
        )
    }


}




export { DepartmentalNoticeForm, viewNoticeScreen, UpdateNoticeScreen };
export default DeptNotice;
