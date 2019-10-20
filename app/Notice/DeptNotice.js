import React, { Component } from "react";
import { ListItem } from 'react-native-elements';
import {
    FlatList,

} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import DepartmentalNoticeForm from '../Forms/DepartmentalNoticeForm'
import viewNoticeScreen from './viewNotice'
import UpdateNoticeScreen from './updateNotice'

import NoticeBase from './DeptNotice  Base'
import moment from "moment";

class DeptNotice extends Component {


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

        this._userDetail()
        // console.warn("cur", this.state.curTime);
        // console.warn("las", this.state.lastTime);

    }


    _userDetail = async () => {
        const userToken = await AsyncStorage.getItem('userToken');

        const userData = await AsyncStorage.getItem('userData');
        const _data = JSON.parse(userData)

        const lastT = await AsyncStorage.getItem('DepartmentNoticeTime');

        this.setState({
            mainData: _data,
            theToken: userToken,
            lastTime: moment(lastT, 'ddd D MMM \' YY, h:mm:ss a').fromNow()
        })


        // console.warn("lastT", lastT);
        // console.warn("fetch form db", this.state.lastTime);
        const temp = await AsyncStorage.getItem('theNoticeData');
        if (temp != null) {
            const _data = JSON.parse(temp)
            // console.log("offline db", _data)
            console.log("Departmental Notice Fetched From DB")
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
            userDept: this.state.mainData.department,
            postURL: "notice/upload/departmental/"
        })
    }


    _getNotice = async () => {
        try {
            console.log("Departmental Notice Collecting from server")
            const urls = global.Foo + "notice/upload/departmental/"
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
                console.log("Departmental Notice Collected Successfully from server")
                this.setState({
                    visible: false,
                    theNotice: resjson,
                    refreshing: false,
                    curTime: moment().format('ddd D MMM \' YY, h:mm:ss a')

                })
                await AsyncStorage.setItem('theNoticeData', JSON.stringify(this.state.theNotice));



                await AsyncStorage.setItem('DepartmentNoticeTime', JSON.stringify(this.state.curTime))

                console.warn("Saved in DB", this.state.curTime)
            }
            else {
                console.log("Departmental Notice Something Wen Wrong While Fetching Notice")
            }


        }
        catch (error) {
            console.log("Departmental Notice NetWork Issue")
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
                titleStyle={{ fontFamily: 'TisaWeb W03 Bold', color: 'black', }}

                subtitle={`${item.body}`}
                subtitleProps={
                    { numberOfLines: 1 }
                }
                subtitleStyle={{ fontFamily: 'TisaWeb W03 Regular', color: 'grey' }}
                chevron
                // bottomDivider
                // topDivider
                onPress={() => this.props.navigation.navigate('viewNotice', {
                    noticeData: item,
                    userToken: this.state.theToken,
                    mainData: this.state.mainData,
                    updateURL: 'notice/update/departmental/'
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
                onCreate={() => this._onCreateNotice()}

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




export { DepartmentalNoticeForm, viewNoticeScreen, UpdateNoticeScreen };
export default DeptNotice;
