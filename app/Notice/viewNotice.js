import React, { Component } from "react";
import {
    View, ScrollView, Linking,
    Text, TouchableOpacity,
    ActivityIndicator, Alert
} from "react-native";

import { Image, Button, Icon } from 'react-native-elements'

import moment from 'moment'
import ImageView from 'react-native-image-view';

import styles from './noticestyles'

class ViewNoticeScreen extends Component {

    constructor(props) {
        super(props)

        this.state = ({
            noticeData: this.props.navigation.state.params.noticeData,
            userToken: this.props.navigation.state.params.userToken,
            isImageViewVisible: false,
            mainData: this.props.navigation.state.params.mainData,

        })
        // console.warn(this.state.mainData)
    }



    deleteItem = async () => {


        json = (response) => {
            return response.json()
        }
        try {

            u_id = this.state.noticeData.id
            updateURL = this.props.navigation.state.params.updateURL
            // console.warn("UID =", u_id)
            const urls = global.Foo + updateURL + u_id

            // console.warn("URLS =>", urls)
            // console.warn("TOKEN =>", this.state.userToken)


            const method = "DELETE"
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + this.state.userToken

            }
            await fetch(urls, {
                method: method,
                headers: headers,
            })
                .then(json)
                .then((json) => {


                    if (json.error) {

                        console.warn(json.error)
                    }

                    else {



                        Alert.alert(
                            'Status',
                            'Notice Deleted',
                            [
                                {
                                    text: 'Cancel',

                                    style: 'cancel',
                                },
                                { text: 'OK', onPress: () => this.props.navigation.navigate('theNotice') },
                            ],
                            { cancelable: true },
                        );

                    }


                }).catch(function (error) {
                    console.log('request failed !!! =>', error)
                })

        }
        catch (error) {
            console.warn(error)
        }
    }
    render() {


        const s = new Date(this.state.noticeData.created_date)
        const thedate = moment(s).format('ddd D MMM \' YY, h:mm:ss a')

        const images = [
            {
                source: {
                    uri: this.state.noticeData.if_image,
                },
                title: this.state.imageName,
                width: 806,
                height: 720,
            },
        ];


        return (
            <ScrollView>
                <View style={styles.container}>

                    {/* {this.state.deleting !== false &&
                        Alert.alert(
                            'Status',
                            'Deleting ...',
                        )

                    } */}

                    <Text style={styles.title} >{this.state.noticeData.title} </Text>
                    <View style={styles.row} >
                        <Text style={styles.subtitles} > {thedate} </Text>
                        {this.state.mainData.role !== 'STUDENT' &&

                            <>
                                <Icon
                                    raised
                                    reverse
                                    name='edit'
                                    type='material'
                                    color='#f50'
                                    size={20}
                                    containerStyle={{ marginLeft: 'auto' }}

                                    onPress={() => this.props.navigation.navigate('updateNotice', {
                                        defaultValue: this.state.noticeData,
                                        updateURL: this.props.navigation.state.params.updateURL
                                    })}

                                />
                                <Icon
                                    raised
                                    reverse
                                    name='delete'
                                    type='material'
                                    color='red'
                                    size={20}
                                    onPress={() => {
                                        this.deleteItem()
                                    }}


                                />
                            </>
                        }

                    </View>
                    <Text style={styles.theBody} > {this.state.noticeData.body} </Text>

                    {this.state.noticeData.if_file != null || this.state.noticeData.if_image != null ?

                        <View>
                            {this.state.noticeData.if_image != null ?
                                <View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({
                                                isImageViewVisible: true,
                                            });
                                        }}
                                    >
                                        <Image
                                            source={{ uri: this.state.noticeData.if_image }}
                                            style={{ width: 200, height: 200 }}
                                            PlaceholderContent={<ActivityIndicator />}
                                        />

                                        <ImageView

                                            images={images}

                                            animationType="fade"
                                            isVisible={this.state.isImageViewVisible}

                                            onClose={() => this.setState({ isImageViewVisible: false })}

                                        />
                                    </TouchableOpacity>


                                </View>
                                :
                                <View style={{ alignItems: 'center', }}>
                                    <Button
                                        buttonStyle={styles.btn}
                                        raised
                                        onPress={() => Linking.openURL(this.state.noticeData.if_file)}
                                        title="View"

                                    >
                                    </Button>
                                </View>
                            }
                        </View>
                        :
                        <View></View>

                    }


                </View>
            </ScrollView>






        );
    }
}
export default ViewNoticeScreen;
