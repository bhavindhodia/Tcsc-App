import React, { Component } from "react";
import {
    View, ActivityIndicator, RefreshControl, ScrollView,
    SafeAreaView,

    Alert,

} from "react-native";
import { Card, Button, ListItem, } from "react-native-elements";

import styles from './attstyles'



class ActivateStudentScreen extends Component {


    constructor(props) {
        super(props)

        this.state = {
            selectSection: 0,
            teacherToken: this.props.navigation.getParam('theToken'),
            studentListData: [],
            isLoading: true,
            isSubmiting: false,
            theRefresh: false,
            theDivision: this.props.navigation.getParam('attandanceDiv'),
        }



    }
    componentDidMount() {
        this.studentList()
    }

    selectSection = (val) => {
        this.setState({
            selectSection: val
        })
    }
    _onRefresh = async () => {

        this.setState({
            studentListData: [],
            isLoading: true,
            theRefresh: true,
            isSubmiting: true
        })

        this.studentList()
    }



    studentList = async () => {
        const urls = global.Foo + 'attandance/class/' + this.state.theDivision
        // console.warn("URL", urls);
        // console.warn("TOKEn", this.state.teacherToken);
        const method = "GET"
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.state.teacherToken
        }

        const response = await fetch(urls, {
            method: method,
            headers: headers
        })

        const json = await response.json()


        this.setState({
            studentListData: json,
            isLoading: false,
            theRefresh: false,
            isSubmiting: false


        })



    }

    theUpdate = async (userData, val) => {
        this.setState({
            isSubmiting: true
        })
        const urls = global.Foo + 'attendance/activate/' + userData.username.id + '/'
        // console.warn("URL", urls);

        const method = "PATCH"
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.state.teacherToken
        }
        const body = JSON.stringify({
            "is_active": val
        })

        const response = await fetch(urls, {
            method: method,
            headers: headers,
            body: body
        })

        // const json = await response.json()

        this.setState({
            isSubmiting: false
        })

        if (response.status === 200) {
            Alert.alert(
                'Success',
                'Successfully Updated',
                [
                    {
                        text: 'OK',
                        onPress: this._onRefresh
                    },
                ],
                { cancelable: false },
            );
        }


    }

    renderSection = () => {
        let temp = this.state.selectSection

        let not_active = this.state.studentListData.filter((o) => o.username.is_active === false)

        let active = this.state.studentListData.filter((o) => o.username.is_active === true)

        if (this.state.isLoading) {
            return (<ActivityIndicator style={styles.activityIndicatorWrapper} animating={this.state.isLoading} size="large" color="#0000ff" />)
        }


        else {

            if (temp === 0) {
                return (

                    <View>

                        {
                            not_active.map((item, i) => (
                                <ListItem
                                    key={i}
                                    disabled={this.state.isSubmiting}
                                    disabledStyle={{ backgroundColor: '#d1d1d1' }}
                                    leftAvatar={{ source: { uri: item.profile_picture } }}
                                    title={item.roll_no}
                                    titleStyle={[styles.titletxt, { fontSize: 22, }]}

                                    subtitle={item.username.username}

                                    subtitleStyle={[styles.subtitletxt, { fontSize: 16 }]}

                                    rightIcon={{
                                        name: 'cross', type: 'entypo', color: 'red', size: 25, raised: true, onPress: () => this.theUpdate(item, true)
                                    }}

                                />
                            ))
                        }
                    </View>

                )
            }
            else {
                return (
                    <View>
                        {
                            active.map((item, i) => (
                                <ListItem
                                    disabled={this.state.isSubmiting}
                                    disabledStyle={{ backgroundColor: '#d1d1d1' }}
                                    key={i}
                                    leftAvatar={{ source: { uri: item.profile_picture } }}
                                    title={item.roll_no}
                                    titleStyle={[styles.titletxt, { fontSize: 22, }]}
                                    onPress={() => this.theUpdate(item, false)}
                                    subtitle={item.username.username}
                                    subtitleStyle={[styles.subtitletxt, { fontSize: 16 }]}
                                    rightIcon={{
                                        name: 'check', type: 'entypo', color: 'green', size: 25, raised: true, onPress: () => this.theUpdate(item, false)
                                    }}

                                />
                            ))
                        }
                    </View>
                )
            }
        }

    }






    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={{ flex: 1 }}
                    refreshControl={
                        <RefreshControl refreshing={this.state.theRefresh} onRefresh={this._onRefresh} />
                    }
                >

                    <Card
                        title={this.state.theDivision}
                        titleStyle={[styles.titletxt, { fontSize: 25 }]}
                    >
                    </Card>

                    <View>

                        <View style={{ marginVertical: 15, backgroundColor: "#E7E7E7" }} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }} >
                                <Button
                                    type='clear'
                                    title="INACTIVE"
                                    titleStyle={[styles.titletxt, { color: 'red', fontSize: 16 }]}
                                    onPress={() => this.selectSection(0)}
                                />

                                <Button
                                    type='clear'

                                    title="ACTIVE"
                                    titleStyle={[styles.titletxt, { color: 'green', fontSize: 16 }]}
                                    onPress={() => this.selectSection(1)}
                                />


                            </View>
                            {this.renderSection()}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>

        );
    }
}



export default ActivateStudentScreen;
