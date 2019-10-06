import React, { Component } from "react";
import {
    View,
    Text, Alert, Picker,
    StyleSheet,
} from "react-native";
import { Button } from 'react-native-elements'
import DateTimePicker from "react-native-modal-datetime-picker";


class CreateTimingScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            adminToken: this.props.navigation.getParam('adminToken'),
            stream: null,
            classes: "NONE",
            division: "NONE",
            startDateTimePickerVisible: false,
            endDateTimePickerVisible: false,
            startTime: null,
            endTime: null
        }
    }

    showStartDateTimePicker = async () =>
        this.setState({ startDateTimePickerVisible: true });

    showEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: true });

    hideStartDateTimePicker = async () =>
        this.setState({ startDateTimePickerVisible: false });

    hideEndDateTimePicker = () =>
        this.setState({ endDateTimePickerVisible: false });

    handleStartDatePicked = async (date) => {
        const s = new Date(date)

        const thedate = s.toLocaleTimeString('en-us', { hour12: true })
        // console.warn("A time has been picked: ", thedate);
        this.setState({ startTime: thedate })
        this.hideStartDateTimePicker();
    };

    handleEndDatePicked = date => {
        const s = new Date(date)
        const thedate = s.toLocaleTimeString('en-us', { hour12: true })
        // console.warn("A time has been picked: ", thedate);
        this.setState({ endTime: thedate })
        this.hideEndDateTimePicker();
    };

    _onHandelSubmit = async () => {


        if (this.state.startTime !== null && this.state.endTime !== null) {
            const urls = global.Foo + 'timing/'
            const method = "POST"
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + this.state.adminToken
            }

            const body = JSON.stringify({
                "start_time": this.state.startTime,
                "end_time": this.state.endTime,
                'stream': this.state.stream,
                "classes": this.state.classes,
                "division": this.state.division
            })

            console.warn("BODY", body);

            const response = await fetch(urls, {
                method: method,
                headers: headers,
                body: body
            })

            const res = await response.json()
            console.warn("RES", res);
            if (res.division) {
                Alert.alert('Error', res.division[0])
            }
            else {
                Alert.alert(
                    'Success',
                    'Successfully Created the division ',
                    [
                        { text: 'OK', onPress: () => this.props.navigation.navigate('Timing') },
                    ],
                    { cancelable: false },
                );
            }
        }
        else {
            Alert.alert(
                'Error',
                'Timing For Division not selected'
            );
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


            <View style={styles.container}>

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


                <Button containerStyle={styles.btn} title={this.state.startTime !== null ? this.state.startTime : "START TIME"} onPress={this.showStartDateTimePicker} />
                <DateTimePicker
                    mode='time'
                    isVisible={this.state.startDateTimePickerVisible}
                    onConfirm={this.handleStartDatePicked}
                    onCancel={this.hideStartDateTimePicker}
                />

                <Button containerStyle={styles.btn} title={this.state.endTime !== null ? this.state.endTime : "END TIME"} onPress={this.showEndDateTimePicker} />



                <DateTimePicker
                    mode='time'
                    isVisible={this.state.endDateTimePickerVisible}
                    onConfirm={this.handleEndDatePicked}
                    onCancel={this.hideEndDateTimePicker}
                />


                <Button
                    title="Submit"
                    containerStyle={styles.btn}
                    onPress={this._onHandelSubmit}
                >

                </Button>
            </View>







        );
    }
}
export default CreateTimingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn: {
        margin: 5,
        padding: 10,
    }
});