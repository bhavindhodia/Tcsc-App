import React, { Fragment } from "react";
import {
    Text, Image, TouchableOpacity,
    TextInput, View, ImageBackground

} from "react-native";
import { Formik } from 'formik';

import * as yup from 'yup'
import { Button } from 'react-native-elements';
import styles from './Style'


import ImageView from 'react-native-image-view';
import ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import { requestPermissions } from '../runtimePermissions';

const NoticeForm = props => {


    useLibraryHandler = async () => {
        const options = {
            quality: 1.0,

            storageOptions: {
                skipBackup: true,
            },
        };
        // let source = null
        // let filename = null
        // let type = null
        await requestPermissions()
        await ImagePicker.showImagePicker(options, response => {

            if (!response.didCancel) {
                let source = response.uri
                let filename = response.fileName
                let type = response.type
                // let result = {source : response.uri ,
                // filename = response.fileName,
                // type =
                // }

                props.theFunction(source, filename, type)
            }

        });


    }


    useDocumentHandler = async () => {
        await requestPermissions()
        let result = await DocumentPicker.pick({
            type: [DocumentPicker.types.pdf, DocumentPicker.types.plainText],
        });

        // console.warn("URI", result)

        if (!result.isCancel) {
            props.fileFunction(result)
        }
    };

    const images = [
        {
            source: {
                uri: props.imageState,
            },

        },
    ];

    return (
        <Formik
            // initialValues={{ title: '', notice: '' }}
            initialValues={props.initialValues}
            onSubmit={props.onSubmit}
            onReset={props.onReset}
            validationSchema={
                yup.object().shape({
                    title: yup
                        .string()
                        .required("Title is required"),
                    notice: yup
                        .string()
                        .required("Notice is required"),
                })}
        >
            {({ values, handleChange, handleSubmit, errors, isValid, touched, setFieldTouched, handleReset }) => (
                <Fragment>
                    <View style={styles.mainContainer} >
                        <ImageBackground style={styles.bgImage} source={require('../../assets/Reg/reg.jpg')} />
                        {/* Title */}
                        <View style={styles.inputContainer}>

                            <TextInput style={styles.inputs}
                                ref={(input) => { this.firstTextInput = input; }}
                                placeholder="Title"
                                name="title"
                                // onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                blurOnSubmit={false}


                                underlineColorAndroid='transparent'
                                onChangeText={handleChange('title')}
                                onBlur={() => setFieldTouched('title')}
                                value={values.title}
                                returnKeyType="next"
                            />
                        </View>
                        {/* Email Errors */}
                        {touched.title && errors.title &&
                            <Text style={styles.err}>{errors.title}</Text>
                        }

                        {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}

                        {/* Notice */}
                        <View style={styles.textAreaContainer}>

                            <TextInput style={styles.textArea}
                                ref={(input) => { this.secondTextInput = input; }}
                                onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                                returnKeyType="next"

                                editable={true}
                                maxLength={4000}
                                multiline={true}
                                numberOfLines={5}

                                onChangeText={handleChange('notice')}
                                value={values.notice}
                                blurOnSubmit={false}
                                onBlur={() => setFieldTouched('notice')}

                                placeholder="Type Your Notice Here"
                                underlineColorAndroid='transparent'
                            />

                        </View>
                        {/* notice Errors */}
                        {touched.notice && errors.notice &&
                            <Text style={styles.err}>{errors.notice}</Text>
                        }

                        {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}


                        {/* Upload Image */}
                        {props.imageState === null && props.fileState === null ?
                            <View>
                                <View style={styles.row} >
                                    <View style={styles.buttonContainer} >
                                        <Button title="IMAGE" onPress={useLibraryHandler} />
                                    </View>

                                    <View style={styles.buttonContainer} >
                                        <Button
                                            title="FILES"
                                            onPress={useDocumentHandler}
                                        />
                                    </View>
                                </View>

                            </View>
                            :

                            <View style={{ alignItems: "center", justifyContent: 'center' }}>
                                {props.imageState != null ?
                                    <View>
                                        <TouchableOpacity

                                            onPress={props.setImageViewVisible}
                                        >
                                            <Image source={{ uri: props.imageState }} style={{ width: 200, height: 200, }} />
                                            <View style={styles.buttonContainer} >

                                            </View>
                                        </TouchableOpacity>
                                        <Button
                                            title="Change Image"
                                            onPress={useLibraryHandler}
                                        />
                                        <ImageView

                                            images={images}

                                            animationType="fade"
                                            isVisible={props.isImageViewVisibleState}
                                            onClose={props.unsetImageViewVisibleClose}

                                        />
                                    </View>
                                    :
                                    <View style={{ alignItems: 'center', }}>
                                        <Button
                                            buttonStyle={{
                                                width: 150,
                                                borderRadius: 5,
                                                borderWidth: 1,
                                                borderColor: '#fff',

                                            }}
                                            raised
                                            onPress={() => Linking.openURL(this.state.noticeData.if_file)}
                                            title="View"

                                        >
                                        </Button>
                                        <Button
                                            title="Change File"
                                            onPress={useDocumentHandler}
                                        />
                                    </View>
                                }


                            </View>



                        }

                        {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}

                        {/* Submit Button */}
                        <View style={styles.row} >
                            <View style={styles.buttonContainer} >
                                <Button
                                    buttonStyle={{ backgroundColor: 'green' }} onPress={handleSubmit} disabled={!isValid}
                                    title="Submit"
                                    loading={props.loading}
                                >
                                </Button>
                            </View>

                            {/* Reset Button */}
                            <View style={styles.buttonContainer} >
                                <Button
                                    buttonStyle={{ backgroundColor: 'red' }}
                                    onPress={handleReset}
                                    title="Reset"

                                    loading={props.loading}
                                >
                                </Button>
                            </View>
                        </View>

                    </View>
                </Fragment>
            )}
        </Formik>

    )
}


export default NoticeForm