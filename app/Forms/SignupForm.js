// Formik x React Native example
import React, { Fragment } from 'react';
import {
    Text, Alert, ToastAndroid,
    TouchableHighlight, TextInput, View, Image, Keyboard,
    Picker, ScrollView
} from 'react-native';
import { Formik } from 'formik';
import './Global'
import * as yup from 'yup'
import { Button, Icon } from 'react-native-elements';

import styles from './Style'

class SignUpForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            role: "",
            dept: "CS",
            isLoading: false,
        }


    }

    async _onHandelSubmit(values) {
        try {
            // console.warn("Values", values)
            // console.warn("Values . ", values.username)
            const urls = global.Foo + "register/"


            const response = await fetch(urls, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": values.username,
                    "password": values.password,
                    "email": values.email,
                    "first_name": values.fname,
                    "last_name": values.lname,
                    "pno": values.pno,
                    "role": values.role,
                    "department": values.department

                }),

            })
            this.setState({ isLoading: false })
            const resp = await response
            const json = await response.json()
            // console.warn("res", resp);
            // console.warn("json", json);
            if (resp.status === 400) {
                Alert.alert(
                    'Error',
                    json.username[0],
                    [
                        { text: 'Lemme Correct', },
                    ],
                    { cancelable: false },
                );
            }
            else {
                ToastAndroid.showWithGravityAndOffset(
                    'Account Successfully Created',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                );
                this.props.navigation.navigate('Login')
            }


        }
        catch (error) {
            console.warn(error)
        }

    }



    render() {
        var role = ["ADMIN", "TEACHER", "STUDENT"]
        const department = ["CS", "BMM", "BMS", "IT"]
        return (
            // <ScrollView
            //     style={{
            //         marginTop: 10,

            //     }}
            // // showsVerticalScrollIndicator={false}
            // >
            <>

                <Formik initialValues={{ email: '', username: '', fname: '', lname: '', password: '', pno: '', role: '  STUDENT', department: 'CS' }}
                    onSubmit={values => {
                        Keyboard.dismiss()
                        this.setState({
                            isLoading: true
                        })
                        // console.warn(values)
                        this._onHandelSubmit(values)
                    }}
                    validationSchema={
                        yup.object().shape({
                            email: yup
                                .string()
                                .email("Not a valid e-mail")
                                .required("E-mail is required"),
                            username: yup
                                .string()
                                .required("Username is required"),
                            fname: yup
                                .string()
                                .required("First name is required"),
                            lname: yup
                                .string()
                                .required("Last name is required"),
                            pno: yup
                                .number()

                                .required("Phone No is required"),
                            role: yup
                                .string(),

                            department: yup
                                .string(),

                            password: yup
                                .string()
                                .min(6, "Less than  6 ")
                                .required(),
                        })}

                >
                    {({ values, handleChange, handleSubmit, errors, isValid, touched, setFieldTouched, setFieldValue }) => (
                        <Fragment>

                            {/* <ScrollView
                            style={{
                                marginTop: 10,
                                marginHorizontal: 50,
                            }}
                            showsVerticalScrollIndicator={false}
                        > */}
                            <View style={{ marginHorizontal: 50, }}>

                                {/* Email */}
                                <View style={[styles.inputContainer, { marginTop: 90 }]}>

                                    <TextInput style={styles.inputs}
                                        placeholder="Email"
                                        name="email"
                                        keyboardType="email-address"
                                        underlineColorAndroid='transparent'
                                        onChangeText={handleChange('email')}
                                        onBlur={() => setFieldTouched('email')}
                                        value={values.email}
                                        returnKeyType="next"

                                        onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                        blurOnSubmit={false}
                                        ref={(input) => { this.firstTextInput = input; }}

                                    />
                                    <Icon
                                        iconStyle={styles.inputIcon}
                                        name='email'
                                        type='material-community'
                                        color='#fc6203' />

                                    {/* <Image style={styles.inputIcon} source={require('../../assets/Reg/email.png')} /> */}

                                </View>
                                {/* Email Errors */}
                                {touched.email && errors.email &&
                                    <Text style={styles.err}>{errors.email}</Text>
                                }

                                {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}

                                {/* USERNAME */}
                                <View style={styles.inputContainer}>

                                    <TextInput style={styles.inputs}
                                        ref={(input) => { this.secondTextInput = input; }}
                                        onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                                        returnKeyType="next"

                                        onChangeText={handleChange('username')}
                                        value={values.username}
                                        blurOnSubmit={false}
                                        onBlur={() => setFieldTouched('username')}

                                        placeholder="Username"
                                        underlineColorAndroid='transparent'
                                    />
                                    <Icon
                                        iconStyle={styles.inputIcon}
                                        name='user'
                                        type='font-awesome'
                                        color='#fc6203' />
                                </View>
                                {/* Username Errors */}
                                {touched.username && errors.username &&
                                    <Text style={styles.err}>{errors.username}</Text>
                                }

                                {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}


                                {/* FIRST NAME */}
                                <View style={styles.inputContainer}>

                                    <TextInput style={styles.inputs}
                                        ref={(input) => { this.thirdTextInput = input; }}
                                        onSubmitEditing={() => { this.fourthTextInput.focus(); }}
                                        returnKeyType="next"

                                        onChangeText={handleChange('fname')}
                                        value={values.fname}
                                        blurOnSubmit={false}
                                        onBlur={() => setFieldTouched('fname')}

                                        placeholder="First Name"
                                        underlineColorAndroid='transparent'
                                    />
                                    <Icon
                                        iconStyle={styles.inputIcon}
                                        name='user-secret'
                                        type='font-awesome'
                                        color='#fc6203' />
                                </View>
                                {/* fullname Errors */}
                                {touched.fname && errors.fname &&
                                    <Text style={styles.err}>{errors.fname}</Text>
                                }

                                {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}

                                {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}


                                {/* LAST NAME */}
                                <View style={styles.inputContainer}>

                                    <TextInput style={styles.inputs}
                                        ref={(input) => { this.fourthTextInput = input; }}
                                        onSubmitEditing={() => { this.fifthTextInput.focus(); }}
                                        returnKeyType="next"

                                        onChangeText={handleChange('lname')}
                                        value={values.lname}
                                        blurOnSubmit={false}
                                        onBlur={() => setFieldTouched('lname')}

                                        placeholder="Last Name"
                                        underlineColorAndroid='transparent'
                                    />
                                    <Icon
                                        iconStyle={styles.inputIcon}
                                        name='users'
                                        type='font-awesome'
                                        color='#fc6203' />
                                </View>
                                {/* fullname Errors */}
                                {touched.lname && errors.lname &&
                                    <Text style={styles.err}>{errors.lname}</Text>
                                }

                                {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}


                                {/* PNO */}
                                <View style={styles.inputContainer}>

                                    <TextInput style={styles.inputs}
                                        keyboardType='numeric'
                                        ref={(input) => { this.fifthTextInput = input; }}

                                        returnKeyType="next"

                                        onChangeText={handleChange('pno')}
                                        value={values.pno}
                                        blurOnSubmit={false}
                                        onBlur={() => setFieldTouched('pno')}

                                        placeholder="Phone Number"
                                        underlineColorAndroid='transparent'
                                    />
                                    <Icon
                                        iconStyle={styles.inputIcon}
                                        name='old-phone'
                                        type='entypo'
                                        color='#fc6203' />
                                </View>
                                {/* fullname Errors */}
                                {touched.pno && errors.pno &&
                                    <Text style={styles.err}>{errors.pno}</Text>
                                }

                                {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}

                                {/* Role */}
                                <View style={styles.inputContainer}>
                                    <Picker style={{ height: 40, width: 400 }}


                                        mode='dropdown'
                                        itemStyle={{ backgroundColor: "grey" }}
                                        selectedValue={this.state.role}

                                        blurOnSubmit={false}

                                        onValueChange={(itemValue, itemIndex) => {
                                            this.setState({ role: itemValue })
                                            setFieldValue('role', itemValue)

                                        }
                                        }
                                    >

                                        {role.map((item, index) => {
                                            return (<Picker.Item label={item} value={item} key={index} />)
                                        })}
                                    </Picker>
                                    {touched.role && errors.role &&
                                        <Text style={styles.err}>{errors.role}</Text>
                                    }
                                </View>
                                {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}

                                {/* department */}

                                <View style={styles.inputContainer}>
                                    <Picker style={{ height: 40, width: 400 }}

                                        prompt="Select Dept"
                                        mode='dropdown'

                                        itemStyle={{ backgroundColor: "grey" }}
                                        selectedValue={this.state.dept}

                                        blurOnSubmit={false}

                                        onValueChange={(itemValue, itemIndex) => {
                                            this.setState({ dept: itemValue })
                                            setFieldValue('department', itemValue)
                                        }
                                        }
                                    >
                                        {department.map((item, index) => {
                                            return (<Picker.Item label={item} value={item} key={index} />)
                                        })}
                                    </Picker>
                                    {touched.department && errors.department &&
                                        <Text style={styles.err}>{errors.department}</Text>
                                    }
                                </View>
                                {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}


                                <View style={styles.inputContainer}>
                                    <TextInput style={styles.inputs}
                                        ref={(input) => { this.sixthTextInput = input; }}
                                        name='password'
                                        placeholder="Password"
                                        secureTextEntry={true}
                                        underlineColorAndroid='transparent'
                                        onChangeText={handleChange('password')}

                                        blurOnSubmit={false}
                                        onSubmitEditing={handleSubmit}
                                        value={values.password}
                                    />
                                    <Icon
                                        iconStyle={styles.inputIcon}
                                        name='key'
                                        type='font-awesome'
                                        color='#fc6203' />
                                </View>
                                {touched.password && errors.password &&
                                    <Text style={styles.err}>{errors.password}</Text>
                                }


                                <View style={{
                                    flex: 1, alignItems: 'center',
                                    justifyContent: 'center',
                                }} >
                                    <Button
                                        //style={[styles.buttonContainer, styles.loginButton]}
                                        buttonStyle={styles.loginButton}
                                        containerStyle={styles.buttonContainer}
                                        onPress={handleSubmit}
                                        disabled={!isValid}
                                        title="Sign Up"
                                        titleStyle={styles.btnText}
                                        loading={this.state.isLoading}
                                    >
                                    </Button>
                                </View>

                                <View style={styles.signup} >

                                    <Text style={styles.signupText} >Have an account ?</Text><Text>  </Text><TouchableHighlight onPress={() => this.props.navigation.navigate('Login')} ><Text style={styles.signupbtn} >Login</Text></TouchableHighlight>
                                </View>
                            </View>

                        </Fragment>
                    )}
                </Formik>
            </>
        )
    }
}


export default (SignUpForm)




