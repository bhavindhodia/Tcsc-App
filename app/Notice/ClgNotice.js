import React, { Component } from "react";
import { ListItem } from 'react-native-elements';
import {
    FlatList,

} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import NoticeBase from './DeptNotice  Base'
import moment from "moment";
class ClgNotice extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mainData: [],
            theNotice: [],
            theToken: null,
            visible: true,
            refreshing: false,
            curTime: null,
            lastTime: null
        }


    }


    componentDidMount() {
        this._userDetail();
    }

    _userDetail = async () => {
        const userToken = await AsyncStorage.getItem('userToken');

        const userData = await AsyncStorage.getItem('userData');
        const _data = JSON.parse(userData)

        const lastT = await AsyncStorage.getItem('CollegeNoticeTime');

        this.setState({
            mainData: _data,
            theToken: userToken,
            lastTime: moment(lastT, 'ddd D MMM \' YY, h:mm:ss a').fromNow()

        })

        const temp = await AsyncStorage.getItem('theNoticeDataCLG');
        if (temp != null) {
            const _data = JSON.parse(temp)
            // console.log("offline db", _data)
            console.log("College Notice Fetched From DB ")
            this.setState({
                theNotice: _data,
                visible: false
            })
        }
        else {
            this._getNotice()
        }




    }

    _onCreateNotice = async () => {
        console.log(this.state.mainData)
        this.props.navigation.navigate('DeptNoticeForm', {
            userDept: 'CLG',
            postURL: 'upload/college/',

        })
    }


    _getNotice = async () => {
        try {
            console.log("College Notice Collecting from server")
            const urls = global.Foo + "upload/college/"
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


            if (resjson != null) {
                console.log("College Notice Collected Successfully from server")
                this.setState({
                    visible: false,
                    theNotice: resjson,
                    refreshing: false,
                    curTime: moment().format('ddd D MMM \' YY, h:mm:ss a')

                })
                await AsyncStorage.setItem('theNoticeDataCLG', JSON.stringify(this.state.theNotice));

                await AsyncStorage.setItem('CollegeNoticeTime', this.state.curTime)
                console.log("College Notice Saved in DB")
            }
            else {
                console.log("College Notice Something Wen Wrong While Fetching Notice")
            }


        }
        catch (error) {
            console.log("NetWork Issue")
            this.setState({ visible: false })
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

                titleStyle={{ fontFamily: 'TisaWeb W03 Bold', color: 'black', }}
                subtitleStyle={{ fontFamily: 'TisaWeb W03 Regular', color: 'grey' }}
                chevron

                onPress={() => this.props.navigation.navigate('viewNotice', {
                    noticeData: item,
                    userToken: this.state.theToken,
                    mainData: this.state.mainData,
                    updateURL: 'update/college/'
                })}
            />
        )

    render() {

        return (

            <NoticeBase
                aiVisible={this.state.visible}
                lastTime={this.state.lastTime}
                currentTime={this.state.curTime}
                userRole={this.state.mainData.role}
                onCreate={() => { this._onCreateNotice() }}

            >
                <FlatList
                    style={{ top: 25 }}
                    keyExtractor={this.keyExtractor}
                    data={this.state.theNotice}
                    renderItem={this.renderItem}
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}


                />
            </NoticeBase>

        )
    }



}
export default ClgNotice;

