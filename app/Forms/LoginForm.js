// Formik x React Native example
import React, { Fragment } from 'react';
import {
    Text, TouchableHighlight,
    TextInput, View, Image, Keyboard, ScrollView
} from 'react-native';
import { Formik } from 'formik';

import * as yup from 'yup'
import { Button, Icon } from 'react-native-elements';
import styles from './Style'
import AsyncStorage from '@react-native-community/async-storage';


class LoginForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            token: null,
            isAuthenticated: null,
            isLoading: false,
            user: null,
            errors: null,

        }

    }


    ManagementLogin = async (values) => {

        try {
            const urls = global.Foo + "rest-auth/login/"


            const method = "POST"
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'

            }
            const body = JSON.stringify({
                "username": values.username,
                "password": values.passwd
            })

            const res = await fetch(urls, {
                method: method,
                headers: headers,
                body: body,
            })

            const response = await res
            const json = await res.json()
            this.setState({
                isLoading: false
            })

            // console.warn('res', response);
            // console.warn('json', json);

            if (response.status === 200) {
                await AsyncStorage.setItem('userToken', json.key)
                this.props.navigation.navigate('AuthLoading')
            }
            else {
                this.setState({
                    errors: json.non_field_errors
                })
            }


        }
        catch (error) {
            console.warn(error)
        }
    }


    render() {


        return (
            // <View style={{ flex: 1 }} >
            <View
                style={{
                    marginTop: 10,
                    marginHorizontal: 50,
                }}
                showsVerticalScrollIndicator={false}
            >
                <Formik initialValues={{ username: '', passwd: '' }}
                    onSubmit={(values) => {
                        Keyboard.dismiss()
                        this.setState({
                            isLoading: true
                        })
                        this.ManagementLogin(values)

                    }}
                    validationSchema={
                        yup.object().shape({
                            username: yup
                                .string()
                                .required("How will you recover your password"),

                            passwd: yup
                                .string()
                                .min(8, "Should be more than 8  letters")
                                .required('Thing you may forget'),
                        })}

                >
                    {({ values, handleChange, handleSubmit, errors, isValid, touched, setFieldTouched }) => (
                        <Fragment>
                            <View style={styles.mainContainer} >

                                {/* Email */}
                                <View style={styles.inputContainer}>

                                    <TextInput style={styles.inputs}
                                        placeholder="Username"
                                        name="username"

                                        underlineColorAndroid='transparent'
                                        onChangeText={handleChange('username')}
                                        onBlur={() => setFieldTouched('username')}
                                        value={values.username}
                                        returnKeyType="next"

                                        onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                        blurOnSubmit={false}
                                        ref={(input) => { this.firstTextInput = input; }}

                                    />
                                    <Icon
                                        iconStyle={styles.inputIcon}
                                        name='email'
                                        type='material-community'
                                        color='#eb2abc' />

                                </View>
                                {/* Email Errors */}
                                {touched.username && errors.username &&
                                    <Text style={styles.err}>{errors.username}</Text>
                                }

                                {/* Password */}
                                <View style={styles.inputContainer}>
                                    <TextInput style={styles.inputs}
                                        ref={(input) => { this.secondTextInput = input; }}
                                        name='passwd'
                                        placeholder="Password"
                                        secureTextEntry={true}
                                        underlineColorAndroid='transparent'
                                        onChangeText={handleChange('passwd')}

                                        blurOnSubmit={false}
                                        onSubmitEditing={handleSubmit}
                                        value={values.passwd}
                                    />
                                    <Icon
                                        iconStyle={styles.inputIcon}
                                        name='key'
                                        type='font-awesome'
                                        color='#eb2abc' />
                                </View>
                                {/* Password Error */}
                                {touched.passwd && errors.passwd &&
                                    <Text style={styles.err}>{errors.passwd}</Text>
                                }

                                {/* Submit Button */}
                                <Button

                                    buttonStyle={styles.loginButton}
                                    containerStyle={styles.buttonContainer}
                                    onPress={handleSubmit} disabled={!isValid}
                                    title="Login"
                                    titleStyle={styles.btnText}
                                    loading={this.state.isLoading}
                                    loadingProps={{
                                        size: 25
                                    }}
                                >
                                </Button>

                                {this.state.errors != null &&
                                    <Text style={styles.err}>{this.state.errors} </Text>
                                }
                            </View>
                        </Fragment>
                    )}
                </Formik>

                <View style={[styles.signup, { marginBottom: 10 }]} >

                    <Text style={styles.signupText} >Don't have an account</Text><Text>  </Text><TouchableHighlight onPress={() => this.props.navigation.navigate('SignUp')} ><Text style={styles.signupbtn} >Sign Up</Text></TouchableHighlight>
                </View>

            </View>
        )
    }
}







export default (LoginForm)




