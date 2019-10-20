import React, { Component } from "react";
import {
    View,
    ActivityIndicator,
    ScrollView, FlatList
} from "react-native";
import { ListItem, Text, Card, Icon } from 'react-native-elements'
import moment from "moment";

import styles from './attstyles'


class CheckAttandanceScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            studentToken: this.props.navigation.getParam('theToken'),
            studentProfile: this.props.navigation.getParam('profileData'),
            attandanceData: null,
            isLoading: true,
            present: [],
            absent: [],
            per: null


        }
        this.fetchAttandance()
    }

    fetchAttandance = async () => {
        const urls = global.Foo + 'attendance/check/' + this.state.studentProfile.roll_no + '/'
        console.warn('urk', urls);


        const method = "GET"
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.state.studentToken
        }
        const response = await fetch(urls, {
            method: method,
            headers: headers
        })


        const json = await response.json()

        const x = []
        const y = []
        json.filter(item => {
            if (item.status === true) {


                x.push(item)

            }
            else {

                y.push(item)
            }

        })

        json.map((item, i) => {
            item['attandance_date'] = moment(item.attandance_date).format("MMM Do YY")
            item['attandance_s_time'] = moment(item.attandance_s_time, "HH:mm:ss").format("hh:mm A")

            item['attandance_e_time'] = moment(item.attandance_e_time, "HH:mm:ss").format("hh:mm A")
        })
        // console.warn('x');

        const p = (x.length / json.length) * 100
        this.setState({
            present: x,
            absent: y,
            per: p.toFixed(2),
            attandanceData: json,
            isLoading: false

        })

        // console.warn("DATA", this.state.attandanceData);

    }
    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
        <ListItem
            // key={i}
            title={item.attandance_date}
            // titleProps={new Date()}

            titleStyle={item.status === true ? { color: 'green', fontFamily: 'TisaWeb W03 Bold', fontSize: 20 } : { color: 'red', fontFamily: 'TisaWeb W03 Bold', fontSize: 20 }}

            subtitle={item.attandance_s_time + ' -- ' + item.attandance_e_time}
            subtitleStyle={[styles.subtitletxt, { fontSize: 15 }]}


            bottomDivider

            rightIcon={
                <Icon
                    type="entypo"
                    name={item.status === true ? "check" : 'cross'}
                    color={item.status === true ? "green" : 'red'}
                />

            }

        />
    )



    render() {
        return (

            <>
                {this.state.isLoading === true ?
                    <View style={{
                        top: 50,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }} >
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                    :
                    <>
                        <Card
                            title={this.state.studentProfile.roll_no}
                            titleStyle={[styles.titletxt, { fontSize: 25 }]}
                        >
                            <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >

                                    <Text style={styles.cardText} > Total {this.state.attandanceData.length}  </Text>

                                    <Text style={[styles.cardText, { color: this.state.per >= 75 ? 'green' : 'red' }]} >Percentage {this.state.per} </Text>

                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >

                                    <Text style={styles.cardText} > present {this.state.present.length} </Text>

                                    <Text style={styles.cardText} > Absent {this.state.absent.length} </Text>

                                </View>






                            </View>

                        </Card>


                        <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.attandanceData}
                            renderItem={this.renderItem}
                        />
                    </>
                }
            </>


        );
    }
}
export default CheckAttandanceScreen;
