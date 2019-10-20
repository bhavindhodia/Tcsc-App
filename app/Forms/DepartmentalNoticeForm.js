import React from "react";
import {
    Keyboard,
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

import NoticeForm from './baseNoticeForm'


class DepartmentalNoticeForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            file: null,
            image: null,
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

    UploadNotice = async (values) => {


        json = (response) => {
            return response.json()
        }

        try {
            const thebody = new FormData();

            thebody.append('title', values.title,
            );
            thebody.append('body', values.notice,
            );
            thebody.append('department_name', this.props.navigation.state.params.userDept,
            );

            if (this.state.image != null) {
                const uri = this.state.image
                const name = this.state.imageName
                const type = this.state.imageType
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
            // console.log("THE BODY = ", thebody)

            const urls = global.Foo + this.props.navigation.state.params.postURL
            // console.log("URLS =>", urls)
            // console.log("thebody =>", thebody)

            const method = "POST"
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

                        alert("Upload success!");
                        this.setState({ image: null, imageName: null });
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
        return (

            <NoticeForm
                initialValues={{ title: '', notice: '' }}
                onSubmit={values => {
                    Keyboard.dismiss()

                    this.setState({
                        isLoading: true
                    })
                    this.UploadNotice(values)
                }}
                onReset={
                    () => this.setState({
                        image: null,
                        imageName: null,
                        file: null,
                    })
                }
                loading={this.state.isLoading}
                imageState={this.state.image}
                theFunction={(source, filename, type) => {
                    this.setState({
                        image: source || null,
                        imageName: filename || null,
                        imageType: type || null
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
            ></NoticeForm>
        )
    }
}
export default DepartmentalNoticeForm;

