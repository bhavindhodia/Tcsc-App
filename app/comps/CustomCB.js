import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Dimensions,

} from 'react-native';
import { ListItem, Icon } from 'react-native-elements'


const WINDOW_WIDTH = Dimensions.get('window').width;

class CustomCheckBox extends Component {
    constructor(props) {
        super(props);
        this.renderCheckItem = this.renderCheckItem.bind(this);
        this._onPress = this._onPress.bind(this);
        this.state = {
            dataSource: props.dataSource,
            // startTime: props.x,
            // endTime: props.y
        };



    }


    static getDerivedStateFromProps(props, state) {

        if (props.dataSource === state.dataSource) {
            return null
        }
        else {
            return { dataSource: props.dataSource }
        }
    }

    // static getDerivedStateFromProps(props, state) {

    //     if (props.startTime !== state.startTime) {
    //         return { startTime: props.startTime }
    //     }
    //     else {

    //     }
    // }


    static propTypes = {
        dataSource: PropTypes.array,
        formHorizontal: PropTypes.bool,
        labelHorizontal: PropTypes.bool,
        itemShowKey: PropTypes.string,
        itemCheckedKey: PropTypes.string,
        iconSize: PropTypes.number,
        iconColor: PropTypes.string,
        onChecked: PropTypes.func,
        // startTime: PropTypes.string,
        // endTime: PropTypes.string
    };

    static defaultProps = {
        // d: new Date(),
        dataSource: [],
        formHorizontal: false,
        labelHorizontal: true,
        itemShowKey: 'label',
        itemCheckedKey: 'checked',
        iconSize: 20,
        iconColor: '#2f86d5',
        startTime: '',
        endTime: " "
    };

    _onPress(item, i) {

        const outputArr = this.state.dataSource.slice(0);
        outputArr[i] = item;
        this.setState({
            dataSource: outputArr,
            //  startTime: d.toLocaleTimeString(),
            // endTime: new Date(d.getTime() + 50 * 60000).toLocaleTimeString()
        });

        if (this.props.onChecked) {
            this.props.onChecked(outputArr);
        }
    }

    renderCheckItem(item, i) {
        const { itemShowKey, itemCheckedKey, iconSize, iconColor, textStyle, startTime, endTime } = this.props;
        const isChecked = item[itemCheckedKey] || false;
        // const d = new Date()
        return (

            <ListItem
                key={i}
                leftAvatar={{ source: { uri: item.profile_picture } }}
                title={item.roll_no}
                titleStyle={isChecked ? { fontFamily: 'TisaWeb W03 Bold', fontSize: 22, color: 'green' } : { fontSize: 22, fontFamily: 'TisaWeb W03 Bold', color: 'red' }}
                subtitle={item.username.username}
                subtitleStyle={isChecked ? { fontFamily: 'TisaWeb W03 Regular', fontSize: 16, color: 'green' } : { fontSize: 16, fontFamily: 'TisaWeb W03 Regular', color: 'red' }}
                onPress={() => {

                    item[itemCheckedKey] = !isChecked;


                    this._onPress(item, i);
                }}

                rightElement={
                    <Icon
                        type='font-awesome'
                        name={isChecked ? 'check-square-o' : 'square-o'}
                        size={iconSize}
                        color={isChecked ? 'green' : 'red'}
                    />
                }

            >

            </ListItem>

        );
    }

    render() {
        return (
            <View
                {...this.props}

            >
                {
                    this.state.dataSource.map((item, i) => this.renderCheckItem(item, i))
                }
            </View>
        );
    }

}

export default CustomCheckBox;
