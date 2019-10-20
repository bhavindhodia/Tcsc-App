import React, { Component } from "react";

import {
	View, ActivityIndicator,
	Alert
} from "react-native";

import { Card, Button, Text, } from 'react-native-elements'
import DateTimePicker from "react-native-modal-datetime-picker";
import styles from './attstyles'
import CustomCheckBox from '../comps/CustomCB'
class ListAttandanceScreen extends Component {

	constructor(props) {
		super(props)
		d = new Date()
		this.state = {
			teacherToken: this.props.navigation.getParam('theToken'),
			studentListData: null,
			isLoading: true,
			issubmit: false,
			theDivision: this.props.navigation.getParam('attandanceDiv'),
			checked: false,
			total: null,

			startDateTimePickerVisible: false,
			endDateTimePickerVisible: false,

			startTime: null,
			endTime: null
		}
		this.studentList()

	}

	showStartDateTimePicker = async () =>
		this.setState({ startDateTimePickerVisible: true });

	showEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: true });

	hideStartDateTimePicker = async () =>
		this.setState({ startDateTimePickerVisible: false });

	hideEndDateTimePicker = () =>
		this.setState({ endDateTimePickerVisible: false });

	handleStartDatePicked = async (date) => {
		s = new Date(date)

		const thedate = s.toLocaleTimeString('en-us')
		// const thedate = moment(date).format('LT')

		this.setState({ startTime: thedate })
		const startTime = "attandance_s_time"

		this.state.studentListData.map((item, i) => {
			const outputArr = this.state.studentListData.slice(0);

			item[startTime] = this.state.startTime


			outputArr[i] = item
			this.setState({
				studentListData: outputArr,
			});
		})

		this.hideStartDateTimePicker();
	};

	handleEndDatePicked = date => {
		s = new Date(date)
		// const thedate = moment(date).format('LT')
		const thedate = s.toLocaleTimeString('en-us')
		// console.warn("A time has been picked: ", thedate);
		this.setState({ endTime: thedate })

		const endTime = "attandance_e_time"

		this.state.studentListData.map((item, i) => {
			const outputArr = this.state.studentListData.slice(0);

			item[endTime] = this.state.endTime


			outputArr[i] = item
			this.setState({
				studentListData: outputArr,
			});
		})


		this.hideEndDateTimePicker();
	};

	studentList = async () => {
		const urls = global.Foo + 'attendance/class/' + this.state.theDivision
		console.warn("URL", urls);
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
			total: json.length
		})

	}


	_onSubmit = async () => {
		this.setState({
			issubmit: true
		})

		if (this.state.startTime === null || this.state.endTime === null) {
			Alert.alert(
				'Error',
				'Lecture Times are not Set ',
				[
					{ text: 'Let Me Set', },
				],
				{ cancelable: true },
			);
		}
		else {


			const urls = global.Foo + 'attendance/create/'


			const method = "POST"
			const headers = {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Token ' + this.state.teacherToken
			}


			const body = JSON.stringify(this.state.studentListData)
			// const body = this.state.studentListData


			// console.warn("Body", body)

			const response = await fetch(urls, {
				method: method,
				headers: headers,
				body: body,

			})
			const res = await response
			const json = await response.json()
			this.setState({
				issubmit: false
			})
			if (res.status == 201) {
				// console.warn("OK", res)
				Alert.alert(
					'Success',
					'Successfully Updated',
					[
						{ text: 'OK', onPress: () => this.props.navigation.navigate('AttandanceAuth') },
					],
					{ cancelable: false },
				);
			}
			else {
				Alert.alert(
					'Failed',
					'I m  Sorry Something went terribly WRONG ',
					[
						{ text: 'Return', onPress: () => this.props.navigation.navigate('AttandanceAuth') },
					],
					{ cancelable: false },
				);

			}


		}


	}


	render() {


		return (
			<View style={{ flex: 1 }} >

				<Card
					title={this.state.theDivision}
					titleStyle={[styles.titletxt, { fontSize: 25 }]}
				>
					<Text style={[styles.subtitletxt, { textAlign: 'center', fontSize: 15 }]} >Select Lecture Time </Text>
					<View style={{ flexDirection: 'row', justifyContent: 'center' }} >

						<Button
							containerStyle={styles.ctnbtn}
							buttonStyle={styles.btn}
							type="outline"
							titleStyle={[styles.titletxt, { color: '#9522c9', fontSize: 20 }]}
							title={this.state.startTime === null ? "Start Time" : this.state.startTime} onPress={this.showStartDateTimePicker} />


						<DateTimePicker
							mode='time'
							isVisible={this.state.startDateTimePickerVisible}
							onConfirm={this.handleStartDatePicked}
							onCancel={this.hideStartDateTimePicker}
						/>

						<Button containerStyle={styles.ctnbtn}
							buttonStyle={styles.btn}
							type="outline"
							titleStyle={[styles.titletxt, { color: '#9522c9', fontSize: 20 }]}
							title={this.state.endTime === null ? "End Time" : this.state.endTime} onPress={this.showEndDateTimePicker}

						/>



						<DateTimePicker
							mode='time'
							isVisible={this.state.endDateTimePickerVisible}
							onConfirm={this.handleEndDatePicked}
							onCancel={this.hideEndDateTimePicker}
						/>



					</View>

					<Text style={[styles.subtitletxt, { textAlign: 'center', fontSize: 15 }]} >Total No Of Students {this.state.total} </Text>

				</Card>


				<View style={styles.modalBackground}>


					{this.state.isLoading ?
						<ActivityIndicator style={{ justifyContent: 'center', alignItems: 'center', top: '50%' }} animating={this.state.isLoading} size="large" color="#0000ff" />
						:

						<View style={{ marginVertical: 10, backgroundColor: "#E7E7E7" }} >


							<CustomCheckBox
								dataSource={this.state.studentListData}
								x={this.state.startTime}
								y={this.state.endTime}
								itemShowKey="roll_no"
								itemCheckedKey="status"
								iconSize={30}
								labelHorizontal={true}
							/>

							<Button
								buttonStyle={styles.submitbtn}
								containerStyle={styles.containerbtn}
								titleStyle={styles.titletxt}
								loading={this.state.issubmit}
								title="SUBMIT"
								onPress={this._onSubmit}>

							</Button>
						</View>
					}



				</View>

			</View>
		)
	}
}
export default ListAttandanceScreen;

