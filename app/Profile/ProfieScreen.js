import React, { Component } from "react";
import {
    View, Alert,
    Text, Image, ScrollView,
    Picker

} from "react-native";
import { Button, Input } from "react-native-elements";
import styles from './ProfileStyles'
import AsyncStorage from '@react-native-community/async-storage';

// import MyEnhancedForm from '../Forms/userDetails'

class ProfileScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mainData: [],
            userToken: null,
            stream: null,
            classes: "",
            rollno: null,
            division: "",
            selectedOption: null,
            selectedOption2: null,
            profileData: [],


        }




        this._bootstrapAsync();


    }

    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        const userData = await AsyncStorage.getItem('userData')
        const userProfile = await AsyncStorage.getItem('profileData')
        const x = JSON.parse(userData)
        const pd = JSON.parse(userProfile)
        this.setState({
            mainData: x,
            userToken: userToken,
            profileData: pd,
        })


        // console.warn("TOKEN", this.state.profileData);
        // console.warn("DATA", this.state.mainData);
        // console.warn("PP", this.state.profileData.profile_picture);



        this.props.navigation.navigate(userToken ? 'Dash' : 'Login');
    };
    handleChange1 = async (selectedOption) => {
        this.setState({ selectedOption });
        console.warn("STATE", this.state.selectedOption)
    };

    handleChange2 = (selectedOption) => {
        this.setState({ selectedOption2: selectedOption })
    }

    _onHandelSubmit = async () => {

        try {
            console.warn("Values", this.state.stream)

            const urls = global.Foo + "register/profile_details/"
            console.warn(urls)
            const res = await fetch(urls)
            const theprofile = new FormData();
            theprofile.append('stream', this.state.stream)
            theprofile.append('classes', this.state.classes)
            theprofile.append('division', this.state.division)
            theprofile.append('roll_no', this.state.rollno)
            console.warn(theprofile)
            await fetch(urls, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Token ' + this.state.userToken
                },
                body: theprofile

            })
                .then((response) => response.json())
                .then((responseJson) => {
                    AsyncStorage.setItem('profileData', JSON.stringify(responseJson))
                    Alert.alert(
                        'Success',
                        'Profile Detail Submittedt ',
                        [
                            { text: 'Done', onPress: () => this.props.navigation.navigate('HomeS') },

                        ],
                        { cancelable: true },
                    );

                    // console.warn(responseJson);
                    //  this.props.navigation.navigate('Login')
                })
                .catch((error) => {
                    console.warn(error);
                });
        }
        catch (error) {
            console.warn(error)
        }

    }


    render() {
        const stream = ['JCSCI', 'JCCOM', 'DEGSCI', 'DEGCOM'];
        const options2 = [
            { value: 'FYJCSCI', label: 'FY JC SCI', link: 'JCSCI' },
            { value: 'SYJCSCI', label: 'SY JC SCI', link: 'JCSCI' },

            { value: 'FYJCCOM', label: 'FY JCC OM', link: 'JCCOM' },
            { value: 'SYJCCOM', label: 'SY JC COM', link: 'JCCOM' },

            { value: 'FYBSCSCI', label: 'FY BSC SCI', link: 'DEGSCI' },
            { value: 'SYBSCSCI', label: 'SY BSC SCI', link: 'DEGSCI' },
            { value: 'TYBSCSCI', label: 'TY BSC SCI', link: 'DEGSCI' },

            { value: 'FYBSCCOM', label: 'FY BSC COM', link: 'DEGCOM' },
            { value: 'SYBSCCOM', label: 'SY BSC COM', link: 'DEGCOM' },
            { value: 'TYBSCCOM', label: 'TY BSC COM', link: 'DEGCOM' },
        ];
        const options3 = [
            { value: 'TYCSA', label: 'TY CS A', link: 'TYBSCSCI' },
            { value: 'TYCSB', label: 'TY CS B', link: 'TYBSCSCI' },

            { value: 'TYIT', label: 'TY IT', link: 'TYBSCSCI' },

            { value: 'TYCHEM', label: 'TY CHEM', link: 'TYBSCSCI' },

            { value: 'TYBMMA', label: 'TY BMM A', link: 'TYBSCCOM' },
            { value: 'TYBMMB', label: 'TY BMM B', link: 'TYBSCCOM' },

            { value: 'TYBMSA', label: 'TY BMS A', link: 'TYBSCCOM' },
            { value: 'TYBMSB', label: 'TY BMS B', link: 'TYBSCCOM' },

        ];


        const filteredOptions = options2.filter((o) => o.link === this.state.stream)

        const filteredOptions2 = options3.filter((o) => o.link === this.state.classes)

        return (
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <Image style={styles.avatar}
                            source={{ uri: this.state.profileData.profile_picture }} />

                        <Text style={styles.name}>{this.state.mainData.first_name} </Text>
                        <Text style={styles.userInfo}>{this.state.mainData.email} </Text>
                        <Text style={styles.userInfo}>{this.state.mainData.username} </Text>
                    </View>
                </View>
                {this.state.mainData.role === 'STUDENT' && this.state.profileData.not_error &&
                    <View>
                        <Picker style={{ height: 40, width: 400 }}


                            mode='dropdown'
                            itemStyle={{ backgroundColor: "grey" }}
                            selectedValue={this.state.stream}

                            blurOnSubmit={false}

                            onValueChange={(itemValue, itemIndex) => {
                                // console.warn(itemValue);

                                this.setState({ stream: itemValue })
                                // console.warn("STATE", this.state.stream);



                            }
                            }
                        >

                            {stream.map((item, index) => {
                                return (<Picker.Item label={item} value={item} key={index} />)
                            })}
                        </Picker>
                        <Picker style={{ height: 40, width: 400 }}


                            mode='dropdown'
                            itemStyle={{ backgroundColor: "grey" }}
                            selectedValue={this.state.classes}

                            blurOnSubmit={false}

                            onValueChange={(itemValue, itemIndex) => {
                                // console.warn(itemValue);
                                this.setState({ classes: itemValue })

                            }
                            }
                        >
                            {/* clasees.toArray(this.state.stream) */}
                            {Object.values(filteredOptions).map((item, index) => {
                                // console.warn(item, index);

                                return (<Picker.Item label={item.label} value={item.value} key={index} />)
                            })}
                        </Picker>

                        <Picker style={{ height: 40, width: 400 }}


                            mode='dropdown'
                            itemStyle={{ backgroundColor: "grey" }}
                            selectedValue={this.state.division}

                            blurOnSubmit={false}

                            onValueChange={(itemValue, itemIndex) => {
                                // console.warn("DIC", itemValue);
                                this.setState({ division: itemValue })

                            }
                            }
                        >
                            {/* clasees.toArray(this.state.stream) */}
                            {Object.values(filteredOptions2).map((item, index) => {
                                // console.warn(item, index);

                                return (<Picker.Item label={item.label} value={item.value} key={index} />)
                            })}
                        </Picker>
                        <Input
                            placeholder='BASIC INPUT'
                            keyboardType='numeric'
                            onChangeText={(text) => {
                                this.setState({ rollno: text })

                            }

                            }

                        />


                        <Button
                            title="Submit"

                            onPress={this._onHandelSubmit}
                        >

                        </Button>
                    </View>
                }
            </ScrollView>





        );
    }
}
export default ProfileScreen;

