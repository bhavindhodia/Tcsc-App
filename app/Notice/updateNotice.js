import React, { Component } from "react";
import {
    Keyboard,

} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import NoticeForm from '../Forms/baseNoticeForm'

class UpdateNoticeScreen extends Component {
    constructor(props) {
        super(props)
        const bvn = this.props.navigation.state.params.defaultValue

        this.state = {
            noticeData: bvn,
            isLoading: false,
            file: bvn.if_file,
            old_image: bvn.if_image,
            new_img: null,
            imageName: null,
            imageType: null,
            isImageViewVisible: false,
            theToken: null
        }

        this._bootstrapAsync();

    }
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        this.setState({
            theToken: userToken
        })



    }
    UpdateNotice = async (values) => {


        json = (response) => {
            return response.json()
        }

        try {
            const thebody = new FormData();


            thebody.append('title', values.title,
            );
            thebody.append('body', values.notice,
            );
            // console.warn("AFEET Image", this.state.new_image)
            if (this.state.new_img != null) {
                const uri = this.state.new_img

                const name = this.state.imageName
                const type = 'image/jpeg'
                thebody.append('if_image', {
                    uri,
                    name, type

                });
            }
            if (this.state.file != null) {
                const file_type = 'files/pdf';
                const file_uri = this.state.file.uri
                const file_name = this.state.file.name
                thebody.append('if_file', {
                    uri: file_uri,
                    name: file_name,
                    type: file_type

                });
            }
            console.warn("THE BODY = ", thebody)
            u_id = this.state.noticeData.id
            updateURL = this.props.navigation.state.params.updateURL
            // console.log(postURL)
            const urls = global.Foo + updateURL + u_id

            console.log("URLS =>", urls)
            console.log("TOKEN =>", this.state.theToken)


            const method = "PATCH"
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + this.state.theToken

            }
            await fetch(urls, {
                method: method,
                headers: headers,
                body: thebody,
            })
                .then(json)
                .then((json) => {
                    // console.log('request succeeded with json response', json)
                    // console.warn(json.user.email)
                    this.setState({
                        isLoading: false
                    })
                    if (json.error) {

                        console.warn(json.error)
                    }

                    else {

                        alert("Updated !!");
                        this.setState({ image: null, imageName: null, isLoading: false });
                        this.props.navigation.navigate('viewNotice')
                    }


                }).catch(function (error) {
                    this.setState({ isLoading: false });
                    console.log('Update request failed !!! =>', error)
                })

        }
        catch (error) {
            console.warn(error)
        }
    }

    render() {
        return (
            <NoticeForm
                initialValues={{ title: this.state.noticeData.title, notice: this.state.noticeData.body }}
                onSubmit={values => {
                    Keyboard.dismiss()

                    this.setState({
                        isLoading: true
                    })
                    this.UpdateNotice(values)
                }}
                onReset={
                    () => this.setState({
                        image: null,
                        imageName: null,
                        file: null,
                    })
                }
                loading={this.state.isLoading}
                imageState={this.state.old_image}
                theFunction={(source, filename, type) => {
                    this.setState({
                        new_img: source || null,
                        imageName: filename || null,
                        imageType: type || null,
                        old_image: source || null,
                    })
                }}
                fileFunction={(result) => {
                    this.setState({
                        file: result
                    })

                }}
                fileState={this.state.file}
                setImageViewVisible={() => {
                    this.setState({
                        isImageViewVisible: true,
                    });
                }}
                unsetImageViewVisibleClose={() => {
                    this.setState({
                        isImageViewVisible: false,
                    });
                }}
                isImageViewVisibleState={this.state.isImageViewVisible}
            >

            </NoticeForm>
        );
    }
}
export default UpdateNoticeScreen;
